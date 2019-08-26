import * as L from 'leaflet';
import IIIF from '../utility/iiif'


function ImageViewer( data: number[], url: string ): void {
    const [width, height, tileWidth, tileHeight, depth] = data;
    const mp = L.map('map-container', {
        crs: L.CRS.Simple,
    });
    IIIF(mp, `${url}`, width, height, tileWidth, tileHeight, depth);
    mp.setMaxBounds(L.latLngBounds([[height * 0.1, -width * 0.1], [-height * 1.1, width * 1.1]]));
    mp.setView([-height / 2, width / 2], -7);
}

export default ImageViewer;
