import {Cordenadas} from './routes/index.js'
const ee = require('@google/earthengine');
var privateKey = require('./privateKey.json');

var runAnalysis = function() {
    ee.initialize(null, null, function() {
        let countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
        let roi = countries.filter(ee.Filter.eq("country_na", "Argentina"));
  
        let landsat = ee.ImageCollection("LANDSAT/LC08/C01/T1")
        .filterDate('2021-01-01', '2022-11-11')
        .filterBounds(roi)
        .filter(ee.Filter.eq('CLOUD_COVER', 0));
        let coordenas = Cordenadas;
        let clip = ee.Image(landsat.first().clip(coordenas));
        let ndmi = clip.normalizedDifference(['B5', 'B6']);
        var url = ndmi.visualize({gamma:1.5}).getThumbURL({dimensions:'1024x1024',format:'jpg'});
        console.log(url);
        // let palette = ['#FFFFFF','#9FA3F3','#5157CB','#1500FF'];

        // let ndmi_parameters = {'min': -1,
        //     'max': 1,
        //     'palette': palette,
        //     'region': coords};
        
      }, function(e) {
          console.error('Initialization error: ' + e);
        });
  };
  
// Authenticate using a service account.
ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function(e) {
console.error('Authentication error: ' + e);
});

// const button = document.getElementById("button-2");
// console.log('hola');
// button.addEventListener("click", event => {
// let clip = ee.Image(landsat.mean()).clip(coords);

// let ndmi = clip.normalizedDifference(['B5', 'B6'])

// let palette = ['#FFFFFF','#9FA3F3','#5157CB','#1500FF'];

// let ndmi_parameters = {'min': -1,
//     'max': 1,
//     'palette': palette,
//     'region': coords};
// event.preventDefault();
// console.log("click");
// });
    