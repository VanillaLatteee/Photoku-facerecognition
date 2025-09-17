cd face-service
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
python app.py
# -> servis di http://localhost:9000
# cek: GET http://localhost:9000/health
