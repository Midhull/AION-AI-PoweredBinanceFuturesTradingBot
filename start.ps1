# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python -m app.main"

# Start Frontend
npm run dev
