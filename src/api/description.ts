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
      console.log(response)
      const {
        description: {
          classification: { standard, code }
        },
        slide_id,
      }: ResponseData = response;
      return [standard, code,slide_id, ];
    });
}

async function updateHandler(url: string, body: ResponseData) {
  return fetch(
    url,
    {
      method:'PUT',
      body: JSON.stringify(body)
    }
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
      return [standard, code, slide_id,];
    });
}

async function fetchDescription(url: string) {
  return await fetchHandler(url);
}

async function updateDescription(url: string, body: ResponseData) {
  return await updateHandler(url, body)
}

export {
  fetchDescription,
  updateDescription
};
