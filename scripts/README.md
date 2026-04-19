# Scripts de Inicio - Calculador Solar

Este directorio contiene scripts y utilidades para el desarrollo local del Calculador de Ahorro Solar.

## 📁 Archivos

### `server.py`
Servidor HTTP con proxy integrado para la API de PVGIS. **Necesario para desarrollo local** para evitar problemas de CORS.

**Características:**
- Sirve archivos estáticos desde la raíz del proyecto
- Proxy transparente para `/api/pvgis` → PVGIS API  
- Headers CORS configurados correctamente
- Puerto por defecto: 8000
- Cambia automáticamente al directorio raíz del proyecto

**Uso directo:**
```bash
cd scripts
python server.py [puerto]

# Ejemplos:
python server.py        # Puerto 8000 (por defecto)
python server.py 3000   # Puerto 3000
```

### `start-server.bat`
Script de inicio para Windows (Command Prompt).

**Uso:**
```cmd
.\scripts\start-server.bat
```

### `start-server.ps1`
Script de inicio para Windows (PowerShell) - **Recomendado**.

**Uso:**
```powershell
.\scripts\start-server.ps1
```

**Características adicionales:**
- Abre el navegador automáticamente después de 2 segundos
- Mensajes coloridos en la consola
- Manejo de errores mejorado

## 🚀 Iniciar el servidor

### Opción 1: PowerShell (Recomendado para Windows)
```powershell
.\scripts\start-server.ps1
```

### Opción 2: Command Prompt (Windows)
```cmd
.\scripts\start-server.bat
```

### Opción 3: Manual (Linux/macOS/Windows)
```bash
cd scripts
python server.py
# Abrir manualmente: http://localhost:8000/index.html
```

## 🌐 Acceder a la aplicación

Una vez iniciado el servidor, abre tu navegador en:
- **http://localhost:8000/index.html**

(El script de PowerShell lo abre automáticamente)

## 🛑 Detener el servidor

Presiona **`Ctrl+C`** en la terminal donde se está ejecutando el servidor.

## ⚙️ Configuración

### Cambiar el puerto

Edita `server.py` directamente o ejecútalo con argumento:
```bash
python server.py 3000  # Usar puerto 3000
```

Luego abre: `http://localhost:3000/index.html`

### Requisitos

- **Python 3.x** instalado y en el PATH
- Módulos estándar (incluidos por defecto)

**Verificar Python:**
```bash
python --version
# o
python3 --version
```

## 🔧 Desarrollo vs Producción

### Desarrollo Local (estos scripts)
- Usa `scripts/server.py` como proxy PVGIS
- Sin problemas de CORS
- Cambios reflejados al recargar navegador

### Producción (GitHub Pages + Vercel)
- Frontend: GitHub Pages
- API proxy: Vercel Serverless Functions
- Ver `api/README.md` para más info

## 📝 Notas

- **CORS**: PVGIS API no permite llamadas CORS directas, por eso necesitamos el proxy
- Los cambios en HTML/CSS/JS se reflejan al recargar (Ctrl+F5 para hard refresh)
- Presiona Ctrl+C para detener
