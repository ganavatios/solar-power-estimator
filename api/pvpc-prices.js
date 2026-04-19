// Vercel Serverless Function - PVPC Prices Proxy
// Fetches real electricity prices from Spain's market

export default async function handler(req, res) {
  // Enable CORS for all responses
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
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
    const { country, days } = req.query;
    
    // Default to Spain and last 365 days
    const daysToFetch = parseInt(days) || 365;
    
    // For Spain, use PVPC API
    if (!country || country === 'ES') {
      // Get average prices for the last year from preciodelaluz.org
      // This API provides Spanish electricity prices
      const today = new Date();
      const prices = [];
      
      // Fetch prices for last N days
      // Note: preciodelaluz.org only provides daily data, so we'll fetch daily averages
      // For a more accurate calculation, we'd need ESIOS API which requires authentication
      
      // Simplified approach: fetch today's prices and use as reference
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      
      const apiUrl = `https://api.preciodelaluz.org/v1/prices/avg?zone=PCB&date=${year}-${month}-${day}`;
      
      console.log('Fetching PVPC prices from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`PVPC API returned ${response.status}`);
      }
      
      const data = await response.json();
      
      // Calculate average price from hourly data if available
      // preciodelaluz.org returns prices in €/MWh, convert to €/kWh
      let avgPrice = 0;
      
      if (data.price) {
        // Today's average price in €/MWh, convert to €/kWh
        avgPrice = data.price / 1000;
      } else {
        // Fallback to estimate
        avgPrice = 0.15;
      }
      
      return res.status(200).json({
        country: 'ES',
        averagePrice: avgPrice,
        currency: 'EUR',
        unit: 'kWh',
        source: 'preciodelaluz.org',
        date: `${year}-${month}-${day}`,
        note: 'Daily average price. For accurate hourly matching, ESIOS API would be needed.'
      });
    }
    
    // For other countries, return default estimate
    return res.status(200).json({
      country: country || 'unknown',
      averagePrice: 0.15,
      currency: 'EUR',
      unit: 'kWh',
      source: 'estimate',
      note: 'Estimated average price. Real-time pricing not available for this region.'
    });
    
  } catch (error) {
    console.error('Error fetching PVPC prices:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch electricity prices',
      message: error.message,
      fallbackPrice: 0.15
    });
  }
}
