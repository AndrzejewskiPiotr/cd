import * as L from 'leaflet';

const CanvasLayer  = L.GridLayer.extend({
  //@ts-ignore
    createTile(coords, done){
        const tile = <HTMLCanvasElement>L.DomUtil.create('canvas', 'leaflet-tile');
        const size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;
        const ctx = tile.getContext('2d');
        let url = null;
        const zoom = coords.z;
        let tileX = coords.x;
        let tileY = coords.y;
        const scale = 2 ** (zoom < 0 ? -zoom : 0);
        let fragment = [0, 0, size.x, size.y];
        if(zoom > 0) {
            const realTileX = Math.floor(tileX / (2 ** zoom));
            const realTileY = Math.floor(tileY / (2 ** zoom));
            fragment = [
                (tileX - realTileX * (2 ** zoom)) * size.x / (2 ** zoom),
                (tileY - realTileY * (2 ** zoom)) * size.y / (2 ** zoom),
                size.x / (2 ** zoom),
                size.y / (2 ** zoom)
            ];
            tileX = realTileX;
            tileY = realTileY;
        }
        if (tileX === undefined || tileY === undefined || scale === undefined ||
            tileX < 0 || Math.ceil(this.width / scale / this.tileWidth) <= tileX ||
            tileY < 0 || Math.ceil(this.height / scale / this.tileHeight) <= tileY) {
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

        if(url === null) url = `${this.url}/${regionParam}/${sizeParam}/0/default.jpg`;
        const img = document.createElement("img");
        img.src = url;
        img.onload = () => {
              //@ts-ignore
              ctx.globalAlpha = 1;
               //@ts-ignore
              ctx.drawImage(img,fragment[0],fragment[1], fragment[2], fragment[3], 0, 0, size.x, size.y);
              done(/* error */undefined, tile);

        }
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
        maxZoom: 2,
    });
    result.url = url;
    result.width = width;
    result.height = height;
    result.tileWidth = tileWidth;
    result.tileHeight = tileHeight;
    result.addTo(map);
    map.setMaxZoom(2);
    map.setMinZoom(-depth);
    return result;
}

export default IIIF;
