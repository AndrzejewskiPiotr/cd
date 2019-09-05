type ResponseData = {
  width: number;
  height: number;
  tiles: { width: number; height: number }[];
  sizes: { length: number };
};

async function fetchHandler(resource: string) {
  return fetch(resource, {
    headers : {
      'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }
      return res.json();
    })
    .then(response => {
      const {
        width,
        height,
        tiles: [{ width: tileWidth, height: tileHeight }],
        sizes: { length: depth }
      }: ResponseData = response;
      return [width, height, tileWidth, tileHeight, depth];
    });
}

async function fetchImageData(resource: string) {
  return await fetchHandler(resource);
}

export default fetchImageData;
