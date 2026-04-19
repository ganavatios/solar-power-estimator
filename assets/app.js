/* GanaVatios - Solar Power Estimator Application */
/* This file contains all the shared JavaScript logic */

(function() {
  'use strict';

  // Configuration - can be overridden by setting window.GANAVATIOS_LANG before loading this script
  const FORCED_LANG = window.GANAVATIOS_LANG || null;
  const BASE_PATH = window.GANAVATIOS_BASE_PATH || '../';

  // Initialize map after DOM is ready
  var map = L.map('map').setView([40.4168, -3.7038], 6); // Default: Madrid
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);
  
  // Fix map size issues
  setTimeout(function() {
    map.invalidateSize();
  }, 100);

  // Reorganizar mapa en móvil
  function reorganizeMapForMobile() {
    var mapElement = document.getElementById('map');
    var headerContainer = document.querySelector('.header-container');
    var contentWrapper = document.querySelector('.content-wrapper');
    
    if (window.innerWidth <= 768) {
      // Móvil: mover el mapa después del header dentro del content-wrapper
      if (mapElement.parentElement.className !== 'content-wrapper') {
        headerContainer.parentNode.insertBefore(mapElement, headerContainer.nextSibling);
      }
    } else {
      // Desktop: mover el mapa fuera del content-wrapper
      var container = document.querySelector('.container');
      if (mapElement.parentElement.className === 'content-wrapper') {
        container.appendChild(mapElement);
      }
    }
    
    // Redimensionar mapa
    setTimeout(function() {
      map.invalidateSize();
    }, 100);
  }

  // Ejecutar al cargar y al redimensionar
  reorganizeMapForMobile();
  window.addEventListener('resize', reorganizeMapForMobile);

  // Variable to store selected location
  var selectedLat = null;
  var selectedLng = null;

  // Language management
  let currentLang = FORCED_LANG || 'es';
  let translations = {};

  // Detect browser language if not forced
  if (!FORCED_LANG) {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('es')) {
      currentLang = 'es';
    } else {
      currentLang = 'en';
    }
  }

  // Load language file
  function loadLanguage(lang) {
    return fetch(BASE_PATH + `lang/${lang}.json`)
      .then(response => response.json())
      .then(data => {
        translations = data;
        currentLang = lang;
        applyTranslations();
        document.documentElement.lang = lang;
        // Only update title if it's not already set (for SEO)
        if (!document.title || document.title === 'Calculador de Ahorro Solar' || document.title === 'Solar Savings Calculator') {
          document.title = translations.title;
        }
      })
      .catch(err => {
        console.error('Error loading language file:', err);
      });
  }

  // Apply translations to UI
  function applyTranslations() {
    document.getElementById('heading').textContent = translations.heading;
    document.getElementById('mapInstruction').textContent = translations.mapInstruction;
    document.getElementById('locationSelectedLabel').textContent = translations.locationSelected;
    document.getElementById('labelPanelPower').textContent = translations.panelPower;
    document.getElementById('panelPower').placeholder = translations.panelPowerPlaceholder;
    document.getElementById('labelTilt').textContent = translations.tilt;
    document.getElementById('tilt').placeholder = translations.tiltPlaceholder;
    document.getElementById('helpTilt').textContent = translations.tiltHelp;
    document.getElementById('labelAzimuth').textContent = translations.azimuth;
    document.getElementById('azimuth').placeholder = translations.azimuthPlaceholder;
    document.getElementById('helpAzimuth').textContent = translations.azimuthHelp;
    document.getElementById('labelSystemLoss').textContent = translations.systemLoss;
    document.getElementById('systemLoss').placeholder = translations.systemLossPlaceholder;
    document.getElementById('helpSystemLoss').textContent = translations.systemLossHelp;
    document.getElementById('labelTariffType').textContent = translations.tariffType;
    document.getElementById('labelTariffPvpc').textContent = translations.tariffPvpc;
    document.getElementById('helpTariffPvpc').textContent = translations.helpTariffPvpc;
    document.getElementById('labelTariffFixed').textContent = translations.tariffFixed;
    document.getElementById('labelPriceFixed').textContent = translations.priceFixed;
    document.getElementById('priceFixed').placeholder = translations.priceFixedPlaceholder;
    document.getElementById('calcBtn').textContent = translations.calculateBtn;
    
    // Footer translations
    document.getElementById('versionText').textContent = translations.versionText;
    document.getElementById('deployText').textContent = translations.deployText;
    document.getElementById('contactText').textContent = translations.contactText;
    document.getElementById('getLocationText').textContent = translations.getLocationText;
    
    // Update contact link with current date/time
    updateContactLink();
    
    // Update flag selector visual state
    updateFlagSelector();
  }

  // Update flag selector visual state
  function updateFlagSelector() {
    document.querySelectorAll('.lang-flag').forEach(flag => {
      if (flag.dataset.lang === currentLang) {
        flag.classList.add('active');
      } else {
        flag.classList.remove('active');
      }
    });
  }

  // Language flag selector - navigate to language-specific pages
  document.querySelectorAll('.lang-flag').forEach(flag => {
    flag.addEventListener('click', function() {
      const targetLang = this.dataset.lang;
      // Navigate to language-specific page
      if (targetLang === 'es') {
        window.location.href = BASE_PATH + 'es/';
      } else if (targetLang === 'en') {
        window.location.href = BASE_PATH + 'en/';
      }
    });
  });

  // Load initial language
  loadLanguage(currentLang);

  // Load version information
  function loadVersion() {
    fetch(BASE_PATH + 'version.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('versionNumber').textContent = data.version;
        
        // Format date and time
        if (data.datetime) {
          const deployDate = new Date(data.datetime);
          const dateStr = deployDate.toLocaleDateString(currentLang === 'es' ? 'es-ES' : 'en-US');
          const timeStr = deployDate.toLocaleTimeString(currentLang === 'es' ? 'es-ES' : 'en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
          document.getElementById('deployDate').textContent = dateStr + ' ' + timeStr;
        } else if (data.date) {
          document.getElementById('deployDate').textContent = data.date;
        }
      })
      .catch(err => {
        console.error('Error loading version:', err);
      });
  }

  // Update contact link with current date/time
  function updateContactLink() {
    const now = new Date();
    const dateTimeStr = now.toISOString().replace('T', ' ').substring(0, 19);
    const subject = encodeURIComponent(`[SPSC] - ${dateTimeStr} contact`);
    const mailtoLink = `mailto:ganavatios@gmail.com?subject=${subject}`;
    document.getElementById('contactLink').href = mailtoLink;
  }

  // Load version on page load
  loadVersion();

  // Function to get user's current location
  function getUserLocation() {
    if (!navigator.geolocation) {
      alert(translations.locationError || 'Geolocalización no disponible en este navegador.');
      return;
    }

    var locationBtn = document.getElementById('getLocationBtn');
    var locationBtnText = document.getElementById('getLocationText');
    
    // Disable button and show loading state
    locationBtn.disabled = true;
    locationBtnText.textContent = translations.gettingLocation || 'Obteniendo ubicación...';

    navigator.geolocation.getCurrentPosition(function(pos) {
      selectedLat = pos.coords.latitude;
      selectedLng = pos.coords.longitude;
      map.setView([selectedLat, selectedLng], 13);
      
      // Remove old markers
      map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });
      
      L.marker([selectedLat, selectedLng]).addTo(map)
        .bindPopup(translations.popupCurrentLocation || 'Tu ubicación actual').openPopup();
      
      // Show coordinates
      document.getElementById('locationInfo').style.display = 'block';
      document.getElementById('coordsDisplay').textContent = 
        selectedLat.toFixed(4) + '°N, ' + selectedLng.toFixed(4) + '°E';
      
      // Re-enable button
      locationBtn.disabled = false;
      locationBtnText.textContent = translations.getLocationText || 'Obtener mi ubicación';
    }, function(err) {
      console.warn('Error de geolocalización:', err);
      alert(translations.locationError || 'No se pudo obtener la ubicación. Por favor, verifica los permisos del navegador.');
      
      // Re-enable button
      locationBtn.disabled = false;
      locationBtnText.textContent = translations.getLocationText || 'Obtener mi ubicación';
    });
  }

  // Get location button handler
  document.getElementById('getLocationBtn').addEventListener('click', getUserLocation);

  // Geolocation on load (optional automatic detection)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      selectedLat = pos.coords.latitude;
      selectedLng = pos.coords.longitude;
      map.setView([selectedLat, selectedLng], 13);
      L.marker([selectedLat, selectedLng]).addTo(map)
        .bindPopup(translations.popupCurrentLocation || 'Tu ubicación actual').openPopup();
      
      // Show coordinates
      document.getElementById('locationInfo').style.display = 'block';
      document.getElementById('coordsDisplay').textContent = 
        selectedLat.toFixed(4) + '°N, ' + selectedLng.toFixed(4) + '°E';
    }, function(err) {
      console.warn('Geolocalización automática no disponible:', err);
    });
  }

  // Map click to set location
  map.on('click', function(e) {
    selectedLat = e.latlng.lat;
    selectedLng = e.latlng.lng;
    
    // Remove old markers
    map.eachLayer(function(layer) {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });
    
    // Add new marker with popup
    L.marker([selectedLat, selectedLng]).addTo(map)
      .bindPopup((translations.popupSelectedLocation || 'Ubicación seleccionada') + '<br>' + selectedLat.toFixed(4) + '°, ' + selectedLng.toFixed(4) + '°')
      .openPopup();
    
    // Show coordinates
    document.getElementById('locationInfo').style.display = 'block';
    document.getElementById('coordsDisplay').textContent = 
      selectedLat.toFixed(4) + '°N, ' + selectedLng.toFixed(4) + '°E';
  });

  // Show/hide fixed tariff fields
  var tariffRadios = document.querySelectorAll('input[name="tariff"]');
  tariffRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      var fixedFields = document.getElementById('fixedTariffFields');
      if (radio.value === 'fixed') {
        fixedFields.style.display = 'block';
      } else {
        fixedFields.style.display = 'none';
      }
    });
  });

  // Compass widget for azimuth selection
  var azimuthInput = document.getElementById('azimuth');
  var compassNeedle = document.getElementById('compassNeedle');
  var compassWidget = document.getElementById('compassWidget');

  // Update needle rotation based on azimuth value
  function updateCompassNeedle(azimuth) {
    var rotation = azimuth + 180;
    compassNeedle.style.transform = 'translate(-50%, -100%) rotate(' + rotation + 'deg)';
  }

  // Initialize needle position
  updateCompassNeedle(parseFloat(azimuthInput.value) || 0);

  // Update needle when input changes
  azimuthInput.addEventListener('input', function() {
    var azimuth = parseFloat(this.value) || 0;
    updateCompassNeedle(azimuth);
  });

  // Click on compass to set azimuth
  compassWidget.addEventListener('click', function(e) {
    var rect = compassWidget.getBoundingClientRect();
    var centerX = rect.width / 2;
    var centerY = rect.height / 2;
    var clickX = e.clientX - rect.left - centerX;
    var clickY = e.clientY - rect.top - centerY;
    
    var angleRad = Math.atan2(clickX, -clickY);
    var angleDeg = angleRad * (180 / Math.PI);
    var azimuth = angleDeg - 180;
    
    if (azimuth > 180) azimuth -= 360;
    if (azimuth < -180) azimuth += 360;
    
    azimuth = Math.round(azimuth);
    
    azimuthInput.value = azimuth;
    updateCompassNeedle(azimuth);
  });

  // Tilt visualizer for panel inclination
  var tiltInput = document.getElementById('tilt');
  var panelLine = document.getElementById('panelLine');
  var tiltAngleLabel = document.getElementById('tiltAngleLabel');
  var tiltVisualizer = document.getElementById('tiltVisualizer');

  // Update panel line based on tilt angle
  function updateTiltVisualizer(tilt) {
    tilt = Math.max(0, Math.min(90, tilt));
    panelLine.style.transform = 'rotate(' + (-tilt) + 'deg)';
    tiltAngleLabel.textContent = Math.round(tilt) + '°';
  }

  // Initialize tilt visualizer
  updateTiltVisualizer(parseFloat(tiltInput.value) || 30);

  // Update visualizer when input changes
  tiltInput.addEventListener('input', function() {
    var tilt = parseFloat(this.value) || 0;
    updateTiltVisualizer(tilt);
  });

  // Click on tilt visualizer to set angle
  tiltVisualizer.addEventListener('click', function(e) {
    var rect = tiltVisualizer.getBoundingClientRect();
    var clickX = e.clientX - rect.left;
    var clickY = e.clientY - rect.top;
    
    var originX = 10;
    var originY = rect.height - 10;
    
    var deltaX = clickX - originX;
    var deltaY = originY - clickY;
    
    var angleRad = Math.atan2(deltaY, deltaX);
    var tilt = angleRad * (180 / Math.PI);
    
    tilt = Math.max(0, Math.min(90, Math.round(tilt)));
    
    tiltInput.value = tilt;
    updateTiltVisualizer(tilt);
  });

  // Calculate button handler
  document.getElementById('calcBtn').addEventListener('click', function() {
    var panelPowerWp = parseFloat(document.getElementById('panelPower').value) || 0;
    var panelPower = panelPowerWp / 1000;
    var tilt = parseFloat(document.getElementById('tilt').value) || 0;
    var azimuth = parseFloat(document.getElementById('azimuth').value) || 0;
    var systemLoss = parseFloat(document.getElementById('systemLoss').value) || 14;
    var tariffType = document.querySelector('input[name="tariff"]:checked').value;
    var priceFixed = parseFloat(document.getElementById('priceFixed').value) || 0.18;

    if (panelPower <= 0) {
      alert(translations.alertInvalidPower || 'Por favor, introduce una potencia válida.');
      return;
    }

    var lat = selectedLat;
    var lng = selectedLng;
    if (lat === null || lng === null) {
      alert(translations.alertSelectLocation || 'Por favor, permite la geolocalización o haz clic en el mapa para seleccionar una ubicación.');
      return;
    }

    var country = 'unknown';
    if (lat >= 36 && lat <= 44 && lng >= -10 && lng <= 5) {
      country = 'ES';
    }

    var resultsDiv = document.getElementById('results');
    var progressContainer = document.getElementById('progressContainer');
    var progressBar = document.getElementById('progressBar');
    var progressMessage = document.getElementById('progressMessage');
    
    resultsDiv.innerHTML = '';
    progressContainer.classList.add('active');
    progressBar.style.width = '0%';
    progressMessage.textContent = translations.calculating || 'Consultando datos de radiación solar...';

    function fetchPriceAndCalculate() {
      if (tariffType === 'pvpc' && country === 'ES') {
        progressBar.style.width = '15%';
        progressMessage.textContent = translations.fetchingPrices || 'Obteniendo precios de electricidad...';
        
        // Use subdomain for API in production, relative path in local
        var isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        var pricesUrl = isLocal 
          ? '/api/pvpc-prices?country=ES'
          : 'https://api.ganavatios.com/api/pvpc-prices?country=ES';
        
        console.log(isLocal ? 'Modo LOCAL: obteniendo precios PVPC' : 'Modo PRODUCCIÓN: obteniendo precios PVPC');
        console.log('Fetching PVPC prices from:', pricesUrl);
        
        fetch(pricesUrl)
          .then(function(response) {
            if (!response.ok) {
              console.warn('PVPC API error, using fallback price');
              return { averagePrice: 0.15, source: 'fallback' };
            }
            return response.json();
          })
          .then(function(priceData) {
            console.log('PVPC price data:', priceData);
            var pricePerKWh = priceData.averagePrice || 0.15;
            var priceSource = priceData.source || 'unknown';
            
            progressBar.style.width = '30%';
            progressMessage.textContent = translations.calculating || 'Consultando datos de radiación solar...';
            
            calculateWithPrice(pricePerKWh, priceSource);
          })
          .catch(function(err) {
            console.error('Error fetching PVPC prices:', err);
            progressMessage.textContent = translations.errorFetchingPrices || 'No se pudieron obtener precios PVPC. Usando precio estimado.';
            setTimeout(function() {
              progressBar.style.width = '30%';
              progressMessage.textContent = translations.calculating || 'Consultando datos de radiación solar...';
              calculateWithPrice(0.15, 'fallback');
            }, 1000);
          });
      } else {
        var pricePerKWh = tariffType === 'fixed' ? priceFixed : 0.15;
        progressBar.style.width = '30%';
        calculateWithPrice(pricePerKWh, 'fixed');
      }
    }
    
    function calculateWithPrice(pricePerKWh, priceSource) {
      setTimeout(function() { 
        progressBar.style.width = '60%';
        progressMessage.textContent = translations.processingData || 'Procesando datos de PVGIS...';
      }, 500);

      var apiParams = 'lat=' + lat +
        '&lon=' + lng +
        '&peakpower=' + panelPower +
        '&loss=' + systemLoss +
        '&angle=' + tilt +
        '&aspect=' + azimuth;
      
      // Use subdomain for API in production, relative path in local
      var isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      var url = isLocal 
        ? '/api/pvgis?' + apiParams
        : 'https://api.ganavatios.com/api/pvgis?' + apiParams;
      
      console.log(isLocal ? 'Modo LOCAL: usando proxy Python' : 'Modo PRODUCCIÓN: usando API Vercel');
      console.log('URL de la petición:', url);

      fetch(url)
      .then(function(response) {
        console.log('Estado de respuesta:', response.status, response.statusText);
        
        if (isLocal && response.status === 404) {
          throw new Error('⚠️ El servidor local no está corriendo o no tiene el proxy configurado.\n\n' +
            'Por favor, inicia el servidor con:\n' +
            '• PowerShell: .\\scripts\\start-server.ps1\n' +
            '• CMD: .\\scripts\\start-server.bat\n' +
            '• Manual: cd scripts && python server.py');
        }
        
        if (!response.ok) {
          throw new Error('Error HTTP: ' + response.status + ' - ' + response.statusText);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('La respuesta no es JSON. Tipo de contenido: ' + contentType + 
            '\n\nEsto indica que el servidor no está corriendo correctamente.');
        }
        
        return response.json();
      })
      .then(function(data) {
        console.log('Respuesta completa de PVGIS:', JSON.stringify(data, null, 2));
        
        progressBar.style.width = '90%';
        progressMessage.textContent = translations.calculatingSavings || 'Calculando ahorro económico...';
        
        if (!data.outputs) {
          throw new Error((translations.errorInvalidData || 'La API no devolvió datos válidos. Estructura:') + ' ' + JSON.stringify(Object.keys(data)));
        }

        var totals = null;
        
        if (data.outputs.totals) {
          if (data.outputs.totals.fixed) {
            totals = data.outputs.totals.fixed;
          } else if (data.outputs.totals) {
            totals = data.outputs.totals;
          }
        }
        
        if (!totals) {
          console.error('Estructura de outputs:', data.outputs);
          throw new Error(translations.errorNoData || 'No se encontraron datos de totales en la respuesta');
        }

        console.log('Totales extraídos:', totals);

        var annualProductionKWh = totals.E_y || totals['E_y'] || 0;
        var avgDailyProduction = totals.E_d || totals['E_d'] || 0;
        var avgMonthlyProduction = totals.E_m || totals['E_m'] || 0;
        var solarIrradiance = totals.H_sun_f || totals['H(i)_y'] || totals.H_i_y || 0;
        
        if (annualProductionKWh === 0) {
          throw new Error(translations.errorZeroProduction || 'La producción anual es 0. Revisa los parámetros o la ubicación');
        }
        
        var annualSavings = annualProductionKWh * pricePerKWh;
        var monthlySavings = annualSavings / 12;

        progressBar.style.width = '100%';
        progressMessage.textContent = translations.completed || '¡Completado!';
        
        setTimeout(function() {
          progressContainer.classList.remove('active');
        }, 500);

        var pvgisUrl = currentLang === 'es' 
          ? 'https://re.jrc.ec.europa.eu/pvg_tools/es/#DR'
          : 'https://re.jrc.ec.europa.eu/pvg_tools/en/#DR';

        resultsDiv.innerHTML = 
          '<h3>' + (translations.resultsTitle || '📊 Resultados del Análisis Solar') + '</h3>' +
          '<div class="result-item">' +
          '<strong>' + (translations.resultLocation || '📍 Ubicación:') + '</strong> ' + lat.toFixed(4) + '°, ' + lng.toFixed(4) + '°' +
          '</div>' +
          '<div class="result-item">' +
          '<strong>' + (translations.resultInstalledPower || '⚡ Potencia instalada:') + '</strong> ' + panelPowerWp + ' Wp (' + panelPower.toFixed(2) + ' kWp)' +
          '</div>' +
          (solarIrradiance > 0 ? 
            '<div class="result-item">' +
            '<strong>' + (translations.resultSolarRadiation || '☀️ Radiación solar anual:') + '</strong> ' + solarIrradiance.toFixed(0) + ' kWh/m²' +
            '</div>' : '') +
          '<div class="result-item">' +
          '<strong>' + (translations.resultAnnualProduction || '🔋 Producción anual:') + '</strong> ' + annualProductionKWh.toFixed(2) + ' kWh/' + (translations.year || 'año') +
          '</div>' +
          (avgDailyProduction > 0 || avgMonthlyProduction > 0 ?
            '<div class="result-item">' +
            '<strong>' + (translations.resultAverageProduction || '📅 Producción promedio:') + '</strong><br>' +
            (avgDailyProduction > 0 ? '• ' + (translations.resultDaily || 'Diaria:') + ' ' + avgDailyProduction.toFixed(2) + ' kWh/' + (translations.day || 'día') + '<br>' : '') +
            (avgMonthlyProduction > 0 ? '• ' + (translations.resultMonthly || 'Mensual:') + ' ' + avgMonthlyProduction.toFixed(2) + ' kWh/' + (translations.month || 'mes') : '') +
            '</div>' : '') +
          '<div class="result-item" style="background:#e6ffe6; border-left-color:#28a745;">' +
          '<strong>' + (translations.resultEstimatedSavings || '💰 Ahorro económico estimado:') + '</strong><br>' +
          '• ' + (translations.resultAnnualLabel || 'Anual:') + ' <strong>' + annualSavings.toFixed(2) + ' €/' + (translations.year || 'año') + '</strong><br>' +
          '• ' + (translations.resultMonthlyLabel || 'Mensual:') + ' <strong>' + monthlySavings.toFixed(2) + ' €/' + (translations.month || 'mes') + '</strong><br>' +
          '<small>(' + (translations.resultPriceLabel || 'Precio:') + ' ' + pricePerKWh.toFixed(3) + ' €/kWh' +
          (priceSource === 'historical-average' ? ' - PVPC ' + (translations.pvpcDataSource || 'promedio trimestral') : '') +
          (priceSource === 'fallback' ? ' - ' + (translations.errorFetchingPrices || 'estimado') : '') +
          (priceSource === 'fixed' ? '' : '') +
          ')</small>' +
          '</div>' +
          '<div class="result-item" style="background:#fff9e6; border-left-color:#ffc107;">' +
          '<strong>🔗 ' + (translations.pvgisLink || 'Ver en PVGIS:') + '</strong><br>' +
          '<a href="' + pvgisUrl + '" target="_blank" rel="noopener noreferrer" style="color:#007bff; text-decoration:none;">' +
          '📊 ' + (translations.viewCaseStudy || 'Ver caso de estudio completo') + ' ↗' +
          '</a><br>' +
          '<small style="color:#666;">' + (translations.pvgisLinkDesc || 'Consulta los datos detallados, gráficos mensuales y más información en PVGIS') + '</small>' +
          '</div>' +
          '<div class="result-item">' +
          '<small>' + (translations.resultDataSource || '📌 Datos proporcionados por PVGIS © European Communities, 2001-2024') + '</small>' +
          '</div>';
      })
      .catch(function(err) {
        console.error('Error completo:', err);
        
        progressContainer.classList.remove('active');
        
        var errorMessage = err.message;
        var isServerError = errorMessage.includes('servidor local') || 
                           errorMessage.includes('no está corriendo');
        
        var tips = '';
        if (isServerError) {
          tips = 
            '<small>📝 <strong>Cómo iniciar el servidor:</strong></small><br>' +
            '<small>1. <strong>PowerShell:</strong> <code>.\\scripts\\start-server.ps1</code></small><br>' +
            '<small>2. <strong>CMD:</strong> <code>.\\scripts\\start-server.bat</code></small><br>' +
            '<small>3. <strong>Manual:</strong> <code>cd scripts && python server.py</code></small>';
        } else if (!isLocal && (errorMessage.includes('JSON') || errorMessage.includes('HTTP'))) {
          tips =
            '<small>⚠️ <strong>Error en producción:</strong></small><br>' +
            '<small>• Verifica que las funciones serverless estén desplegadas en Vercel</small><br>' +
            '<small>• Comprueba los logs en el Dashboard de Vercel</small><br>' +
            '<small>• Las APIs deben estar en la carpeta <code>/api/</code> del proyecto</small>';
        } else {
          tips =
            '<small>💡 <strong>Consejos:</strong></small><br>' +
            '<small>• Verifica tu conexión a internet</small><br>' +
            '<small>• Asegúrate de haber seleccionado una ubicación válida en el mapa</small><br>' +
            '<small>• Si estás en local, verifica que el servidor esté corriendo</small><br>' +
            '<small>• Revisa la consola del navegador (F12) para más detalles</small>';
        }
        
        resultsDiv.innerHTML = 
          '<div class="result-item error">' +
          '<strong>❌ Error al calcular:</strong><br>' +
          '<pre style="white-space: pre-wrap; font-family: monospace; background: #f5f5f5; padding: 10px; border-radius: 3px; margin: 10px 0;">' +
          errorMessage +
          '</pre>' +
          tips +
          '</div>';
      });
    }
    
    fetchPriceAndCalculate();
  });

  // Share buttons functionality
  const pageUrl = window.location.href;
  const pageTitle = document.title;

  // Facebook share
  const shareFacebookBtn = document.getElementById('shareFacebook');
  if (shareFacebookBtn) {
    shareFacebookBtn.addEventListener('click', function() {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });
  }

  // Twitter/X share
  const shareTwitterBtn = document.getElementById('shareTwitter');
  if (shareTwitterBtn) {
    shareTwitterBtn.addEventListener('click', function() {
      const text = translations.shareMessage || 'Calculate your solar savings: ';
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}`;
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });
  }

  // WhatsApp share
  const shareWhatsappBtn = document.getElementById('shareWhatsapp');
  if (shareWhatsappBtn) {
    shareWhatsappBtn.addEventListener('click', function() {
      const text = translations.shareMessage || 'Calculate your solar savings: ';
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + pageUrl)}`;
      window.open(shareUrl, '_blank');
    });
  }

  // LinkedIn share
  const shareLinkedinBtn = document.getElementById('shareLinkedin');
  if (shareLinkedinBtn) {
    shareLinkedinBtn.addEventListener('click', function() {
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });
  }

  // Copy link
  const shareCopyBtn = document.getElementById('shareCopy');
  if (shareCopyBtn) {
    shareCopyBtn.addEventListener('click', function() {
      const copyIconEl = document.getElementById('copyIcon');
      
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pageUrl).then(function() {
          // Success feedback
          shareCopyBtn.classList.add('copied');
          if (copyIconEl) {
            const originalIcon = copyIconEl.textContent;
            copyIconEl.textContent = '✓';
            setTimeout(function() {
              shareCopyBtn.classList.remove('copied');
              copyIconEl.textContent = originalIcon;
            }, 2000);
          }
        }).catch(function(err) {
          console.error('Failed to copy:', err);
          fallbackCopy();
        });
      } else {
        fallbackCopy();
      }
      
      // Fallback copy method
      function fallbackCopy() {
        const textArea = document.createElement('textarea');
        textArea.value = pageUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          shareCopyBtn.classList.add('copied');
          if (copyIconEl) {
            const originalIcon = copyIconEl.textContent;
            copyIconEl.textContent = '✓';
            setTimeout(function() {
              shareCopyBtn.classList.remove('copied');
              copyIconEl.textContent = originalIcon;
            }, 2000);
          }
        } catch (err) {
          console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
      }
    });
  }
})();
