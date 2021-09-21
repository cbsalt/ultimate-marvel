import HttpClient from './utils/HttpClient';

export interface Params {
  offset: number;
}

const {
  REACT_APP_MARVEL_PRIVATE_KEY,
  REACT_APP_MARVEL_HASH_KEY,
  REACT_APP_MARVEL_TIMESTAMP,
} = process.env;

class CharactersService {
  public httpClient;

  constructor() {
    this.httpClient = new HttpClient('https://gateway.marvel.com/v1/public');
  }

  async listCharacters(id: string) {
    return this.httpClient.get(
      `/characters?nameStartsWith=${id}&ts=${REACT_APP_MARVEL_TIMESTAMP}&apikey=${REACT_APP_MARVEL_PRIVATE_KEY}&hash=${REACT_APP_MARVEL_HASH_KEY}`,
    );
  }

  async listCharactersDetails(id: string) {
    return this.httpClient.get(
      `/characters/${id}?ts=${REACT_APP_MARVEL_TIMESTAMP}&apikey=${REACT_APP_MARVEL_PRIVATE_KEY}&hash=${REACT_APP_MARVEL_HASH_KEY}`,
    );
  }

  async listComicsByCharacter(id: string, params: Params) {
    return this.httpClient.get(
      `/characters/${id}/comics?ts=${REACT_APP_MARVEL_TIMESTAMP}&apikey=${REACT_APP_MARVEL_PRIVATE_KEY}&hash=${REACT_APP_MARVEL_HASH_KEY}`,
      params,
    );
  }
}

export default new CharactersService();
