import axios from 'axios';

const API_KEY = '35792942-c738c06de8752e63923c1b94a';
const perPage = 12;

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImagesAPI= async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );

  return response.data.hits;
}