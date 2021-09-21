import HttpClient from './utils/HttpClient';

const {
  REACT_APP_MARVEL_PRIVATE_KEY,
  REACT_APP_MARVEL_HASH_KEY,
  REACT_APP_MARVEL_TIMESTAMP,
} = process.env;

class ComicsService {
  public httpClient;

  constructor() {
    this.httpClient = new HttpClient('https://gateway.marvel.com/v1/public');
  }

  async listComics(id: string) {
    return this.httpClient.get(
      `/comics?titleStartsWith=${id}&ts=${REACT_APP_MARVEL_TIMESTAMP}&apikey=${REACT_APP_MARVEL_PRIVATE_KEY}&hash=${REACT_APP_MARVEL_HASH_KEY}`,
    );
  }

  async listComicDetails(id: string) {
    return this.httpClient.get(
      `/comics/${id}?ts=${REACT_APP_MARVEL_TIMESTAMP}&apikey=${REACT_APP_MARVEL_PRIVATE_KEY}&hash=${REACT_APP_MARVEL_HASH_KEY}`,
    );
  }
}

export default new ComicsService();
