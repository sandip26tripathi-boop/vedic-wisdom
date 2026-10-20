@echo off
set PATH=%PATH%;C:\Users\base\tools\git\cmd
cd /d "c:\Users\base\Desktop\vedic"
echo ========================================================
echo Pushing Vedic Wisdom to https://github.com/sandip26tripathi-boop/vedic-wisdom
echo ========================================================
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Code successfully pushed to GitHub!
    echo Next step: Open vercel.com and import sandip26tripathi-boop/vedic-wisdom
) else (
    echo [NOTE] If prompted, please complete GitHub sign-in in your browser window.
)
echo.
pause
