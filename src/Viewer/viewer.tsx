import * as L from 'leaflet';
import IIIF from '../utility/iiif';
import 'leaflet-easybutton'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw'
import 'leaflet-ellipse'
import 'leaflet-draw-elipse/Leaflet.draw-ellipse'


function ImageViewer(data: number[], url: string, handle: any): void {
  const [width, height, tileWidth, tileHeight, depth] = data;
  const mp = L.map('map-container', {
    crs: L.CRS.Simple,
  });
  IIIF(mp, `${url}`, width, height, tileWidth, tileHeight, depth);
  mp.setMaxBounds(
    L.latLngBounds([[height * 0.1, -width * 0.1], [-height * 1.1, width * 1.1]])
  );
  mp.setView([-height / 2, width / 2], -7);

  mp.addControl(L.control.fullscreen());
  const featureGroup = L.featureGroup().addTo(mp);
  // @ts-ignore
  const drawControl = new L.Control.Draw({
    draw: {
      polygon: true,
      marker: false,
      polyline: false,
      circlemarker: false,
      circle: true,
      rectangle: false,
    },
    edit: {
      featureGroup: featureGroup,
      edit: true
    },
  }).addTo(mp);

  //@ts-ignore
  L.easyButton('fa-globe', function(btn, map){
    console.log('sd')
    handle()
  }).addTo( mp );

}

export default ImageViewer;
