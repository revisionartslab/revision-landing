@echo off
setlocal
echo Splitting Gallery Logic...
powershell -Command "Get-Content gallery-logic.js -TotalCount 76 | Set-Content logic_head.js; Get-Content gallery-logic.js | Select-Object -Skip 58915 | Set-Content logic_tail.js; Get-Content gallery-logic.js | Select-Object -Skip 76 | Select-Object -TotalCount 58839 | Set-Content artworks_data_raw.js"
echo Split Complete! Check for logic_head.js, logic_tail.js and artworks_data_raw.js.
