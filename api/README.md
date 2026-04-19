# PVGIS API Proxy - Vercel Serverless Function

Esta función serverless actúa como proxy para la API de PVGIS, solucionando problemas de CORS cuando la aplicación se despliega en GitHub Pages.

## ¿Por qué necesitamos esto?

PVGIS API (`https://re.jrc.ec.europa.eu/api/v5_2/PVcalc`) no permite solicitudes CORS desde navegadores en dominios diferentes. Para que nuestra aplicación en GitHub Pages funcione, necesitamos un proxy intermedio.

## Cómo funciona

1. El cliente (navegador) hace una petición a nuestra función serverless
2. La función serverless hace la petición a PVGIS API
3. La función añade los headers CORS necesarios
4. El cliente recibe los datos sin problemas de CORS

## Parámetros Soportados

- `lat` (requerido): Latitud
- `lon` (requerido): Longitud
- `peakpower`: Potencia pico instalada en kWp (default: 1)
- `loss`: Pérdidas del sistema en % (default: 14)
- `angle`: Inclinación de los paneles en grados (default: 0)
- `aspect`: Orientación azimut en grados (default: 0)

## Ejemplo de Uso

```javascript
const url = 'https://YOUR-VERCEL-URL.vercel.app/api/pvgis?lat=40.4168&lon=-3.7038&peakpower=0.4&loss=14&angle=30&aspect=0';
const response = await fetch(url);
const data = await response.json();
```

## Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa el repositorio `ganavatios/solar-power-estimator`
4. Vercel detectará automáticamente la configuración
5. Haz clic en "Deploy"
6. Copia la URL del proyecto desplegado
7. Actualiza la URL en `index.html` línea ~535

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desde la raíz del proyecto
vercel

# Seguir las instrucciones
# Copiar la URL de producción
```

### Actualizar la URL en el código

En `index.html`, busca esta línea:

```javascript
url = 'https://solar-power-estimator-rho.vercel.app/api/pvgis?' + apiParams;
```

Reemplaza `solar-power-estimator-rho.vercel.app` con tu URL real de Vercel.

## Testing Local

Para probar la función localmente con Vercel Dev:

```bash
npm install -g vercel
vercel dev
```

La función estará disponible en `http://localhost:3000/api/pvgis`

## Alternativas

Si no quieres usar Vercel, puedes desplegar esta misma función en:

- **Netlify Functions**: Mover `api/pvgis.js` a `netlify/functions/pvgis.js`
- **Cloudflare Workers**: Adaptar el código para Workers API
- **AWS Lambda**: Usar con API Gateway

## Monitoreo

Vercel proporciona logs y analíticas automáticamente. Puedes ver:
- Número de peticiones
- Latencia
- Errores
- Uso de recursos

En el dashboard de Vercel.

## Límites Gratuitos de Vercel

- 100 GB de ancho de banda/mes
- 100,000 ejecuciones de funciones/día
- 100 horas de GB-Hrs de cómputo/mes

Más que suficiente para este proyecto.
