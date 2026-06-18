require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;
const TMDB_KEY = process.env.TMDB_API_KEY;
const TMDB = 'https://api.themoviedb.org/3';

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET'],
}));
app.use(express.json());

// ── TMDB helper ─────────────────────────────────────────────────────────────
async function tmdb(path, params = {}) {
  const res = await axios.get(`${TMDB}${path}`, {
    params: { api_key: TMDB_KEY, ...params },
  });
  return res.data;
}

// ── Trailer helper ──────────────────────────────────────────────────────────
async function getTrailer(id, type) {
  try {
    const path = type === 'tv' ? `/tv/${id}/videos` : `/movie/${id}/videos`;
    const data = await tmdb(path);
    const vid = (data.results || []).find(
      v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
    );
    return vid ? `https://www.youtube.com/embed/${vid.key}?autoplay=1&mute=1&rel=0` : null;
  } catch { return null; }
}

// ── Format helper ───────────────────────────────────────────────────────────
function formatItem(item, type, trailerUrl) {
  const isMovie = type === 'movie';
  return {
    id: item.id,
    type,
    title: isMovie ? item.title : item.name,
    poster: item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : null,
    backdrop: item.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
      : null,
    rating: item.vote_average ? parseFloat(item.vote_average.toFixed(1)) : 0,
    releaseDate: isMovie ? item.release_date : item.first_air_date,
    overview: item.overview || '',
    genreIds: item.genre_ids || [],
    popularity: item.popularity || 0,
    trailerUrl,
  };
}

// ── GET /genres ──────────────────────────────────────────────────────────────
app.get('/genres', async (req, res) => {
  const { type = 'movie' } = req.query;
  try {
    const path = type === 'tv' ? '/genre/tv/list' : '/genre/movie/list';
    const data = await tmdb(path, { language: 'en-US' });
    res.json({ genres: data.genres || [] });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch genres', detail: e.message });
  }
});

// ── GET /languages ───────────────────────────────────────────────────────────
app.get('/languages', async (req, res) => {
  const POPULAR = [
    { iso_639_1: 'en', english_name: 'English' },
    { iso_639_1: 'fr', english_name: 'French' },
    { iso_639_1: 'es', english_name: 'Spanish' },
    { iso_639_1: 'de', english_name: 'German' },
    { iso_639_1: 'ja', english_name: 'Japanese' },
    { iso_639_1: 'ko', english_name: 'Korean' },
    { iso_639_1: 'hi', english_name: 'Hindi' },
    { iso_639_1: 'it', english_name: 'Italian' },
    { iso_639_1: 'pt', english_name: 'Portuguese' },
    { iso_639_1: 'zh', english_name: 'Chinese' },
    { iso_639_1: 'ru', english_name: 'Russian' },
    { iso_639_1: 'ar', english_name: 'Arabic' },
    { iso_639_1: 'tr', english_name: 'Turkish' },
  ];
  res.json({ languages: POPULAR });
});

// ── GET /recommend ────────────────────────────────────────────────────────────
app.get('/recommend', async (req, res) => {
  const { genre, language, type = 'movie' } = req.query;
  const endpoint = type === 'tv' ? '/discover/tv' : '/discover/movie';

  const params = {
    sort_by: 'popularity.desc',
    'vote_count.gte': 100,
    'vote_average.gte': 6,
    with_original_language: language || 'en',
    page: Math.floor(Math.random() * 4) + 1,
  };
  if (genre) params.with_genres = genre;

  try {
    const data = await tmdb(endpoint, params);
    let results = data.results || [];

    // Shuffle
    for (let i = results.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [results[i], results[j]] = [results[j], results[i]];
    }
    results = results.slice(0, 12);

    // Fetch trailers concurrently (best-effort)
    const withTrailers = await Promise.all(
      results.map(async item => {
        const trailerUrl = await getTrailer(item.id, type);
        return formatItem(item, type, trailerUrl);
      })
    );

    res.json({ results: withTrailers, total: data.total_results || 0 });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Failed to fetch recommendations', detail: e.message });
  }
});

// ── GET /surprise ─────────────────────────────────────────────────────────────
app.get('/surprise', async (req, res) => {
  const types = ['movie', 'tv'];
  const type = types[Math.floor(Math.random() * types.length)];
  const endpoint = type === 'tv' ? '/discover/tv' : '/discover/movie';
  const page = Math.floor(Math.random() * 10) + 1;

  try {
    const data = await tmdb(endpoint, {
      sort_by: 'popularity.desc',
      'vote_count.gte': 500,
      'vote_average.gte': 7,
      page,
    });
    const results = data.results || [];
    if (!results.length) return res.status(404).json({ error: 'No results' });

    const item = results[Math.floor(Math.random() * results.length)];
    const trailerUrl = await getTrailer(item.id, type);
    res.json(formatItem(item, type, trailerUrl));
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch surprise', detail: e.message });
  }
});

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.json({ status: 'ok', service: 'WhatWatch API' }));

app.listen(PORT, () => console.log(`🎬 WhatWatch API running on port ${PORT}`));
