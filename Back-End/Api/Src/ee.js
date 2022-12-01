// import {Cordenadas} from './routes/index.js'
const ee = require('@google/earthengine');
var privateKey = require('./privateKey.json');
const np = require('numjs');

var runAnalysis = function() {
    ee.initialize(null, null, function() {
        let countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
        let roi = countries.filter(ee.Filter.eq("country_na", "Argentina"));
  
        let landsat = ee.ImageCollection("LANDSAT/LC08/C01/T1")
        .filterDate('2021-01-01', '2022-11-11')
        .filterBounds(roi)
        .filter(ee.Filter.eq('CLOUD_COVER', 0));
        let clip = ee.Image(landsat.first());
        let ndmi = clip.normalizedDifference(['B5', 'B6']);        
        var url = ndmi.visualize({min:-1,max:1,palette:['#FFFFFF','#9FA3F3','#5157CB','#1500FF']}).getThumbURL({dimensions:'1024x1024',format:'jpg'});
        console.log(url);
        
      }, function(e) {
          console.error('Initialization error: ' + e);
        });
  };
  
// Authenticate using a service account.
ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function(e) {
console.error('Authentication error: ' + e);
});