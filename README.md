# Calculador de Ahorro con Paneles Solares

Aplicación web para calcular el ahorro económico de una instalación de paneles solares fotovoltaicos utilizando datos reales de radiación solar de PVGIS.

## ⚠️ IMPORTANTE: Despliegue en Producción

**Para que la aplicación funcione en GitHub Pages, debes desplegar la función serverless en Vercel.**

📖 **Guía completa:** [DEPLOYMENT.md](DEPLOYMENT.md)

**TL;DR:**
1. Crear cuenta en [Vercel](https://vercel.com)
2. Importar repositorio `ganavatios/solar-power-estimator`
3. Deploy automático
4. Copiar URL de Vercel
5. Actualizar URL en `index.html` línea ~591
6. Commit y push

Sin Vercel desplegado, GitHub Pages mostrará errores al calcular.

## 🌟 Características

- 🗺️ Mapa interactivo para seleccionar ubicación
- 🌍 **Soporte multiidioma** (Español e Inglés)
- ☀️ Datos reales de radiación solar (API PVGIS)
- 📊 Cálculo de producción anual, mensual y diaria
- 💰 Estimación de ahorro económico
- ⚙️ Configuración personalizable (inclinación, orientación, pérdidas)
- 📍 Geolocalización automática
- 🔄 Detección automática del idioma del navegador

## 🚀 Inicio Rápido

### GitHub Pages (Producción)

La aplicación está desplegada en: **https://ganavatios.github.io/solar-power-estimator/**

> **Nota**: En producción, la aplicación usa una función serverless en Vercel como proxy para PVGIS API.

### Desarrollo Local

Para desarrollo local, usa el servidor Python incluido que actúa como proxy para PVGIS:

#### Opción 1: Script automatizado (Recomendado)

**Windows (PowerShell):**
```powershell
.\scripts\start-server.ps1
```

**Windows (Command Prompt):**
```cmd
.\scripts\start-server.bat
```

**Linux/macOS:**
```bash
cd scripts
python3 server.py 8000
```

El servidor se iniciará en http://localhost:8000 y (en PowerShell) se abrirá automáticamente en el navegador.

#### Opción 2: Manual

```bash
# Desde la carpeta scripts
cd scripts
python server.py 8000

# El servidor cambiará automáticamente al directorio raíz del proyecto
# Abre tu navegador en: http://localhost:8000/index.html
```

> **Nota**: Es necesario usar `scripts/server.py` en lugar del servidor HTTP simple de Python, ya que incluye un proxy para evitar problemas de CORS con la API de PVGIS.

## 📖 Uso

1. **Seleccionar idioma**: Usa el selector en la esquina superior derecha (auto-detecta el idioma del navegador)
2. **Seleccionar ubicación**: Haz clic en el mapa o permite la geolocalización
3. **Configurar parámetros**:
   - Potencia instalada (Wp)
   - Inclinación de paneles (grados)
   - Orientación azimut (0° = Sur)
   - Pérdidas del sistema (%)
4. **Seleccionar tarifa**: Tarifa variable o personalizada
5. **Calcular**: Presiona el botón "Calcular Ahorro" / "Calculate Savings"

## 🔧 Tecnologías

- HTML5 + JavaScript vanilla
- [Leaflet.js](https://leafletjs.com/) - Mapas interactivos
- [PVGIS API](https://joint-research-centre.ec.europa.eu/pvgis-online-tool) - Datos de radiación solar
- OpenStreetMap - Cartografía
- Sistema de internacionalización (i18n) con archivos JSON
- GitHub Actions - Versionado automático

## 🔄 Sistema de Versionado

Este proyecto utiliza versionado semántico (SemVer) con formato `x.y.z` (major.minor.patch):

### Versionado Automático

El sistema incrementa automáticamente la versión en cada commit a `master`:

- **Minor** (0.x.0): Se incrementa automáticamente por defecto en cada commit
- **Patch** (0.0.x): Se incrementa si el mensaje del commit contiene `[patch]`
- **Major** (x.0.0): Debe editarse manualmente en `version.json` cuando sea necesario

### Ejemplos de Uso

```bash
# Commit normal - incrementa minor (0.1.0 → 0.2.0)
git commit -m "feat: añadir nueva característica"

# Commit con patch - incrementa patch (0.1.0 → 0.1.1)
git commit -m "fix: corregir bug [patch]"

# Cambio major - editar version.json manualmente antes del commit
# Cambiar "version": "0.5.0" a "version": "1.0.0"
# El siguiente commit seguirá incrementando desde 1.0.0 → 1.1.0
```

### Archivos de Versionado

- `version.json`: Almacena la versión actual y fecha de despliegue
- `.github/workflows/version-bump.yml`: GitHub Actions workflow para versionado automático

### Información de Versión

La versión actual y fecha de despliegue se muestran en el footer de la aplicación, junto con un enlace de contacto.

## 📁 Estructura del Proyecto

```
solar-power-estimator/
├── index.html              # Aplicación principal
├── version.json           # Información de versión y fecha
├── vercel.json            # Configuración de Vercel
├── .github/
│   └── workflows/
│       └── version-bump.yml  # GitHub Actions para versionado
├── api/
│   ├── pvgis.js          # Vercel Serverless Function (proxy PVGIS)
│   └── README.md         # Documentación del proxy
├── lang/                  # Archivos de traducción
│   ├── es.json           # Español
│   ├── en.json           # English
│   └── README.md
├── scripts/              # Scripts de inicio y utilidades
│   ├── server.py         # Servidor Python con proxy PVGIS (desarrollo local)
│   ├── start-server.bat  # Windows CMD
│   ├── start-server.ps1  # Windows PowerShell
│   └── README.md
└── README.md
```

## 🌍 Añadir Nuevos Idiomas

Para añadir un nuevo idioma:

1. Crea un nuevo archivo en `lang/` (ej: `lang/fr.json`)
2. Copia la estructura de `lang/en.json` o `lang/es.json`
3. Traduce todos los textos
4. Añade el idioma al selector en `index.html`:
   ```html
   <option value="fr">Français</option>
   ```

## 📊 Datos Proporcionados

- Radiación solar anual (kWh/m²)
- Producción energética anual (kWh/año)
- Producción promedio diaria y mensual
- Ahorro económico estimado

## ⚠️ Notas Importantes

### Desarrollo vs Producción

**Desarrollo Local:**
- Requiere ejecutar `scripts/server.py` para el proxy PVGIS
- Servidor Python incluye proxy integrado en `/api/pvgis`
- La detección automática identifica `localhost` o `127.0.0.1`
- Sin limitaciones de CORS
- No requiere cuenta de Vercel

**GitHub Pages + Vercel (Producción):**
- **Frontend**: GitHub Pages sirve archivos estáticos
- **API Proxy**: Vercel Serverless Function (`api/pvgis.js`)
- URL del proxy: `https://[tu-proyecto].vercel.app/api/pvgis`
- PVGIS no permite CORS directo, por eso usamos Vercel como proxy
- Rutas relativas para recursos estáticos
- Plan gratuito de Vercel suficiente para uso normal

### Arquitectura de Producción

```
Usuario (Navegador)
    ↓
GitHub Pages (index.html, CSS, JS)
    ↓
Vercel Serverless Function (/api/pvgis)
    ↓
PVGIS API (re.jrc.ec.europa.eu)
```

### Requisitos

- Requiere conexión a internet para consultar la API de PVGIS
- Para desarrollo: Python 3.x para ejecutar `server.py`
- Navegadores modernos con soporte para:
  - Geolocalización API
  - Fetch API
  - ES6+ JavaScript

## 🌐 Despliegue en GitHub Pages + Vercel

El proyecto utiliza una arquitectura híbrida:

### GitHub Pages (Frontend)
- Sirve los archivos estáticos (HTML, CSS, JS, imágenes)
- Se despliega automáticamente desde la rama `main`
- URL: `https://ganavatios.github.io/solar-power-estimator/`

### Vercel (API Proxy)
- Función serverless que actúa como proxy para PVGIS API
- Soluciona problemas de CORS que impiden llamadas directas a PVGIS
- Código en: `api/pvgis.js`

**Configuración de Vercel:**

1. Ve a [vercel.com](https://vercel.com) y conecta tu cuenta de GitHub
2. Importa el repositorio `ganavatios/solar-power-estimator`
3. Vercel detectará automáticamente la configuración (`vercel.json`)
4. Haz clic en "Deploy"
5. Copia la URL de producción (ej: `https://solar-power-estimator.vercel.app`)
6. Actualiza la URL en `index.html` (busca `solar-power-estimator.vercel.app` y reemplaza con tu URL)

**Versionado Automático:**
- Cuando se hace push a `main`, GitHub Actions incrementa la versión
- Vercel se redespliega automáticamente en cada push
- La versión y fecha se actualizan en `version.json`

No se requiere configuración adicional. El código detecta automáticamente si está en:
- **Local** (`localhost`): Usa `scripts/server.py` 
- **Producción**: Usa Vercel serverless function

## 📄 Licencia

Los datos de PVGIS son © European Communities, 2001-2024

---

Desarrollado para investigación en energía solar fotovoltaica 🌞
