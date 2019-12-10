import * as L from 'leaflet';
import IIIF from '../utility/iiif';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
import 'leaflet-easybutton';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

function ImageViewer(data: number[], url: string): void {
  const editableLayers = new L.FeatureGroup();
  const [width, height, tileWidth, tileHeight, depth] = data;
  const container: any = L.DomUtil.get('map-container');
  if (container != null) {
    container._leaflet_id = null;
  }
  const mp = L.map('map-container', {
    crs: L.CRS.Simple,
    zoomControl: false
  });
  IIIF(mp, `${url}`, width, height, tileWidth, tileHeight, depth);
  mp.setMaxBounds(
    L.latLngBounds([
      [height * 0.1, -width * 0.1],
      [-height * 1.1, width * 1.1]
    ])
  );
  mp.setView([-height / 2, width / 2], -7);
  const options = {
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
  mp.addLayer(editableLayers);
  // @ts-ignore
  L.control.zoom({ position: 'topright' }).addTo(mp);
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
