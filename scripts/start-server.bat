@echo off
echo ========================================
echo   Servidor Web - Calculador Solar
echo ========================================
echo.
echo Iniciando servidor en http://localhost:8000
echo Presiona Ctrl+C para detener el servidor
echo.
cd /d "%~dp0.."
python server.py 8000
