import * as L from 'leaflet';
import 'leaflet-iiif';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
import 'leaflet-easybutton';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

export function CreateMap(url: string): void {
    const container = L.DomUtil.get('map-container') as HTMLElement | any;
    if (container != null) {
        container._leaflet_id = null;
    }
    const map = L.map('map-container', {
        crs: L.CRS.Simple,
        zoomControl: false,
        zoom: 0,
        center: [0, 0]
    });

    const zoomControl = (L.control as any).zoom({ position: 'topright' });
    const fullScreenControl = (L.control as any).fullscreen({
        position: 'topright',
        title: 'Show me the fullscreen !',
        titleCancel: 'Exit fullscreen mode',
        content: null,
        forcePseudoFullscreen: false
    });
    const tileLayer = (L.tileLayer as any).iiif(url);

    zoomControl.addTo(map);
    fullScreenControl.addTo(map);
    tileLayer.addTo(map);
}


