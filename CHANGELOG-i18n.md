# Internacionalización (i18n) - Changelog

## v0.2.0 - Arquitectura Multi-idioma con SEO Optimizado (2026-04-19)

### 🎯 Cambio Mayor: Reestructuración Completa

Se ha migrado de un sistema de traducción dinámica a una **arquitectura multi-idioma SEO-optimizada** con páginas específicas por idioma.

### 📁 Nueva Estructura

```
├── index.html              # Redirección automática
├── es/index.html          # Página española (meta tags optimizados)
├── en/index.html          # Página inglesa (meta tags optimizados)
├── assets/
│   ├── styles.css         # Estilos compartidos (extraídos)
│   └── app.js            # Lógica compartida (extraída)
└── lang/
    ├── es.json           # Traducciones español
    └── en.json           # Traducciones inglés
```

### ✨ Nuevas Características

#### 1. **URLs SEO-Friendly**
- **Antes**: `ganavatios.com/?lang=es`
- **Ahora**: `ganavatios.com/es/` y `ganavatios.com/en/`

#### 2. **Meta Tags Específicos por Idioma**

**Español (`/es/index.html`):**
```html
<title>GanaVatios | Ahorro Energético Inteligente y Solar Plug & Play</title>
<meta name="description" content="Reduce tu factura de luz con GanaVatios...">
<meta name="language" content="Spanish">
<link rel="canonical" href="https://www.ganavatios.com/es/">
```

**Inglés (`/en/index.html`):**
```html
<title>GanaVatios | Smart Energy Savings & Plug & Play Solar Kits</title>
<meta name="description" content="Lower your electricity bill with GanaVatios...">
<meta name="language" content="English">
<link rel="canonical" href="https://www.ganavatios.com/en/">
```

#### 3. **hreflang Tags para SEO Internacional**
```html
<link rel="alternate" hreflang="es" href="https://www.ganavatios.com/es/" />
<link rel="alternate" hreflang="en" href="https://www.ganavatios.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://www.ganavatios.com/en/" />
```

#### 4. **Open Graph y Twitter Cards**
- Meta tags específicos por idioma para compartir en redes sociales
- Imágenes y descripciones optimizadas
- URLs canónicas con dominio completo

#### 5. **Botones de Compartir en Redes Sociales**
- Facebook, X (Twitter), WhatsApp, LinkedIn
- Copiar enlace al portapapeles
- Iconos circulares minimalistas (45x45px)
- Tooltips descriptivos
- Feedback visual (icono ✓ al copiar)

#### 6. **Código Compartido Sin Duplicación**
- **`assets/styles.css`**: Un solo archivo CSS para todas las versiones
- **`assets/app.js`**: Un solo archivo JavaScript con toda la lógica
- Variables de configuración: `window.GANAVATIOS_LANG` y `window.GANAVATIOS_BASE_PATH`

#### 7. **Redirección Automática Inteligente**
```javascript
// index.html (raíz)
const browserLang = navigator.language || navigator.userLanguage;
const lang = browserLang.startsWith('es') ? 'es' : 'en';
window.location.replace(`/${lang}/`);
```

### 🔧 Mejoras Técnicas

#### Extracción de Assets
- **CSS**: De inline en HTML → `/assets/styles.css`
- **JavaScript**: De inline en HTML → `/assets/app.js`
- Reducción de ~100KB en cada página HTML

#### Sistema de Idioma Forzado
```javascript
// En /es/index.html
window.GANAVATIOS_LANG = 'es';

// En /en/index.html
window.GANAVATIOS_LANG = 'en';
```

#### Selector de Idioma Mejorado
- Ahora navega a URLs específicas (`/es/` o `/en/`)
- Mantiene estado en la URL (SEO-friendly)
- Funciona sin JavaScript (noscript fallback)

### 📊 Ventajas SEO

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **URLs** | Parámetro `?lang=es` | `/es/` y `/en/` |
| **Meta tags** | Dinámicos (JS) | Estáticos por idioma |
| **hreflang** | ❌ No existía | ✅ Implementado |
| **Canonical** | Compartido | Específico por idioma |
| **Open Graph** | Genérico | Específico por idioma |
| **Indexación** | Una página | Dos páginas optimizadas |
| **Contenido duplicado** | Riesgo | Evitado con hreflang |

### 🎨 Mejoras de UI/UX

1. **Botones de compartir circulares**: Diseño minimalista con iconos
2. **Tooltips informativos**: Nombres completos al hover
3. **Feedback visual mejorado**: Animaciones suaves
4. **Responsive optimizado**: Mobile-first con media queries
5. **Widgets interactivos preservados**: Brújula y visualizador de inclinación

### 📝 Archivos Modificados

- ✏️ `index.html` → Convertido a página de redirección
- ➕ `es/index.html` → Nueva página española
- ➕ `en/index.html` → Nueva página inglesa  
- ➕ `assets/styles.css` → CSS extraído
- ➕ `assets/app.js` → JavaScript extraído
- ✏️ `lang/es.json` → Añadidas traducciones de compartir
- ✏️ `lang/en.json` → Añadidas traducciones de compartir
- ✏️ `vercel.json` → Añadidos rewrites para URLs limpias
- ➕ `STRUCTURE.md` → Documentación de arquitectura

### 🚀 Migración

**No requiere cambios en:**
- Archivos de traducción JSON (compatibles)
- Sistema de versionado
- API proxies (PVGIS, PVPC)
- Servidor de desarrollo local

**Beneficios inmediatos:**
- ✅ Mejor ranking en Google
- ✅ URLs compartibles y memorizables
- ✅ Sin contenido duplicado
- ✅ Mejor experiencia en redes sociales

---

## v0.1.0 - Sistema i18n Inicial (Fecha anterior)

### Resumen

Se implementó un sistema de internacionalización que permitía soportar múltiples idiomas de forma dinámica.

## Archivos Creados

### 1. Archivos de Traducción

- **`lang/es.json`** - Traducciones en español
- **`lang/en.json`** - Traducciones en inglés  
- **`lang/README.md`** - Documentación del sistema i18n

### 2. Backup

- **`index.backup.html`** - Copia de seguridad de la versión anterior

## Cambios en el Código

### index.html

**Antes**: Todo el texto estaba hardcodeado en español dentro del HTML.

**Ahora**: 
- HTML genérico con IDs en todos los elementos de texto
- Sistema de carga dinámica de traducciones desde archivos JSON
- Selector de idioma en la esquina superior derecha
- Detección automática del idioma del navegador
- Función `loadLanguage()` para cargar archivos de idioma
- Función `applyTranslations()` para aplicar textos a la UI

### Características Principales

1. **Detección automática del idioma**
   ```javascript
   const browserLang = navigator.language || navigator.userLanguage;
   if (browserLang.startsWith('es')) {
     currentLang = 'es';
   }
   ```

2. **Carga asíncrona de traducciones**
   ```javascript
   fetch(`/lang/${lang}.json`)
     .then(response => response.json())
     .then(data => {
       translations = data;
       applyTranslations();
     });
   ```

3. **Selector de idioma manual**
   - Dropdown en la esquina superior derecha
   - Cambio instantáneo sin recargar la página
   - Actualiza título del documento y atributo `lang`

4. **Traducciones aplicadas a**:
   - Títulos y encabezados
   - Etiquetas de formulario
   - Placeholders
   - Textos de ayuda
   - Botones
   - Mensajes de error
   - Alertas
   - Resultados calculados
   - Popups del mapa

## Ventajas de esta Arquitectura

### ✅ Mantenibilidad
- Separación clara entre código y contenido
- Fácil añadir nuevos idiomas (solo crear nuevo JSON)
- Un solo archivo HTML para todos los idiomas

### ✅ Escalabilidad
- Agregar idiomas sin modificar código
- Traducciones centralizadas
- Fácil de extender

### ✅ Experiencia de Usuario
- Detección automática del idioma
- Cambio instantáneo de idioma
- Sin recarga de página
- Interfaz coherente

## Cómo Añadir un Nuevo Idioma

1. Crear `lang/fr.json` (ejemplo francés)
2. Copiar estructura de `en.json` o `es.json`
3. Traducir todos los valores (mantener las claves)
4. Añadir opción al selector en `index.html`:
   ```html
   <option value="fr">Français</option>
   ```
5. ¡Listo!

## Compatibilidad

- ✅ Funciona con el servidor proxy PVGIS
- ✅ Compatible con todos los navegadores modernos
- ✅ No requiere bibliotecas adicionales
- ✅ Ligero y eficiente (carga solo el idioma necesario)

## Idiomas Soportados Actualmente

| Idioma | Código | Archivo | Estado |
|--------|--------|---------|--------|
| Español | `es` | `lang/es.json` | ✅ Completo |
| English | `en` | `lang/en.json` | ✅ Completo |

## Próximos Pasos (Opcional)

- [ ] Añadir más idiomas (francés, alemán, italiano, etc.)
- [ ] Guardar preferencia de idioma en localStorage
- [ ] Añadir banderas junto a los nombres de idiomas
- [ ] Soporte para formatos de fecha/número según idioma
- [ ] Traducción dinámica del símbolo de moneda

---

**Fecha de implementación**: 19 de abril de 2026
**Versión**: 2.0 (i18n)
