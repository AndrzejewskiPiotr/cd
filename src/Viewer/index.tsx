import React  from 'react';

import { usePromise } from "../hook";
import fetchImageData from "../api/api";
import './styles.css'

function SlideWorkBench({ url }: { url:string }) {
    const [data, isError] = usePromise(fetchImageData(`${url}/info.json`), []);

    const isDataReceived = data.length > 0;


    return (
        <React.Fragment>
            { isError && !isDataReceived ?
                null :
                   <div>
                     dsd, {console.log(data,isError)}
                   </div>
            }
        </React.Fragment>
    )
};

export default SlideWorkBench

