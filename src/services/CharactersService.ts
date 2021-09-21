import HttpClient from './utils/HttpClient';

export interface Params {
  offset: number;
}

class CharactersService {
  public httpClient;

  constructor() {
    this.httpClient = new HttpClient('https://gateway.marvel.com/v1/public');
  }

  async listCharacters(id: string) {
    return this.httpClient.get(
      `/characters?nameStartsWith=${id}&ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
    );
  }

  async listCharactersDetails(id: string) {
    return this.httpClient.get(
      `/characters/${id}?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
    );
  }

  async listComicsByCharacter(id: string, params: Params) {
    return this.httpClient.get(
      `/characters/${id}/comics?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
      params,
    );
  }
}

export default new CharactersService();
