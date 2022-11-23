// import { console } from "browserify/lib/builtins";

//Mapa
var map = L.map('map',{drawControl: false}).setView([-34,-60],8);

var gee = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
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
localStorage.getItem("coords")
map.on('draw:created', function (e) {
  var type = e.layerType,
  layer = e.layer;
  
  if (type === 'rectangle'){
    let coords = (layer.getLatLngs()); //variable de las coordenadas
    console.log(coords);
    localStorage.setItem("coords", coords)
  };
  
  drawnItems.addLayer(layer);
});

var baseMaps = {
  "Google Earth": gee
};

var layerControl = L.control.layers(baseMaps).addTo(map);

//Apreta el boton
 //error fetch
//   const response = fetch("http://localhost:3001/getSateliteImages", {
//     credentials: "include",
//     headers: {
//       "Content-type": "application/json;charset=UTF-8",
//       "Access-Control-Allow-Credentials": true
//     },
//   }).then(res => res.json())
//   .catch(err => console.log(err))
//   response.json()
//    let coords = localStorage.getItem("coords")
//    let clip_ = response.ee.Image(response.landsat.mean()).clip(coords);

//    let ndmi = clip_.normalizedDifference(['B5', 'B6']);

//    let palette = ['#FFFFFF','#9FA3F3','#5157CB','#1500FF'];

//   let ndmi_parameters = {'min': -1,
//     'max': 1,
//     'palette': palette,
//     'region': coords};

//    L.tileLayer(ndmi, ndmi_parameters, 'NombreCultivoInput').addTo(map);

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