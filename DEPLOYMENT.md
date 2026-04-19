# 🚀 Guía de Despliegue en Vercel

Este proyecto está completamente desplegado en **Vercel**, incluyendo frontend y serverless functions.

## ✅ Arquitectura Actual

**Todo en Vercel:**
- Frontend (HTML, CSS, JS) → Vercel CDN
- Serverless Functions (APIs) → Vercel Functions
- Dominio: www.ganavatios.com → Vercel

**Ventajas:**
- ✅ Sin problemas de CORS (mismo dominio)
- ✅ Deploy automático desde GitHub
- ✅ HTTPS automático
- ✅ CDN global para máximo rendimiento
- ✅ Una sola plataforma para gestionar

## 📋 Requisitos Previos

- Cuenta de GitHub
- Cuenta de Vercel (gratis en https://vercel.com)
- Repositorio: `ganavatios/solar-power-estimator`

## 🚀 Pasos para Desplegar

### 1. Conectar con Vercel

1. **Ir a Vercel**
   - Visita [https://vercel.com](https://vercel.com)
   - Click en "Sign Up" o "Log In"
   - Conecta tu cuenta de GitHub

2. **Importar Proyecto**
   - Click en "Add New..." → "Project"
   - Selecciona "Import Git Repository"
   - Busca `ganavatios/solar-power-estimator`
   - Click en "Import"

3. **Configurar Proyecto**
   - **Framework Preset:** Other
   - **Root Directory:** `.` (raíz)
   - **Build Command:** (dejar vacío)
   - **Output Directory:** (dejar vacío)
   - Vercel detectará automáticamente:
     - `/api/` folder → Serverless Functions
     - `vercel.json` → Configuración

4. **Deploy**
   - Click en "Deploy"
   - Espera ~30 segundos
   - ✅ ¡Desplegado!

### 2. Configurar Dominio Personalizado

1. **En Vercel Dashboard**
   - Ve a tu proyecto → Settings → Domains
   - Click en "Add Domain"
   - Ingresa: `www.ganavatios.com`
   - Vercel te mostrará el CNAME a configurar

2. **En tu Proveedor de DNS**
   - Edita el registro CNAME de `www`:
   ```
   Tipo:  CNAME
   Name:  www
   Value: cname.vercel-dns.com
   TTL:   Auto (o 3600)
   ```

3. **Verificar en Vercel**
   - Vuelve a Vercel → Domains
   - Espera propagación DNS (5-60 minutos)
   - Verás "Valid" cuando esté listo ✅

### 3. Deploy Automático

**Ya configurado:**
- Cada push a `main` → Vercel redespliega automáticamente
- GitHub Actions → Incrementa versión en `version.json`
- Build time: ~30 segundos
- Propagación global: ~1 minuto

**No se requieren cambios en el código** - Las URLs son relativas (`/api/*`)

## 🧪 Verificar el Despliegue

### 1. Probar APIs Directamente

**PVPC Prices:**
```
https://www.ganavatios.com/api/pvpc-prices?country=ES
```
Debería devolver JSON con precios de electricidad.

**PVGIS:**
```
https://www.ganavatios.com/api/pvgis?lat=40.4168&lon=-3.7038&peakpower=0.4&loss=14&angle=30&aspect=0
```
Debería devolver JSON con datos de radiación solar.

### 2. Probar la Aplicación

1. Visita: https://www.ganavatios.com/
2. Selecciona idioma (auto-detectado)
3. Click en el mapa para seleccionar ubicación
4. Configura parámetros
5. Click "Calcular Ahorro"
6. **Debería funcionar sin errores** ✅

### 3. Verificar en DevTools (F12)

En la consola deberías ver:
```
Modo PRODUCCIÓN: obteniendo precios PVPC
Fetching PVPC prices from: /api/pvpc-prices?country=ES
Modo PRODUCCIÓN: usando Vercel
URL de la petición: /api/pvgis?lat=...
```

## 🔧 Troubleshooting

### Error: CORS blocked

**Causa:** Dominio personalizado no configurado correctamente en Vercel.

**Solución:**
1. Vercel Dashboard → Domains
2. Verificar que `www.ganavatios.com` está "Valid"
3. Si no, revisar configuración DNS

### Error: 404 en /api/*

**Causa:** Serverless functions no desplegadas.

**Solución:**
1. Vercel Dashboard → Deployments → Latest
2. Verificar que aparecen en "Functions":
   - `/api/pvgis`
   - `/api/pvpc-prices`
3. Si no aparecen, revisar estructura de carpetas:
   ```
   /api/
     pvgis.js
     pvpc-prices.js
   ```

### Deploy no automático

**Causa:** Integración GitHub-Vercel desconectada.

**Solución:**
1. Vercel Dashboard → Settings → Git
2. Verificar que esté conectado al repo
3. Re-conectar si es necesario

## 📊 Monitoreo

**Vercel Dashboard proporciona:**
- Analytics de visitantes
- Logs de serverless functions
- Métricas de rendimiento
- Error tracking

**Acceder:**
1. https://vercel.com/dashboard
2. Seleccionar proyecto
3. Ver Analytics, Logs, etc.

## 🔄 Rollback

Si algo sale mal, Vercel permite rollback instant

2. **Revisar logs en Vercel**
   - Dashboard de Vercel → Tu proyecto → Functions
   - Verás las llamadas a `/api/pvgis`

### Solución de Problemas

**Error: "La respuesta no es JSON"**
- ✅ Vercel no está desplegado o la URL es incorrecta
- Solución: Sigue los pasos arriba

**Error: "404" en /api/pvgis**
- ✅ La función serverless no se desplegó correctamente
- Solución: Verifica que `api/pvgis.js` y `vercel.json` existan en el repositorio

**Error: "CORS policy"**
- ✅ Headers CORS no configurados
- Solución: Verifica que `vercel.json` tenga la configuración de headers

### Configuración de Dominio Personalizado (Opcional)

1. En Vercel Dashboard → Settings → Domains
2. Añade tu dominio personalizado
3. Configura DNS según instrucciones
4. Actualiza URL en `index.html`

### Plan Gratuito de Vercel

El plan gratuito incluye:
- ✅ 100 GB bandwidth/mes
- ✅ 100,000 invocaciones/día
- ✅ Serverless functions ilimitadas
- ✅ HTTPS automático
- ✅ Despliegues automáticos desde GitHub

**Más que suficiente para este proyecto.**

### Arquitectura Final

```
Usuario
  ↓
GitHub Pages (HTML/CSS/JS)
  ↓ (petición a /api/pvgis)
Vercel Serverless Function
  ↓ (petición con CORS)
PVGIS API
  ↓ (respuesta)
Vercel Serverless Function
  ↓ (respuesta con headers CORS)
GitHub Pages
  ↓
Usuario (ve resultados)
```

### Comandos Útiles

```bash
# Ver estado del deployment
vercel ls

# Ver logs en tiempo real
vercel logs

# Eliminar deployment
vercel rm <deployment-url>

# Configurar variables de entorno
vercel env add
```

## Alternativas a Vercel

Si prefieres no usar Vercel:

### Netlify Functions
1. Mover `api/pvgis.js` a `netlify/functions/pvgis.js`
2. Desplegar en Netlify
3. URL será: `https://tu-sitio.netlify.app/.netlify/functions/pvgis`

### Cloudflare Workers
- Adaptar código para Workers API
- Deploy gratuito

### Railway, Render, Fly.io
- Desplegar el servidor Python completo
- Más complejo, no recomendado para este caso

---

## ❓ ¿Necesitas Ayuda?

- 📧 Contacto: ganavatios@gmail.com
- 📚 Documentación Vercel: https://vercel.com/docs
- 📚 Documentación PVGIS API: https://joint-research-centre.ec.europa.eu/pvgis-online-tool/pvgis-data-download/api-pvgis_en
