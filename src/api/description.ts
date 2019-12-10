type ResponseData = {
  slide_id: string;
  description: {
    classification: {
      standard: string;
      code: string;
    };
  };
};

async function fetchHandler(url: string) {
  return fetch(
    url
  )
    .then(res => {
      if (res.status >= 400) {
        console.log('Bad response from server');
      }
      return res.json();
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

async function fetchDescription(url: string) {
  return await fetchHandler(url);
}

export default fetchDescription;
