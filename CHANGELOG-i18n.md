# Internacionalización (i18n) - Cambios Realizados

## Resumen

Se ha implementado un sistema de internacionalización completo que permite soportar múltiples idiomas de forma fácil y mantenible.

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
