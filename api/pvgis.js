// Vercel Serverless Function - PVGIS API Proxy
// This allows GitHub Pages to access PVGIS API without CORS issues

export default async function handler(req, res) {
  // Enable CORS for all responses
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Extract query parameters
    const { lat, lon, peakpower, loss, angle, aspect } = req.query;
    
    // Validate required parameters
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Missing required parameters: lat, lon' });
    }
    
    // Build PVGIS API URL
    const pvgisUrl = new URL('https://re.jrc.ec.europa.eu/api/v5_2/PVcalc');
    pvgisUrl.searchParams.set('lat', lat);
    pvgisUrl.searchParams.set('lon', lon);
    pvgisUrl.searchParams.set('peakpower', peakpower || '1');
    pvgisUrl.searchParams.set('loss', loss || '14');
    pvgisUrl.searchParams.set('angle', angle || '0');
    pvgisUrl.searchParams.set('aspect', aspect || '0');
    pvgisUrl.searchParams.set('outputformat', 'json');
    
    console.log('Proxying request to PVGIS:', pvgisUrl.toString());
    
    // Fetch from PVGIS API
    const response = await fetch(pvgisUrl.toString());
    
    if (!response.ok) {
      throw new Error(`PVGIS API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return the data
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error proxying PVGIS request:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch data from PVGIS',
      message: error.message 
    });
  }
}
