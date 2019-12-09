import * as L from 'leaflet';
import IIIF from '../utility/iiif';
import 'leaflet-easybutton'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'


function ImageViewer(data: number[], url: string): void {
  const [width, height, tileWidth, tileHeight, depth] = data;

  const container: any = L.DomUtil.get('map-container');
  if(container != null){
    container._leaflet_id = null;
  }
  const mp = L.map('map-container', {
    crs: L.CRS.Simple,
    zoomControl:false,
  });
  L.control.zoom({
    position: 'topright'
  }).addTo(mp);

  IIIF(mp, `${url}`, width, height, tileWidth, tileHeight, depth);
  mp.setView([-height / 2, width / 2], -6);
  var editableLayers = new L.FeatureGroup();
  mp.addLayer(editableLayers);
  var options = {
    position: 'topleft',
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
          message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
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
    },
    edit: {
      featureGroup: editableLayers, //REQUIRED!!
      remove: false
    }
  };

  // @ts-ignore
  //var drawControl = new L.Control.Draw(options);
  //mp.addControl(drawControl);

  mp.on(L.Draw.Event.CREATED, function (e: any) {
    var type = e.layerType,
      layer = e.layer;

    if (type === 'marker') {
      layer.bindPopup('A popup!');
    }

    editableLayers.addLayer(layer);
  });
  /*
    mp.on("click", () => {
      console.log(editableLayers, editableLayers.toGeoJSON())
    })
    v
   */
// @ts-ignore
  mp.addControl(L.control.fullscreen({
    position: 'topright',
    title: 'Show me the fullscreen !',
    titleCancel: 'Exit fullscreen mode',
    content: null,
    forcePseudoFullscreen: false,
  }).addTo(mp));
}

export default ImageViewer;
