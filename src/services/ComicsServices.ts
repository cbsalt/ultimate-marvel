import HttpClient from './utils/HttpClient';

class ComicsService {
  public httpClient;

  constructor() {
    this.httpClient = new HttpClient('https://gateway.marvel.com/v1/public');
  }

  async listComics(id: string) {
    return this.httpClient.get(
      `/comics?titleStartsWith=${id}&ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
    );
  }

  async listComicDetails(id: string) {
    return this.httpClient.get(
      `/comics/${id}?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
    );
  }
}

export default new ComicsService();
