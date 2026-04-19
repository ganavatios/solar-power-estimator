# Calculador de Ahorro con Paneles Solares

Aplicación web para calcular el ahorro económico de una instalación de paneles solares fotovoltaicos utilizando datos reales de radiación solar de PVGIS.

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

> **Nota**: En producción, la aplicación llama directamente a la API de PVGIS sin proxy. PVGIS permite CORS para solicitudes desde navegadores.

### Desarrollo Local

Para desarrollo local, usa el servidor proxy para evitar posibles problemas de CORS:

#### Opción 1: Script automatizado (Recomendado)

**Windows (PowerShell):**
```powershell
.\scripts\start-server.ps1
```

**Windows (Command Prompt):**
```cmd
scripts\start-server.bat
```

El servidor se iniciará en http://localhost:8000 y se abrirá automáticamente en el navegador.

### Opción 2: Manual

```bash
# Iniciar servidor con proxy PVGIS
python server.py 8000

# Abrir en el navegador
# http://localhost:8000/index.html
```

> **Nota**: Es necesario usar el servidor `server.py` en lugar del servidor HTTP simple de Python, ya que incluye un proxy para evitar problemas de CORS con la API de PVGIS.

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
├── server.py              # Servidor con proxy PVGIS
├── version.json           # Información de versión y fecha
├── .github/
│   └── workflows/
│       └── version-bump.yml  # GitHub Actions para versionado
├── lang/                  # Archivos de traducción
│   ├── es.json           # Español
│   └── en.json           # English
├── scripts/              # Scripts de inicio
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
- Requiere ejecutar `server.py` para el proxy PVGIS
- Usa rutas absolutas con proxy local (`/api/pvgis`)
- La detección automática identifica `localhost` o `127.0.0.1`
- Sin limitaciones de CORS

**GitHub Pages (Producción):**
- Usa proxy CORS público (AllOrigins) para acceder a PVGIS API
- URL: `https://api.allorigins.win/raw?url={pvgis_url}`
- PVGIS no permite CORS directo, por lo que se requiere proxy
- No requiere servidor backend propio
- Rutas relativas para recursos estáticos

### Requisitos

- Requiere conexión a internet para consultar la API de PVGIS
- Para desarrollo: Python 3.x para ejecutar `server.py`
- Navegadores modernos con soporte para:
  - Geolocalización API
  - Fetch API
  - ES6+ JavaScript

## 🌐 Despliegue en GitHub Pages

El proyecto se despliega automáticamente en GitHub Pages cuando se hace push a la rama `main`:

1. Los cambios se pushean a `main`
2. GitHub Actions ejecuta el workflow de versionado (incrementa versión)
3. GitHub Pages sirve automáticamente los archivos estáticos
4. La aplicación está disponible en: `https://ganavatios.github.io/solar-power-estimator/`

No se requiere configuración adicional. El código detecta automáticamente si está en producción o desarrollo local.

## 📄 Licencia

Los datos de PVGIS son © European Communities, 2001-2024

---

Desarrollado para investigación en energía solar fotovoltaica 🌞
