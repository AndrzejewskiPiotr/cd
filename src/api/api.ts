interface Params {
  az?: 'json' | 'text';
  body?: FormData | URLSearchParams | null | string;
  headers?: Array<Array<string>> | Headers | { [name: string]: string };
  method?: string;
  queries?: { [name: string]: string };
}

export class API {
  handleResponse(response: any) {
    const { ok, status, statusText } = response;
    if (ok) {
      return response.json();
    } else {
      return Promise.reject({
        status,
        statusText
      });
    }
  }
  get(url: string, options?: Params) {
    return fetch(url, {
      ...options
    }).then(this.handleResponse);
  }
  put(url: string, options?: Params) {
    return fetch(url, {
      method: 'PUT',
      ...options
    }).then(this.handleResponse);
  }
}
