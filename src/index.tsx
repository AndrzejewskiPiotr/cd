import * as React from 'react';
import { usePromise } from 'hook/use-promise';
import fetchImageData from 'api/api';

export const Thing = () => {
  const url = 'https://stg.medrepo.apl.task.gda.pl/iiif/test_7fp_zstack';
  const [data, isError] = usePromise(fetchImageData(`${url}/info.json`), []);
  console.log(data, isError);
  return <div>sd,s</div>;
};
