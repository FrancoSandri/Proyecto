const ee = require('@google/earthengine');
const np = require('numpy');
const plt = require('matplotlib');
const DateTime = require('datetime-js');
const privateKey = require('@google/earthengine/package.json');

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

//Colección de Earth Engine
let countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
let roi = countries.filter(ee.Filter.eq("country_na", "Argentina"));
let fecha_actual = DateTime.today();

let landsat = ee.ImageCollection("LANDSAT/LC08/C01/T1")
  .filterDate('2021-01-01', str(fecha_actual))
  .filterBounds(roi)
  .filter(ee.Filter.eq('CLOUD_COVER', 0));

let composite = ee.Algorithms.Landsat.simpleComposite({
    'collection': landsat,
    'asFloat': True
    });