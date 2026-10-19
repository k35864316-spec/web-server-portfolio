@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo [1/4] Git 저장소를 만듭니다.
if not exist .git git init
git branch -M main
echo [2/4] GitHub 저장소를 연결합니다.
git remote remove origin 2>nul
git remote add origin https://github.com/k35864316-spec/web_server_portfolio.git
echo [3/4] GitHub의 최신 내용을 가져옵니다.
git fetch origin
if errorlevel 1 (
  echo 가져오기에 실패했습니다. 인터넷 연결과 GitHub 로그인을 확인해 주세요.
  pause
  exit /b 1
)
echo [4/4] 내 파일은 그대로 두고, GitHub 기록에 맞춥니다.
git reset origin/main
echo.
echo ===== 현재 상태 =====
git status --short
echo.
echo 연결 완료! 이제 git add . / git commit / git push 로 올릴 수 있습니다.
pause
