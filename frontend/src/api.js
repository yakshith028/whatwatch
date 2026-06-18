import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
});

export async function getGenres(type = 'movie') {
  const { data } = await api.get('/genres', { params: { type } });
  return data.genres || [];
}

export async function getLanguages() {
  const { data } = await api.get('/languages');
  return data.languages || [];
}

export async function getRecommendations({ genre, language, type }) {
  const { data } = await api.get('/recommend', {
    params: { genre, language, type },
  });
  return data.results || [];
}

export async function getSurprise() {
  const { data } = await api.get('/surprise');
  return data;
}
