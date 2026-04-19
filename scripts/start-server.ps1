# Script para iniciar el servidor web local
Write-Host "========================================"
Write-Host "  Servidor Web - Calculador Solar" -ForegroundColor Green
Write-Host "========================================"
Write-Host ""
Write-Host "Iniciando servidor en http://localhost:8000" -ForegroundColor Cyan
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

# Cambiar al directorio del proyecto
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location (Join-Path $scriptPath "..")

# Abrir el navegador después de 2 segundos
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:8000/index.html"
} | Out-Null

# Iniciar el servidor
python server.py 8000
