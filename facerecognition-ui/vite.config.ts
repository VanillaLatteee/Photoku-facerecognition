// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import fs from "fs";
import type { ServerOptions } from "node:https"; // ⬅️ perbaikan tipe penting

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // API lain (opsional)
  const API_BASE = env.VITE_API_BASE || "http://10.10.1.15:3000";
  // Go gateway untuk /api
  const GATEWAY = env.VITE_API_GATEWAY || "http://10.10.2.159:8080";

  // Path cert dari ENV; fallback ke ./cert jika kosong
  const keyPathEnv = env.VITE_CERT_KEY_PATH;
  const certPathEnv = env.VITE_CERT_CRT_PATH;
  const keyPath = keyPathEnv || path.resolve(__dirname, "cert/dev.key");
  const certPath = certPathEnv || path.resolve(__dirname, "cert/dev.crt");

  // Soft-HTTPS: gunakan undefined bila tidak ada cert (bukan false)
  let httpsOpt: ServerOptions | undefined = undefined;

  const hasKey = fs.existsSync(keyPath);
  const hasCert = fs.existsSync(certPath);

  if (hasKey && hasCert) {
    try {
      httpsOpt = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };
      console.log("[vite] HTTPS enabled with cert:", keyPath, "|", certPath);
    } catch (e: any) {
      console.warn(
        "[vite] Failed reading cert, fallback to HTTP. Error:",
        e?.message || e,
      );
      httpsOpt = undefined; // ⬅️ jangan gunakan false
    }
  } else {
    console.warn(
      "[vite] Dev cert not found at:",
      keyPath,
      "or",
      certPath,
      "→ starting without HTTPS.",
    );
  }

  return {
    plugins: [react(), svgr()],
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    base: "/",

    // === DEV SERVER (npm run dev) ===
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      https: httpsOpt, // ⬅️ undefined = properti diskip; tidak melanggar tipe
      proxy: {
        "/photos": { target: API_BASE, changeOrigin: true },
        "/files": { target: API_BASE, changeOrigin: true },
        "/index": { target: API_BASE, changeOrigin: true },
        "/search": { target: API_BASE, changeOrigin: true },
        "/purchase": { target: API_BASE, changeOrigin: true },
        "/orders": { target: API_BASE, changeOrigin: true },
        "/auth": { target: API_BASE, changeOrigin: true },
        // FE → Go gateway
        "/api": { target: GATEWAY, changeOrigin: true, secure: false },
      },
    },

    // === PREVIEW (vite preview setelah build) ===
    // Catatan: vite preview tidak benar-benar support proxy; kita tetap biarkan
    // bloknya ada demi konsistensi config kamu.
    preview: {
      host: true,
      port: 4173,
      https: httpsOpt, // ⬅️ tipe aman (ServerOptions | undefined)
      proxy: {
        "/photos": { target: API_BASE, changeOrigin: true },
        "/files": { target: API_BASE, changeOrigin: true },
        "/index": { target: API_BASE, changeOrigin: true },
        "/search": { target: API_BASE, changeOrigin: true },
        "/purchase": { target: API_BASE, changeOrigin: true },
        "/orders": { target: API_BASE, changeOrigin: true },
        "/auth": { target: API_BASE, changeOrigin: true },
        "/api": { target: GATEWAY, changeOrigin: true, secure: false },
      },
    },

    // === BUILD OUTPUT ===
    build: {
      outDir: "dist",
      sourcemap: false,
      // Kalau mau auto vendor-chunking default Vite, hapus baris below.
      rollupOptions: { output: { manualChunks: undefined } },
    },
  };
});
