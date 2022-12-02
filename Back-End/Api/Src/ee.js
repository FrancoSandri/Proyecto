const ee = require('@google/earthengine');
const np = require('numjs')
var privateKey = require('./privateKey.json');

var runAnalysis = function() {
    ee.initialize(null, null, function() {
      let countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
      let roi = countries.filter(ee.Filter.eq("country_na", "Argentina")); 
      let landsat = ee.ImageCollection("LANDSAT/LC08/C01/T1")
      .filterDate('2021-01-01', '2022-11-11')
      .filterBounds(roi)
      .filter(ee.Filter.eq('CLOUD_COVER', 0));
      let clip = ee.Image(landsat.first());
      let mask = ee.Image(landsat.first().geometry());
      let ndmi = clip.normalizedDifference(['B5', 'B6']);        
      var url = ndmi.visualize({min:-1,max:1,palette:['#FFFFFF','#9FA3F3','#5157CB','#1500FF']}).getThumbURL({dimensions:'1024x1024',format:'jpg'});
      console.log(url)

      // let latlon = ee.Image.pixelLonLat().addBands(ndmi);
      // let latlon_new = latlon.reduceRegion({reducer: ee.Reducer.toList(),
      //   geometry:mask,
      //   maxPixels: 1e13,
      //   scale:30
      // });

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
      // for(var y = 0; y <= len(arr); y++){
      //       for(var x = 0; x <=len(arr[0]); x++){
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
            }, function(e) {
                console.error('Initialization error: ' + e);
              });
        };
  
// Authenticate using a service account.
var url1 = ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function(e) {
console.error('Authentication error: ' + e);
});
if(url1 != null){
  console.log(url1)
}