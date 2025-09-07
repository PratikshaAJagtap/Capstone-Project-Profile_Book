@echo off
echo Starting ProfileBook Frontend...
echo.
echo Make sure your backend API is running on https://localhost:7000
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting development server...
echo The application will open at http://localhost:4200
echo.
call npm start
pause
