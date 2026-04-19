# Scripts del Calculador Solar

## Iniciar el servidor

### Windows (Command Prompt):
```
scripts\start-server.bat
```

### Windows (PowerShell):
```
.\scripts\start-server.ps1
```

El script de PowerShell abrirá automáticamente el navegador.

### Manual:
```bash
python server.py 8000
```

> **Nota**: El servidor incluye un proxy para la API de PVGIS que soluciona problemas de CORS.

## Acceder a la aplicación

Una vez iniciado el servidor, abre tu navegador en:
- http://localhost:8000/index.html

## Detener el servidor

Presiona `Ctrl+C` en la terminal donde se está ejecutando el servidor.
