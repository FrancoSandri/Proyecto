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
               coords = (layer.getLatLngs());
               alert(coords);
          });
      }
  
      drawnItems.addLayer(layer);
  });

  