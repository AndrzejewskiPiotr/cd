import React, { useRef } from 'react';

import ImageViewer from './viewer';
import { usePromise } from "../hook";
import fetchImageData from "../api/api";


function SlideWorkBench({ url }: { url:string }) {
    const container = useRef<HTMLInputElement>(null);
    const [data, isError] = usePromise(fetchImageData(`${url}/info.json`), []);

    const isDataReceived = data.length > 0;
    const { current: isContainerMounted } = container;

    if( isDataReceived && isContainerMounted ) {
        ImageViewer(data,url)
    }

    return (
        <React.Fragment>
            { isError && !isDataReceived ?
                null :
                    <div id='map-container' ref={container}/>
            }
        </React.Fragment>
    )
};

export default SlideWorkBench

