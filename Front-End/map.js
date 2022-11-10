var map = L.map('map',{drawControl: false}).setView([-34,-60],8);

L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);
var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
      draw: {
           polygon: false,
           marker: false,
           circle:false,
       },
         edit: {
             featureGroup: drawnItems,
             edit:false
         }
     });
     map.addControl(drawControl);

     map.on('draw:created', function (e) {
      var type = e.layerType,
          layer = e.layer;
  
      if (type === 'rectangle') {
          layer.on('click', function() {
               let coords = (layer.getLatLngs());
               console.log(coords);
          });
      }
  
      drawnItems.addLayer(layer);
  });


// Require client library and private key.
var ee = require('@google/earthengine');
var privateKey = require('./.private-key.json');

// Initialize client library and run analysis.
var runAnalysis = function() {
  ee.initialize(null, null, function() {
    // ... run analysis ...
  }, function(e) {
    console.error('Initialization error: ' + e);
  });
};

// Authenticate using a service account.
ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function(e) {
  console.error('Authentication error: ' + e);
});

let countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
let roi = countries.filter(ee.Filter.eq("country_na", "Argentina"));
let fecha_actual = date.today();

let landsat = ee.ImageCollection("LANDSAT/LC08/C01/T1")
  .filterDate('2021-01-01', str(fecha_actual))
  .filterBounds(roi)
  .filter(ee.Filter.eq('CLOUD_COVER', 0));

let composite = ee.Algorithms.Landsat.simpleComposite({
    'collection': landsat,
    'asFloat': True
    });

let clip_ = ee.Image(landsat.mean()).clip(coords);

let ndmi = clip_.normalizedDifference(['B5', 'B6']);

let palette = ['#FFFFFF','#9FA3F3','#5157CB','#1500FF'];

let ndmi_parameters = {'min': -1,
                   'max': 1,
                   'palette': palette,
                   'region': mask};
let vis_params = {
    'min': 0,
    'max': 1,
    'palette': palette
    };

L.addLayer(ndmi,ndmi_parameters, campo);