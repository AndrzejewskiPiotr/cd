import * as L from 'leaflet';
import { BasicSlideLoader, StackSlideLoader } from './slideLoader';

const CanvasLayer = L.GridLayer.extend({
  //@ts-ignore
  createTile(coords, done) {
    const size = this.getTileSize();
    let url = null;
    const zoom = coords.z;
    let tileX = coords.x;
    let tileY = coords.y;
    const scale = 2 ** (zoom < 0 ? -zoom : 0);
    let fragment = [0, 0, size.x, size.y];
    if (zoom > 0) {
      const realTileX = Math.floor(tileX / 2 ** zoom);
      const realTileY = Math.floor(tileY / 2 ** zoom);
      fragment = [
        ((tileX - realTileX * 2 ** zoom) * size.x) / 2 ** zoom,
        ((tileY - realTileY * 2 ** zoom) * size.y) / 2 ** zoom,
        size.x / 2 ** zoom,
        size.y / 2 ** zoom
      ];
      tileX = realTileX;
      tileY = realTileY;
    }
    if (
      tileX === undefined ||
      tileY === undefined ||
      scale === undefined ||
      tileX < 0 ||
      Math.ceil(this.width / scale / this.tileWidth) <= tileX ||
      tileY < 0 ||
      Math.ceil(this.height / scale / this.tileHeight) <= tileY
    ) {
      url = '';
    }

    const regionX = tileX * this.tileWidth * scale;
    const regionY = tileY * this.tileHeight * scale;
    let regionW = this.tileWidth * scale;
    let regionH = this.tileHeight * scale;
    let sizeW = this.tileWidth;
    let sizeH = this.tileHeight;
    if (regionX + regionW > this.width) {
      regionW = this.width - regionX;
    }
    if (regionY + regionH > this.height) {
      regionH = this.height - regionY;
    }
    if (regionX + this.tileWidth * scale > this.width) {
      sizeW = Math.floor((this.width - regionX + scale - 1) / scale);
    }
    if (regionY + this.tileHeight * scale > this.height) {
      sizeH = Math.floor((this.height - regionY + scale - 1) / scale);
    }

    const regionParam = `${regionX},${regionY},${regionW},${regionH}`;
    const sizeParam = `${sizeW},${sizeH}`;
    //@ts-ignore
    let tile;
    let isCanvas = false;
    if (size.x === sizeW && size.y === sizeH && zoom <= 0) {
      tile = L.DomUtil.create('img', 'leaflet-tile');
      //@ts-ignore
      tile.width = size.x;
      //@ts-ignore
      tile.height = size.y;
      isCanvas = false;
    } else {
      tile = L.DomUtil.create('canvas', 'leaflet-tile');
      //@ts-ignore
      tile.width = size.x;
      //@ts-ignore
      tile.height = size.y;
      isCanvas = true;
    }

    if (url === null)
      url = `${this.url}/${regionParam}/${sizeParam}/0/default.jpg`;
    //@ts-ignore
    this.loader.getSlide(
      url,
      (
        error: string | undefined,
        img: HTMLCanvasElement | HTMLImageElement | null
      ) => {
        if (!error) {
          if (isCanvas) {
            //@ts-ignore
            const ctx = tile.getContext('2d');
            ctx.globalAlpha = 1;
            ctx.drawImage(img, ...fragment, 0, 0, size.x, size.y);
          } else {
            //@ts-ignore
            tile.src = img.src;
          }
        }
        //@ts-ignore
        done(error, tile);
      },
      zoom,
      tileX,
      tileY
    );
    return tile;
  }
});

//@ts-ignore
function IIIF(map, url, width, height, tileWidth, tileHeight, depth) {
  //@ts-ignore
  const result = new CanvasLayer({
    //@ts-ignore
    tileSize: new L.point(tileWidth, tileHeight),
    updateWhenZooming: false,
    minZoom: -depth,
    maxZoom: 2
  });
  result.url = url;
  result.width = width;
  result.height = height;
  result.tileWidth = tileWidth;
  result.tileHeight = tileHeight;
  const base = new BasicSlideLoader();
  result.loader = new StackSlideLoader(base, 8);
  result.addTo(map);
  map.setMaxZoom(2);
  map.setMinZoom(-depth);
  return result;
}

export default IIIF;
