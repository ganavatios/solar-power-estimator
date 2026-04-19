# GanaVatios - Nueva Estructura Multi-idioma

## 📁 Estructura del Proyecto

```
solar-power-estimator/
├── index.html                  # Redirección automática según idioma del navegador
├── es/
│   └── index.html             # Versión española (SEO optimizado)
├── en/
│   └── index.html             # Versión inglesa (SEO optimizado)
├── assets/
│   ├── styles.css             # Estilos compartidos (un solo archivo)
│   └── app.js                 # Lógica compartida (un solo archivo)
├── lang/
│   ├── es.json                # Traducciones español
│   └── en.json                # Traducciones inglés
├── api/
│   ├── pvgis.js               # Serverless function PVGIS
│   └── pvpc-prices.js         # Serverless function precios PVPC
├── logo.png
├── vercel.json                # Configuración de despliegue
└── version.json
```

## 🎯 Ventajas de esta Arquitectura

### ✅ SEO Optimizado
- **URLs limpias**: `ganavatios.com/es/` y `ganavatios.com/en/`
- **Meta tags estáticos**: Cada versión tiene sus propios title y description para mejor indexación
- **hreflang alternates**: Google sabe qué versión mostrar según el idioma del usuario
- **Open Graph y Twitter Cards**: Compartir en redes sociales muestra el contenido correcto

### ✅ Sin Duplicación de Código
- **Un solo archivo CSS** (`assets/styles.css`) compartido por ambas versiones
- **Un solo archivo JavaScript** (`assets/app.js`) con toda la lógica
- **Traducciones en JSON** separadas del código

### ✅ Fácil Mantenimiento
- Cambios en CSS/JS: **editar un solo archivo**
- Cambios en traducciones: **editar archivos JSON**
- Cambios en SEO: **editar meta tags por idioma**

### ✅ Performance
- Archivos compartidos se cachean una vez
- Los archivos HTML de idiomas son muy ligeros (~6KB cada uno)
- Carga rápida inicial

## 🌐 Funcionamiento

### Flujo de Usuario

1. Usuario visita `ganavatios.com/`
2. `index.html` detecta el idioma del navegador
3. Redirección automática a `/es/` o `/en/`
4. La página carga:
   - HTML ligero con metas SEO específicos
   - CSS compartido (`../assets/styles.css`)
   - JS compartido (`../assets/app.js`)
   - Traducciones JSON (`../lang/es.json` o `../lang/en.json`)

### Forzar Idioma en Páginas Específicas

Cada página `/es/index.html` y `/en/index.html` establece el idioma forzado:

```javascript
window.GANAVATIOS_LANG = 'es';  // o 'en'
window.GANAVATIOS_BASE_PATH = '../';
```

Esto garantiza que la aplicación use el idioma correcto sin importar la configuración del navegador.

## 📝 Cómo Editar

### Cambiar Estilos
Edita un solo archivo: `assets/styles.css`

### Cambiar Funcionalidad
Edita un solo archivo: `assets/app.js`

### Cambiar Traducciones
Edita los archivos JSON:
- Español: `lang/es.json`
- Inglés: `lang/en.json`

### Cambiar Meta Tags SEO
Edita directamente en cada versión:
- Español: `es/index.html` (líneas 5-6)
- Inglés: `en/index.html` (líneas 5-6)

## 🚀 Despliegue

La configuración en `vercel.json` incluye:
- Headers CORS para las APIs
- Rewrites para URLs limpias
- Trailing slash habilitado

### Comandos

```bash
# Desarrollo local (necesita servidor)
.\scripts\start-server.ps1

# Desplegar a Vercel
vercel --prod
```

## 🔗 URLs Importantes

- Raíz: `ganavatios.com/` → Auto-redirección
- Español: `ganavatios.com/es/`
- Inglés: `ganavatios.com/en/`

## 📊 Estructura de Meta Tags

### Español (`/es/`)
```html
<title>GanaVatios | Ahorro Energético Inteligente y Solar Plug & Play</title>
<meta name="description" content="Reduce tu factura de luz con GanaVatios. Soluciones de domótica y kits solares de balcón fáciles de instalar. ¡Empieza a ahorrar energía hoy mismo!">
```

### Inglés (`/en/`)
```html
<title>GanaVatios | Smart Energy Savings & Plug & Play Solar Kits</title>
<meta name="description" content="Lower your electricity bill with GanaVatios. Easy-to-install smart home solutions and balcony solar kits. Start saving energy today!">
```

## 🔧 Configuración Técnica

### Variables de Configuración

```javascript
// En cada página de idioma específico
window.GANAVATIOS_LANG = 'es';         // Forzar idioma
window.GANAVATIOS_BASE_PATH = '../';    // Ruta base para assets
```

### Rutas Relativas

Los archivos en `/es/` y `/en/` usan rutas relativas:
- Estilos: `../assets/styles.css`
- Scripts: `../assets/app.js`
- Traducciones: `../lang/es.json`
- Logo: `../logo.png`

## 🎨 Selector de Idioma

El selector de banderas navega a las URLs específicas:
- Click en 🇪🇸 → Navega a `/es/`
- Click en 🇬🇧 → Navega a `/en/`

Esto permite a los usuarios cambiar de idioma manualmente y mantiene URLs limpias para SEO.

---

**Última actualización**: 19 de abril de 2026
**Versión**: 0.2.0 (Multi-idioma optimizado)
