// import { console } from "browserify/lib/builtins";

//Mapa
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
    polyline:false,
  },
  edit: {
    featureGroup: drawnItems,
    edit:false
  }
});


map.addControl(drawControl);
export let coords;
localStorage.getItem("coords")
map.on('draw:created', function (e) {
  var type = e.layerType,
  layer = e.layer;
  
  if (type === 'rectangle'){
    coords = (layer.getLatLngs()); //variable de las coordenadas
    console.log(coords);
    localStorage.setItem("coords", coords)
  };
  
  drawnItems.addLayer(layer);
});


//     fetch("http://localhost:3001/registro-plantas", {
  //     credentials: "include",
  //     headers: {
    //       "Content-type": "application/json;charset=UTF-8",
//       "Access-Control-Allow-Credentials": true
//     },
//     body:{
  
//     },
//     method: "POST"
// }).then(res => res.json())
// .catch(err => console.log(err))
// // Require client library and private key.
// // unpkg.com/:package@:version/:file
// const ee = require('@google/earthengine');
// // const np = require('numpy');
// // const plt = require('matplotlib');
// const DateTime = require('datetime-js');
// const privateKey = require('@google/earthengine/package.json');

// // Initialize client library and run analysis.
// var runAnalysis = function() {
//   ee.initialize(null, null, function() {
//     // ... run analysis ...
//   }, function(e) {
//     console.error('Initialization error: ' + e);
//   });
// };

// // Authenticate using a service account.
// ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function(e) {
//   console.error('Authentication error: ' + e);
// });

// //Colección de Earth Engine
// let countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
// let roi = countries.filter(ee.Filter.eq("country_na", "Argentina"));
// let fecha_actual = DateTime.today();

// let landsat = ee.ImageCollection("LANDSAT/LC08/C01/T1")
//   .filterDate('2021-01-01', str(fecha_actual))
//   .filterBounds(roi)
//   .filter(ee.Filter.eq('CLOUD_COVER', 0));

// let composite = ee.Algorithms.Landsat.simpleComposite({
//     'collection': landsat,
//     'asFloat': True
//     });

// // ---------------------------Cuando apreta el botón con los campos llenos y las coords----------------------------------------------------------------------//

//     //Clip image(cuando da al boton)
// let clip_ = ee.Image(landsat.mean()).clip(coords);

// let ndmi = clip_.normalizedDifference(['B5', 'B6']);

// let palette = ['#FFFFFF','#9FA3F3','#5157CB','#1500FF'];

// let ndmi_parameters = {'min': -1,
//                    'max': 1,
//                    'palette': palette,
//                    'region': coords};
// let vis_params = {
//     'min': 0,
//     'max': 1,
//     'palette': palette
//     };

// L.addLayer(ndmi,ndmi_parameters, //variable del nombre del campo)
// );

// let latlon = ee.Image.pixelLonLat().addBands(ndmi);
// let latlon_new = latlon.reduceRegion(
//   reducer=ee.Reducer.toList(),
//   geometry=mask,
//   maxPixels=1e13,
//   scale=30);

// let data = np.array((ee.Array(latlon_new.get('nd')).getInfo()))
// let lats = np.array((ee.Array(latlon_new.get('latitude')).getInfo()))
// let lons = np.array((ee.Array(latlon_new.get('longitude')).getInfo()))

// let uniqueLats = np.unique(lats)
// let uniqueLons = np.unique(lons)
// let ncols = len(uniqueLons)    
// let nrows = len(uniqueLats)


// let ys = uniqueLats[1] - uniqueLats[0] 
// let xs = uniqueLons[1] - uniqueLons[0]

// let arr = np.zeros([nrows, ncols], np.float32)
// let counter =0
// for(y in range(0,len(arr),1)){
  //     for(x in range(0,len(arr[0]),1)){
//         if (lats[counter] == uniqueLats[y] && lons[counter] == uniqueLons[x] && counter < len(lats)-1){
//             counter+=1
//             arr[len(uniqueLats)-1-y,x] = data[counter]}}};

// let fig = plt.figure(figsize=(10,10))
// plt.imshow(arr, cmap = "gray_r")
// let ax = fig.add_subplot(1, 1, 1)
// let title = //nombre del campo pasado por variable
// ax.set_title(title)
// let cbar = plt.colorbar(label= "NDMI values", orientation = 'horizontal')
// cbar.set_ticks([])