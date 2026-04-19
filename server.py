#!/usr/bin/env python3
"""
Servidor proxy para la API de PVGIS
Soluciona problemas de CORS al hacer peticiones desde el navegador
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs, urlencode
import urllib.request
import json
import sys

class ProxyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        
        # Check if it's an API request
        if parsed_path.path == '/api/pvgis':
            self.handle_pvgis_request(parsed_path)
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
    
    def end_headers(self):
        # Add CORS headers to all responses
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, ProxyHandler)
    print("=" * 50)
    print("  Servidor Web - Calculador Solar")
    print("=" * 50)
    print(f"\nServidor corriendo en: http://localhost:{port}")
    print(f"Abre tu navegador en: http://localhost:{port}/index.html")
    print("\nPresiona Ctrl+C para detener el servidor\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\nServidor detenido.")
        sys.exit(0)

if __name__ == '__main__':
    port = 8000
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    run_server(port)
