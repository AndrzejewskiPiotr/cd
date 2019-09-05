import React__default, { useState, useEffect, useRef } from 'react';
import { GridLayer, DomUtil, point, map, CRS, latLngBounds, control } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';

var BasicSlideLoader = /** @class */ (function () {
    function BasicSlideLoader() {
        this.errorMessage = 'error';
    }
    BasicSlideLoader.prototype.getSlide = function (url, completion) {
        var _this = this;
        var image = document.createElement('img');
        image.src = url;
        image.onload = function () {
            completion(undefined, image);
        };
        image.onerror = function () {
            completion(_this.errorMessage, null);
        };
    };
    return BasicSlideLoader;
}());
var StackSlideLoader = /** @class */ (function () {
    function StackSlideLoader(loader, queryLimit) {
        this.stack = [];
        this.activeQueries = 0;
        this.loader = null;
        this.queryLimit = 1;
        this.loader = loader;
        this.queryLimit = queryLimit;
    }
    StackSlideLoader.prototype.startNextLoad = function () {
        var _this = this;
        if (this.loader === null)
            return;
        if (this.stack.length === 0)
            return;
        if (this.activeQueries >= this.queryLimit)
            return;
        this.activeQueries += 1;
        var _a = this.stack.pop(), z = _a.z, x = _a.x, y = _a.y, url = _a.url, completion = _a.completion;
        this.loader.getSlide(url, function (error, image) {
            completion(error, image);
            _this.activeQueries -= 1;
            _this.startNextLoad();
        }, z, x, y);
    };
    StackSlideLoader.prototype.getSlide = function (url, completion, z, x, y) {
        this.stack.push({ z: z, x: x, y: y, url: url, completion: completion });
        this.startNextLoad();
    };
    return StackSlideLoader;
}());

var CanvasLayer = GridLayer.extend({
    //@ts-ignore
    createTile: function (coords, done) {
        var size = this.getTileSize();
        var url = null;
        var zoom = coords.z;
        var tileX = coords.x;
        var tileY = coords.y;
        var scale = Math.pow(2, (zoom < 0 ? -zoom : 0));
        var fragment = [0, 0, size.x, size.y];
        if (zoom > 0) {
            var realTileX = Math.floor(tileX / Math.pow(2, zoom));
            var realTileY = Math.floor(tileY / Math.pow(2, zoom));
            fragment = [
                ((tileX - realTileX * Math.pow(2, zoom)) * size.x) / Math.pow(2, zoom),
                ((tileY - realTileY * Math.pow(2, zoom)) * size.y) / Math.pow(2, zoom),
                size.x / Math.pow(2, zoom),
                size.y / Math.pow(2, zoom)
            ];
            tileX = realTileX;
            tileY = realTileY;
        }
        if (tileX === undefined ||
            tileY === undefined ||
            scale === undefined ||
            tileX < 0 ||
            Math.ceil(this.width / scale / this.tileWidth) <= tileX ||
            tileY < 0 ||
            Math.ceil(this.height / scale / this.tileHeight) <= tileY) {
            url = '';
        }
        var regionX = tileX * this.tileWidth * scale;
        var regionY = tileY * this.tileHeight * scale;
        var regionW = this.tileWidth * scale;
        var regionH = this.tileHeight * scale;
        var sizeW = this.tileWidth;
        var sizeH = this.tileHeight;
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
        var regionParam = regionX + "," + regionY + "," + regionW + "," + regionH;
        var sizeParam = sizeW + "," + sizeH;
        //@ts-ignore
        var tile;
        var isCanvas = false;
        if (size.x === sizeW && size.y === sizeH && zoom <= 0) {
            tile = DomUtil.create('img', 'leaflet-tile');
            //@ts-ignore
            tile.width = size.x;
            //@ts-ignore
            tile.height = size.y;
            isCanvas = false;
        }
        else {
            tile = DomUtil.create('canvas', 'leaflet-tile');
            //@ts-ignore
            tile.width = size.x;
            //@ts-ignore
            tile.height = size.y;
            isCanvas = true;
        }
        if (url === null)
            url = this.url + "/" + regionParam + "/" + sizeParam + "/0/default.jpg";
        //@ts-ignore
        this.loader.getSlide(url, function (error, img) {
            if (!error) {
                if (isCanvas) {
                    //@ts-ignore
                    var ctx = tile.getContext('2d');
                    ctx.globalAlpha = 1;
                    ctx.drawImage.apply(ctx, [img].concat(fragment, [0, 0, size.x, size.y]));
                }
                else {
                    //@ts-ignore
                    tile.src = img.src;
                }
            }
            //@ts-ignore
            done(error, tile);
        }, zoom, tileX, tileY);
        return tile;
    }
});
//@ts-ignore
function IIIF(map, url, width, height, tileWidth, tileHeight, depth) {
    //@ts-ignore
    var result = new CanvasLayer({
        //@ts-ignore
        tileSize: new point(tileWidth, tileHeight),
        updateWhenZooming: false,
        minZoom: -depth,
        maxZoom: 2
    });
    result.url = url;
    result.width = width;
    result.height = height;
    result.tileWidth = tileWidth;
    result.tileHeight = tileHeight;
    var base = new BasicSlideLoader();
    result.loader = new StackSlideLoader(base, 8);
    result.addTo(map);
    map.setMaxZoom(2);
    map.setMinZoom(-depth);
    return result;
}

function ImageViewer(data, url) {
    var width = data[0], height = data[1], tileWidth = data[2], tileHeight = data[3], depth = data[4];
    var mp = map('map-container', {
        crs: CRS.Simple
    });
    IIIF(mp, "" + url, width, height, tileWidth, tileHeight, depth);
    mp.setMaxBounds(latLngBounds([[height * 0.1, -width * 0.1], [-height * 1.1, width * 1.1]]));
    mp.setView([-height / 2, width / 2], -7);
    mp.addControl(control.fullscreen());
}

function usePromise(promiseOrFunction, defaultValue) {
    var _a = useState({
        value: defaultValue,
        error: null,
        isPending: true
    }), state = _a[0], setState = _a[1];
    useEffect(function () {
        var promise = typeof promiseOrFunction === 'function'
            ? promiseOrFunction()
            : promiseOrFunction;
        var isSubscribed = true;
        promise
            .then(function (value) {
            return isSubscribed ? setState({ value: value, error: null, isPending: false }) : null;
        })
            .catch(function (error) {
            return isSubscribed
                ? setState({ value: defaultValue, error: error, isPending: false })
                : null;
        });
        return function () {
            isSubscribed = false;
        };
    }, []);
    var value = state.value, error = state.error, isPending = state.isPending;
    return [value, error, isPending];
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function fetchHandler(resource) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch(resource, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                    .then(function (res) {
                    if (res.status >= 400) {
                        throw new Error('Bad response from server');
                    }
                    console.log(res);
                    return res.json();
                })
                    .then(function (response) {
                    var width = response.width, height = response.height, _a = response.tiles[0], tileWidth = _a.width, tileHeight = _a.height, depth = response.sizes.length;
                    return [width, height, tileWidth, tileHeight, depth];
                })];
        });
    });
}
function fetchImageData(resource) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchHandler(resource)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "\n.styles_map-custom__ILNAK {\n  width: 100%;\n  height: 100%;\n}\n";
styleInject(css);

function SlideWorkBench(_a) {
    var id = _a.id, className = _a.className;
    var url = "/iiif/" + id;
    var container = useRef(null);
    var _b = usePromise(fetchImageData(url + "/info.json"), []), data = _b[0], isError = _b[1];
    var isDataReceived = data.length > 0;
    var isContainerMounted = container.current;
    if (isDataReceived && isContainerMounted) {
        ImageViewer(data, url);
    }
    return (React__default.createElement(React__default.Fragment, null, isError && !isDataReceived ? null : (React__default.createElement("div", { className: className, id: "map-container", ref: container }))));
}

/**
 * @class SlideWorkBench
 */

export default SlideWorkBench;
