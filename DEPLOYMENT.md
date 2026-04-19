# 🚀 Guía de Despliegue Completo

Este proyecto requiere dos despliegues separados para funcionar completamente en producción:

## 1️⃣ GitHub Pages (Frontend) ✅
Ya está configurado y funcionando automáticamente.

## 2️⃣ Vercel (API Proxy) ⚠️ REQUERIDO

### ¿Por qué necesitamos Vercel?

La API de PVGIS no permite llamadas CORS directas desde navegadores. GitHub Pages solo sirve archivos estáticos (HTML, CSS, JS), por lo que necesitamos un servidor backend para hacer de proxy.

**Vercel** proporciona funciones serverless gratuitas que actúan como este proxy.

### Pasos para Desplegar en Vercel

#### Opción 1: Desde GitHub (Recomendado) 🌟

1. **Ir a Vercel**
   - Visita [https://vercel.com](https://vercel.com)
   - Haz clic en "Sign Up" o "Log In"
   - Conecta tu cuenta de GitHub

2. **Importar Proyecto**
   - Clic en "Add New..." → "Project"
   - Busca y selecciona `ganavatios/solar-power-estimator`
   - Clic en "Import"

3. **Configurar Proyecto**
   - **Framework Preset:** Selecciona "Other"
   - **Root Directory:** Dejar `.` (raíz)
   - **Build Command:** Dejar vacío
   - **Output Directory:** Dejar vacío
   - Vercel detectará automáticamente `api/` y `vercel.json`

4. **Deploy**
   - Clic en "Deploy"
   - Espera 1-2 minutos
   - ✅ ¡Desplegado!

5. **Copiar URL de Producción**
   - Vercel te mostrará una URL como:
     ```
     https://solar-power-estimator-xxx.vercel.app
     ```
   - O si configuraste dominio personalizado:
     ```
     https://tu-dominio.vercel.app
     ```

6. **Actualizar `index.html`**
   - Abre `index.html` en tu editor
   - Busca la línea ~591:
     ```javascript
     url = 'https://solar-power-estimator.vercel.app/api/pvgis?' + apiParams;
     ```
   - Reemplaza con tu URL real:
     ```javascript
     url = 'https://TU-URL-REAL.vercel.app/api/pvgis?' + apiParams;
     ```

7. **Commit y Push**
   ```bash
   git add index.html
   git commit -m "feat: update Vercel API URL to production"
   git push
   ```

8. **¡Listo!** 🎉
   - GitHub Pages se actualizará automáticamente
   - Prueba la app en: `https://ganavatios.github.io/solar-power-estimator/`

#### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desde la raíz del proyecto
cd solar-power-estimator

# Login
vercel login

# Deploy
vercel --prod

# Copiar la URL que te devuelve
# Actualizar index.html con esa URL
```

### Verificar el Despliegue

1. **Probar el endpoint directamente**
   ```
   https://TU-URL.vercel.app/api/pvgis?lat=40.4168&lon=-3.7038&peakpower=0.4&loss=14&angle=30&aspect=0
   ```
   Deberías ver JSON con datos de PVGIS

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
