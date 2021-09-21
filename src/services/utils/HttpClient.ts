/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
class HttpClient {
  public baseURL;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get(path: string, params = {}) {
    if (!params) {
      const response = await fetch(`${this.baseURL}${path}`);

      return response;
    }
    const response = await fetch(
      `${this.baseURL}${path}&${new URLSearchParams(params)}`,
    );

    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} - ${response.statusText}`);
  }
}

export default HttpClient;
