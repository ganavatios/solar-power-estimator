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
- 🌍 **Arquitectura multi-idioma SEO optimizada**
  - URLs limpias: `/es/` y `/en/`
  - Meta tags específicos por idioma
  - hreflang tags para SEO internacional
  - Open Graph y Twitter Cards
  - Redirección automática según idioma del navegador
- ☀️ Datos reales de radiación solar (API PVGIS)
- 📊 Cálculo de producción anual, mensual y diaria
- 💰 Estimación de ahorro económico
- ⚙️ Configuración personalizable (inclinación, orientación, pérdidas)
- 📍 Geolocalización automática
- 🔄 Widgets interactivos (brújula, visualizador de inclinación)
- 📱 Diseño responsive (móvil, tablet, desktop)
- 🔗 **Botones de compartir en redes sociales**
  - Facebook, X (Twitter), WhatsApp, LinkedIn
  - Copiar enlace al portapapeles
  - Iconos circulares con tooltips

## 🚀 Inicio Rápido

### GitHub Pages (Producción)

**URLs disponibles:**
- **Auto-redirección**: https://www.ganavatios.com/ → Detecta idioma del navegador
- **Español**: https://www.ganavatios.com/es/
- **Inglés**: https://www.ganavatios.com/en/

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

**URLs locales:**
- http://localhost:8000/ → Redirección automática
- http://localhost:8000/es/ → Versión española
- http://localhost:8000/en/ → Versión inglesa

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

1. **Seleccionar idioma**: 
   - La web detecta automáticamente tu idioma
   - También puedes cambiar manualmente con el selector de banderas
   - URLs específicas: `/es/` para español, `/en/` para inglés
   
2. **Seleccionar ubicación**: 
   - Haz clic en el mapa o permite la geolocalización
   - El marcador muestra las coordenadas seleccionadas
   
3. **Configurar parámetros**:
   - Potencia instalada (Wp)
   - Inclinación de paneles (grados) - con visualizador interactivo
   - Orientación azimut (0° = Sur) - con brújula interactiva
   - Pérdidas del sistema (%)
   
4. **Seleccionar tarifa**: 
   - PVPC (precios reales para España)
   - Tarifa fija personalizada
   
5. **Calcular**: Presiona el botón "Calcular Ahorro" / "Calculate Savings"

6. **Ver resultados**:
   - Producción anual estimada
   - Ahorro económico
   - Datos de radiación solar
   
7. **Compartir**:
   - Usa los botones circulares para compartir en redes sociales
   - Facebook, X (Twitter), WhatsApp, LinkedIn
   - Copiar enlace al portapapeles

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
├── index.html              # Redirección automática por idioma
├── es/
│   └── index.html         # Versión española (SEO optimizado)
├── en/
│   └── index.html         # Versión inglesa (SEO optimizado)
├── assets/
│   ├── styles.css         # Estilos compartidos
│   └── app.js            # Lógica compartida
├── lang/                  # Archivos de traducción
│   ├── es.json           # Español
│   ├── en.json           # English
│   └── README.md
├── api/
│   ├── pvgis.js          # Vercel Serverless Function (proxy PVGIS)
│   ├── pvpc-prices.js    # Vercel Serverless Function (precios PVPC)
│   └── README.md         # Documentación del proxy
├── scripts/              # Scripts de inicio y utilidades
│   ├── server.py         # Servidor Python con proxy PVGIS (desarrollo local)
│   ├── start-server.bat  # Windows CMD
│   ├── start-server.ps1  # Windows PowerShell
│   └── README.md
├── .github/
│   └── workflows/
│       └── version-bump.yml  # GitHub Actions para versionado
├── version.json           # Información de versión y fecha
├── vercel.json            # Configuración de Vercel
├── logo.png               # Logo de GanaVatios
├── STRUCTURE.md           # Documentación de arquitectura
├── DEPLOYMENT.md          # Guía de despliegue
└── README.md
```

### Arquitectura Multi-idioma

**Ventajas del diseño actual:**
- ✅ **Sin duplicación**: CSS y JS compartidos en `/assets/`
- ✅ **SEO optimizado**: Meta tags específicos por idioma
- ✅ **URLs limpias**: `/es/` y `/en/` en lugar de parámetros
- ✅ **hreflang tags**: Google entiende las versiones traducidas
- ✅ **Open Graph**: Compartir en redes sociales con contenido apropiado
- ✅ **Redirección inteligente**: Detecta idioma del navegador
- ✅ **Fácil mantenimiento**: Un solo lugar para editar funcionalidad

Ver [STRUCTURE.md](STRUCTURE.md) para más detalles técnicos.

### Favicons para SEO de Google

Para que Google muestre el icono del sitio en los resultados de búsqueda, genera favicons en múltiples tamaños usando [favicon.io](https://favicon.io/favicon-converter/):

**Archivos necesarios en la raíz del proyecto:**
- `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`
- `android-chrome-192x192.png`, `android-chrome-512x512.png`
- `apple-touch-icon.png`, `site.webmanifest`

Los tags HTML ya están configurados. Sube `logo.png` a favicon.io y coloca los archivos generados en la raíz del proyecto.

## 🌍 Añadir Nuevos Idiomas

Para añadir un nuevo idioma (ejemplo: Francés):

1. **Crear carpeta de idioma**
   ```bash
   mkdir fr
   ```

2. **Copiar página HTML**
   ```bash
   cp es/index.html fr/index.html
   ```

3. **Actualizar meta tags en `fr/index.html`**
   ```html
   <html lang="fr">
   <title>GanaVatios | Économies d'Énergie Intelligentes</title>
   <meta name="description" content="...">
   <meta name="language" content="French">
   <link rel="canonical" href="https://www.ganavatios.com/fr/">
   ```

4. **Actualizar hreflang tags** (en TODAS las páginas: es/, en/, fr/)
   ```html
   <link rel="alternate" hreflang="es" href="https://www.ganavatios.com/es/" />
   <link rel="alternate" hreflang="en" href="https://www.ganavatios.com/en/" />
   <link rel="alternate" hreflang="fr" href="https://www.ganavatios.com/fr/" />
   <link rel="alternate" hreflang="x-default" href="https://www.ganavatios.com/en/" />
   ```

5. **Crear archivo de traducciones**
   ```bash
   cp lang/en.json lang/fr.json
   ```
   Traducir todos los textos en `lang/fr.json`

6. **Actualizar script de idioma en `fr/index.html`**
   ```html
   <script>
     window.GANAVATIOS_LANG = 'fr';
     window.GANAVATIOS_BASE_PATH = '../';
   </script>
   ```

7. **Añadir bandera SVG** (en todas las páginas)
   ```html
   <svg class="lang-flag" data-lang="fr" viewBox="0 0 900 600">
     <!-- SVG de bandera francesa -->
   </svg>
   ```

8. **Actualizar redirección en `index.html`**
   ```javascript
   if (browserLang.startsWith('fr')) {
     lang = 'fr';
   }
   ```

9. **Configurar Vercel** (si aplica)
   ```json
   {
     "rewrites": [
       { "source": "/fr", "destination": "/fr/" }
     ]
   }
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
