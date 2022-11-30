const ee = require('@google/earthengine');
const DateTime = require('datetime-js');
var privateKey = 'b30f3ebc6bbf6a319f326c6a95f48a1905b4c692';

var runAnalysis = function() {
    ee.initialize(null, null, function() {
        let countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
        let roi = countries.filter(ee.Filter.eq("country_na", "Argentina"));
        let fecha_actual = DateTime.today();
  
        let landsat = ee.Image(new ee.ImageCollection("LANDSAT/LC08/C01/T1")
        .filterDate('2021-01-01', str(fecha_actual))
        .filterBounds(roi)
        .filter(ee.Filter.eq('CLOUD_COVER', 0))
        .first());

        // let clip = ee.Image(landsat.mean()).clip(coords);

        // let ndmi = clip.normalizedDifference(['B5', 'B6'])

        // let palette = ['#FFFFFF','#9FA3F3','#5157CB','#1500FF'];

        // let ndmi_parameters = {'min': -1,
        //     'max': 1,
        //     'palette': palette,
        //     'region': coords};
        
        var url = landsat.visualize({bands:['B5','B6'], gamma:1.5}).getThumbURL({dimensions:'1024x1024',format:'jpg'});
        console.log(url)
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
    