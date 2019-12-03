type ResponseData = {
  slide_id: string;
  description: {
    classification: {
      standard: string;
      code: string;
    };
  };
};

async function fetchHandler() {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve({
        slide_id: '131232112',
        description: {
          classification: {
            standard: 'ICD-10',
            code: 'A17'
          }
        }
      });
    }, 300);
  })
    .then((res: any) => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }
      return res;
    })
    .then(response => {
      const {
        slide_id,
        description: {
          classification: { standard, code }
        }
      }: ResponseData = response;
      return [slide_id, standard, code];
    });
}

async function fetchDescription() {
  return await fetchHandler();
}

export default fetchDescription;
