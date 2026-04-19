# Language Files / Archivos de Idioma

This folder contains translation files for the Solar Savings Calculator application.

Esta carpeta contiene los archivos de traducción para la aplicación Calculador de Ahorro Solar.

## Available Languages / Idiomas Disponibles

- 🇬🇧 **English** (`en.json`)
- 🇪🇸 **Español** (`es.json`)

## File Format / Formato de Archivo

Each language file is a JSON object with key-value pairs for all UI text strings.

Cada archivo de idioma es un objeto JSON con pares clave-valor para todos los textos de la interfaz.

### Example / Ejemplo

```json
{
  "title": "Solar Savings Calculator",
  "heading": "Solar Panel Savings Calculator",
  "calculateBtn": "Calculate Savings",
  ...
}
```

## Adding a New Language / Añadir un Nuevo Idioma

1. **Create a new JSON file** / **Crea un nuevo archivo JSON**
   - Copy `en.json` or `es.json` as a template
   - Name it with the ISO 639-1 language code (e.g., `fr.json` for French)

2. **Translate all strings** / **Traduce todas las cadenas**
   - Keep the keys unchanged
   - Translate only the values

3. **Add to language selector** / **Añade al selector de idioma**
   - Edit `index.html`
   - Add a new option to the `#langSelector` element:
   ```html
   <option value="fr">Français</option>
   ```

4. **Test** / **Prueba**
   - Start the server and verify all translations appear correctly

## Translation Keys / Claves de Traducción

| Key | Purpose |
|-----|---------|
| `title` | Browser page title |
| `heading` | Main heading |
| `calculateBtn` | Calculate button text |
| `resultsTitle` | Results section title |
| `errorCalculating` | Error message header |
| `alert*` | Alert/popup messages |
| `popup*` | Map marker popup text |
| `label*` | Form field labels |
| `help*` | Helper text below inputs |

## Notes / Notas

- The application auto-detects the browser language on first load
- Users can manually switch languages using the selector in the top-right
- All translations are loaded dynamically via AJAX
- Currency symbol (€) is hardcoded and not translated

---

For questions or to contribute translations, please open an issue.

Para preguntas o contribuir con traducciones, por favor abre un issue.
