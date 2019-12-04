import * as L from 'leaflet';
import IIIF from '../utility/iiif';

function ImageViewer(data: number[], url: string): void {
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

  L.control
    .zoom({
      position: 'topright'
    })
    .addTo(mp);
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
