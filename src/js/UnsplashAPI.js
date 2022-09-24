import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';
axios.defaults.headers.Authorization =
  'Client-ID LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';

export class UnsplashAPI {
  #query = '';
  #searchParams = {
    params: {
      color: 'black',
      orientation: 'landscape',
      per_page: 5,
    },
  };
  async getPopularFotos(page) {
    const { data } = await axios.get(
      `?page=${page}&query=office`,
      this.#searchParams
    );
    return data;
  }

  async getFotosByQuery(page) {
    const { data } = await axios.get(
      `?page=${page}&query=${this.#query}`,
      this.#searchParams
    );
    return data;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}

// https://api.unsplash.com/search/photos?page=1&query=office
