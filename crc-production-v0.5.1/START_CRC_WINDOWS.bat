@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install Node.js 22 LTS or newer, then run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  echo First run: installing CRC dependencies...
  call npm install
  if errorlevel 1 pause & exit /b 1
)
echo Starting Curriculum Reality Check...
echo Open http://localhost:3000 in your browser if it does not open automatically.
call npm run dev
pause
