import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc/';
const API_KEY = 'ECmYj6oBTGYDV1wGRdMtJ7pf4x1yXEr7';

export default class NewArticles {
  async fetchArtic() {
    const url = `${BASE_URL}news/v3/content/all/crosswords%20%26%20games.json?api-key=${API_KEY}`;

    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async fetchCategories(categories) {
    const categoriesEncoder = encodeURIComponent(categories);
    const url = `${BASE_URL}news/v3/content/all/${categoriesEncoder}.json?api-key=${API_KEY}`;

    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
