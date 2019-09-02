type ResponseData = {
    width: number,
    height: number,
    tiles: { width: number, height: number }[],
    sizes: { length: number }
}

async function fetchImageData(resource : string) {
    return await fetchHandler(resource);
}

async function fetchHandler(resource: string) {
    return fetch(resource).then(res => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        console.log(res.json());
        return res.json();
    }).then( response => {
        const { width , height, tiles: [{ width: tileWidth, height: tileHeight  }], sizes: { length: depth } }: ResponseData  = response;
        return [ width, height, tileWidth, tileHeight, depth ];
    });
}

export default fetchImageData;
