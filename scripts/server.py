#!/usr/bin/env python3
"""
Servidor proxy para la API de PVGIS
Soluciona problemas de CORS al hacer peticiones desde el navegador
Solo necesario para desarrollo local
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs, urlencode
import urllib.request
import json
import sys
import os

class ProxyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        
        # Check if it's an API request
        if parsed_path.path == '/api/pvgis':
            self.handle_pvgis_request(parsed_path)
        elif parsed_path.path == '/api/pvpc-prices':
            self.handle_pvpc_prices_request(parsed_path)
        else:
            # Serve static files normally
            super().do_GET()
    
    def handle_pvgis_request(self, parsed_path):
        """Proxy requests to PVGIS API"""
        try:
            # Parse query parameters
            params = parse_qs(parsed_path.query)
            
            # Build PVGIS API URL
            pvgis_params = {
                'lat': params.get('lat', [''])[0],
                'lon': params.get('lon', [''])[0],
                'peakpower': params.get('peakpower', ['1'])[0],
                'loss': params.get('loss', ['14'])[0],
                'angle': params.get('angle', ['0'])[0],
                'aspect': params.get('aspect', ['0'])[0],
                'outputformat': 'json'
            }
            
            pvgis_url = 'https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?' + urlencode(pvgis_params)
            
            print(f"Proxying request to: {pvgis_url}")
            
            # Make request to PVGIS
            with urllib.request.urlopen(pvgis_url, timeout=30) as response:
                data = response.read()
                
                # Send response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(data)
                
        except Exception as e:
            print(f"Error: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            error_response = json.dumps({'error': str(e)})
            self.wfile.write(error_response.encode())
    
    def handle_pvpc_prices_request(self, parsed_path):
        """Proxy requests to PVPC prices API"""
        try:
            from datetime import datetime
            
            # Parse query parameters
            params = parse_qs(parsed_path.query)
            country = params.get('country', ['ES'])[0]
            
            # For Spain, fetch PVPC prices
            if country == 'ES':
                today = datetime.now()
                year = today.year
                month = str(today.month).zfill(2)
                day = str(today.day).zfill(2)
                
                pvpc_url = f'https://api.preciodelaluz.org/v1/prices/avg?zone=PCB&date={year}-{month}-{day}'
                
                print(f"Fetching PVPC prices from: {pvpc_url}")
                
                with urllib.request.urlopen(pvpc_url, timeout=10) as response:
                    data = json.loads(response.read().decode())
                    
                    # Calculate average price (convert from €/MWh to €/kWh)
                    avg_price = data.get('price', 150) / 1000 if 'price' in data else 0.15
                    
                    result = {
                        'country': 'ES',
                        'averagePrice': avg_price,
                        'currency': 'EUR',
                        'unit': 'kWh',
                        'source': 'preciodelaluz.org',
                        'date': f'{year}-{month}-{day}',
                        'note': 'Daily average price. For accurate hourly matching, ESIOS API would be needed.'
                    }
                    
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps(result).encode())
                    
            else:
                # Fallback for other countries
                result = {
                    'country': country,
                    'averagePrice': 0.15,
                    'currency': 'EUR',
                    'unit': 'kWh',
                    'source': 'estimate',
                    'note': 'Estimated average price. Real-time pricing not available for this region.'
                }
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(result).encode())
                
        except Exception as e:
            print(f"Error fetching PVPC prices: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            error_response = json.dumps({
                'error': str(e),
                'fallbackPrice': 0.15
            })
            self.wfile.write(error_response.encode())
    
    def end_headers(self):
        # Add CORS headers to all responses
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def run_server(port=8000):
    # Change to parent directory to serve files from root
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    os.chdir(project_root)
    
    server_address = ('', port)
    httpd = HTTPServer(server_address, ProxyHandler)
    print("=" * 60)
    print("  🌞 Servidor Web - Calculador de Ahorro Solar")
    print("=" * 60)
    print(f"\n✅ Servidor corriendo en: http://localhost:{port}")
    print(f"✅ Abre tu navegador en: http://localhost:{port}/index.html")
    print("\n📝 Nota: Este servidor incluye un proxy para PVGIS API")
    print("   (necesario para evitar problemas de CORS en desarrollo local)")
    print("\n❌ Presiona Ctrl+C para detener el servidor\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n🛑 Servidor detenido.")
        sys.exit(0)

if __name__ == '__main__':
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"Error: Puerto inválido '{sys.argv[1]}'. Usando puerto por defecto 8000.")
    run_server(port)
