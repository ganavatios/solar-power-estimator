# Configuración de DNS para GanaVatios

## Problema Actual

- **www.ganavatios.com** → GitHub Pages (solo archivos estáticos, sin APIs)
- **APIs de Vercel** → No accesibles desde el dominio principal
- **Resultado**: Error 404 en `/api/pvgis` y `/api/pvpc-prices`

## Solución Implementada (Temporal)

El código ahora usa:
- **Local**: `http://localhost:8000/api/*` (servidor Python)
- **Producción**: `https://solar-power-estimator-8rlzj9qvb-ganavatios-projects.vercel.app/api/*` (Vercel directamente)

**⚠️ TEMPORAL**: Usando URL de Vercel directa. Cuando configures `api.ganavatios.com`, se cambiará a esa URL.

## Configuración Necesaria en DNS

### Opción A: TODO en Vercel (Recomendado ⭐)

**Ventajas:**
- Un solo despliegue
- Sin problemas de CORS
- Cache optimizado
- Serverless functions integradas

**Pasos:**

1. **En Vercel Dashboard:**
   - Ir a proyecto → Settings → Domains
   - Add domain: `www.ganavatios.com`
   - Vercel mostrará el DNS a configurar

2. **En tu proveedor de DNS:**
   ```
   CNAME  www  cname.vercel-dns.com
   ```

3. **Desactivar GitHub Pages:**
   - GitHub repo → Settings → Pages
   - Source: None

4. **Revertir cambios en código:**
   ```javascript
   // Volver a URLs relativas en assets/app.js
   var url = '/api/pvgis?' + apiParams;
   var pricesUrl = '/api/pvpc-prices?country=ES';
   ```

---

### Opción B: Dual (GitHub Pages + Vercel API)

**Ventajas:**
- Mantiene GitHub Pages como está
- APIs en subdominio separado

**Desventajas:**
- Gestión de dos deploys
- Posibles problemas de CORS
- Más complejo

**Pasos:**

1. **En Vercel Dashboard:**
   - Add domain: `api.ganavatios.com`
   - Copiar el valor del CNAME que te da Vercel

2. **En tu proveedor de DNS:**
   ```
   CNAME  api  cname.vercel-dns.com
   ```
   (Mantener el CNAME actual de `www` apuntando a GitHub Pages)

3. **Código ya configurado:**
   - ✅ `assets/app.js` ya usa `https://api.ganavatios.com/api/*`

---

## Estado Actual del Código

**Configuración activa:** Opción B (dual)

```javascript
// En assets/app.js
var isLocal = window.location.hostname === 'localhost' || ...;
var url = isLocal 
  ? '/api/pvgis?' + apiParams
  : 'https://api.ganavatios.com/api/pvgis?' + apiParams;
```

## Verificación Post-Configuración

### Para Opción A (TODO en Vercel):

1. Esperar propagación DNS (5-60 minutos)
2. Visitar: https://www.ganavatios.com/
3. Verificar en DevTools que las APIs funcionen:
   ```
   GET https://www.ganavatios.com/api/pvgis?... → 200 OK
   GET https://www.ganavatios.com/api/pvpc-prices?... → 200 OK
   ```

### Para Opción B (Dual):

1. Esperar propagación DNS (5-60 minutos)
2. Verificar subdominio API:
   ```
   GET https://api.ganavatios.com/api/pvgis?lat=40&lon=-3&... → 200 OK
   ```
3. Verificar desde web principal:
   ```
   Visitar: https://www.ganavatios.com/es/
   Calcular ahorro → Debe funcionar sin errores CORS
   ```

## Comandos de Verificación

```bash
# Verificar DNS actual
nslookup www.ganavatios.com
nslookup api.ganavatios.com

# Verificar CNAME
dig www.ganavatios.com CNAME
dig api.ganavatios.com CNAME

# Probar API directamente
curl https://api.ganavatios.com/api/pvpc-prices?country=ES
```

## Recomendación Final

**Usa Opción A** (todo en Vercel) porque:
- ✅ Más simple de mantener
- ✅ Mejor rendimiento (CDN global de Vercel)
- ✅ Sin problemas de CORS
- ✅ Deploy automático desde GitHub
- ✅ Analytics y logs integrados
- ✅ HTTPS automático

GitHub Pages solo es útil si necesitas hosting estático gratuito, pero Vercel también es gratuito y tiene más features.
