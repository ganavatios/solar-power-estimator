# GitHub Actions - Auto Version Bump

Este directorio contiene el workflow de GitHub Actions para el versionado automático del proyecto.

## 📋 Workflow: version-bump.yml

### Funcionamiento

El workflow se ejecuta automáticamente en cada push a la rama `master` y realiza las siguientes acciones:

1. **Lee la versión actual** desde `version.json`
2. **Determina el tipo de incremento**:
   - **Minor** (por defecto): Incrementa el segundo número (0.1.0 → 0.2.0)
   - **Patch** (si el commit contiene `[patch]`): Incrementa el tercer número (0.1.0 → 0.1.1)
3. **Actualiza `version.json`** con la nueva versión y la fecha actual
4. **Hace commit** de los cambios automáticamente con el mensaje `chore: bump version to x.y.z [skip ci]`
5. **Push** de los cambios a master

### Ejemplos de Uso

#### Incrementar Minor (por defecto)
```bash
git add .
git commit -m "feat: añadir visualización de paneles"
git push origin master
# Resultado: 0.1.0 → 0.2.0
```

#### Incrementar Patch
```bash
git add .
git commit -m "fix: corregir cálculo de radiación solar [patch]"
git push origin master
# Resultado: 0.1.0 → 0.1.1
```

#### Cambiar Major (manual)

1. Edita `version.json` manualmente:
```json
{
  "version": "1.0.0",
  "date": "2026-04-19"
}
```

2. Haz commit del cambio:
```bash
git add version.json
git commit -m "chore: bump to version 1.0.0 - primera versión estable"
git push origin master
```

3. Los siguientes commits incrementarán desde la nueva versión base:
```bash
git commit -m "feat: nueva característica"
# Resultado: 1.0.0 → 1.1.0
```

### Evitar Bucles Infinitos

El workflow incluye `[skip ci]` en el mensaje de commit para evitar que se ejecute recursivamente cuando hace el commit automático de la versión.

### Requisitos

- El workflow requiere permisos de escritura en el repositorio
- GitHub Actions debe estar habilitado en el repositorio
- El token `GITHUB_TOKEN` se proporciona automáticamente por GitHub

### Personalización

Si necesitas modificar el comportamiento del versionado:

1. Edita `.github/workflows/version-bump.yml`
2. Puedes cambiar:
   - El patrón de detección de patch (actualmente `[patch]`)
   - La lógica de incremento
   - El formato del mensaje de commit
   - La rama que dispara el workflow

### Visualización de Versión

La versión y fecha se muestran automáticamente en el footer de la aplicación:
- **Versión**: Cargada desde `version.json`
- **Fecha de despliegue**: Actualizada automáticamente por el workflow
- **Enlace de contacto**: Genera dinámicamente un mailto con la fecha/hora actual
