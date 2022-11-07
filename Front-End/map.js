var map = L.map('map',{drawControl: true}).setView([-34,-60],8);

L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);
L.Control.geocoder().addTo(map);

// Initialise the FeatureGroup to store editable layers
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

// define custom marker
var MyCustomMarker = L.Icon.extend({
    options: {
      shadowUrl: null,
      iconAnchor: new L.Point(12, 12),
      iconSize: new L.Point(24, 24),
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Information_icon4_orange.svg'
    }
  });

var drawPluginOptions = {
    position: 'topright',
    draw: {
      polyline: {
        shapeOptions: {
          color: '#f357a1',
          weight: 10
        }
      },
      polygon: {
        allowIntersection: false, // Restricts shapes to simple polygons
        drawError: {
          color: '#e1e100', // Color the shape will turn when intersects
          message: '<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)' // Message that will show when intersect
        },
        shapeOptions: {
          color: '#bada55'
        }
      },
      circle: false, // Turns off this drawing tool
      rectangle: {
        shapeOptions: {
          clickable: false
        }
      },
      marker: {
        icon: new MyCustomMarker()
      }
    },
    edit: {
      featureGroup: editableLayers, //REQUIRED!!
      remove: false
    }
  };
  // Initialise the draw control and pass it the FeatureGroup of editable layers
  var drawControl = new L.Control.Draw(drawPluginOptions);
  map.addControl(drawControl);
  
  
  var editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);
  
  
  
  
  map.on('draw:created', function(e) {
    var type = e.layerType,
      layer = e.layer;
  
    if (type === 'marker') {
      layer.bindPopup('A popup!');
    }
  
    editableLayers.addLayer(layer);
  });