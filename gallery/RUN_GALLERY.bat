@echo off
I:
cd "I:\ANTIGRAVITY\revision-landing\gallery"
echo Starting REVISION ARTS Server from Root...
echo Access at: http://localhost:8080/gallery/
start http://localhost:8080/gallery/
npx -y http-server -p 8080 -c-1
pause
