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
  return fetch(
    'repository/slides/b21f01f3-fe3e-4bd9-a4de-b19065cf4445/description'
  )
    .then(res => {
      console.log('rees',res.json())
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

async function fetchDescription() {
  return await fetchHandler();
}

export default fetchDescription;
