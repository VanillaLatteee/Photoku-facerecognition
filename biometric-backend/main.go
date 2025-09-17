// main.go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type FaceVerifyResult struct {
	Pose          string                 `json:"pose"`
	MatchScore    float64                `json:"match_score"`
	LivenessScore float64                `json:"liveness_score"`
	Verified      bool                   `json:"verified"`
	BestMatch     map[string]interface{} `json:"best_match"`
}

func main() {
	_ = godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	faceURL := os.Getenv("FACE_SERVICE_URL")
	if faceURL == "" {
		faceURL = "http://127.0.0.1:9000"
	}

	_ = os.MkdirAll("uploads", 0o755)

	r := gin.Default()
	r.SetTrustedProxies(nil)
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// === VERIFY (tetap)
	r.POST("/api/biometric/verify", func(c *gin.Context) {
		pose := c.PostForm("pose")
		userId := c.PostForm("userId")
		fileHeader, err := c.FormFile("file")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"ok": false, "error": "missing file"})
			return
		}

		src, err := fileHeader.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"ok": false, "error": "open file failed"})
			return
		}
		defer src.Close()

		var buf bytes.Buffer
		writer := multipart.NewWriter(&buf)

		part, err := writer.CreateFormFile("file", fileHeader.Filename)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"ok": false, "error": "create form failed"})
			return
		}
		if _, err := io.Copy(part, src); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"ok": false, "error": "copy file failed"})
			return
		}

		if pose != "" {
			_ = writer.WriteField("pose", pose)
		}
		if userId != "" {
			_ = writer.WriteField("user_id", userId)
		}
		_ = writer.WriteField("thresh", "0.5")
		_ = writer.WriteField("liveness_thresh", "0.7")

		writer.Close()

		req, err := http.NewRequest("POST", faceURL+"/face/verify", &buf)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"ok": false, "error": "request build failed"})
			return
		}
		req.Header.Set("Content-Type", writer.FormDataContentType())

		client := &http.Client{Timeout: 30 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"ok": false, "error": fmt.Sprintf("face service error: %v", err)})
			return
		}
		defer resp.Body.Close()

		body, _ := io.ReadAll(resp.Body)
		if resp.StatusCode != http.StatusOK {
			c.JSON(resp.StatusCode, gin.H{"ok": false, "error": string(body)})
			return
		}

		var result map[string]interface{}
		if err := json.Unmarshal(body, &result); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"ok": false, "error": "invalid JSON from face service"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"ok": true,
			"result": gin.H{
				"pose":          result["pose"],
				"matchScore":    result["match_score"],
				"livenessScore": result["liveness_score"],
				"verified":      result["verified"],
				"fileStoredAs":  "",
			},
		})
	})

	// === ENROLL (opsional) — untuk membangun galeri di face-service
	r.POST("/api/biometric/enroll", func(c *gin.Context) {
		pose := c.PostForm("pose")
		userId := c.PostForm("userId")
		if userId == "" {
			userId = "demo-user"
		}

		fileHeader, err := c.FormFile("file")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"ok": false, "error": "missing file"})
			return
		}

		// baca data file sekalian simpan (opsional)
		src, err := fileHeader.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"ok": false, "error": "open file failed"})
			return
		}
		defer src.Close()
		data, err := io.ReadAll(src)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"ok": false, "error": "read file failed"})
			return
		}
		stored := filepath.Join("uploads", fmt.Sprintf("%s-%s-%d.jpg", userId, pose, time.Now().UnixNano()))
		_ = os.WriteFile(stored, data, 0o644)

		// kirim ke face-service
		var buf bytes.Buffer
		writer := multipart.NewWriter(&buf)
		part, err := writer.CreateFormFile("file", fileHeader.Filename)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"ok": false, "error": "create form failed"})
			return
		}
		if _, err := part.Write(data); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"ok": false, "error": "write file failed"})
			return
		}
		_ = writer.WriteField("pose", pose)
		_ = writer.WriteField("user_id", userId)
		writer.Close()

		req, err := http.NewRequest("POST", faceURL+"/face/enroll", &buf)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"ok": false, "error": "request build failed"})
			return
		}
		req.Header.Set("Content-Type", writer.FormDataContentType())

		client := &http.Client{Timeout: 30 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"ok": false, "error": fmt.Sprintf("face service error: %v", err)})
			return
		}
		defer resp.Body.Close()
		body, _ := io.ReadAll(resp.Body)

		if resp.StatusCode != http.StatusOK {
			c.JSON(resp.StatusCode, gin.H{"ok": false, "error": string(body)})
			return
		}
		c.JSON(http.StatusOK, gin.H{"ok": true, "storedAs": stored})
	})

	log.Printf("Go API gateway listening on :%s (face service: %s)", port, faceURL)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
