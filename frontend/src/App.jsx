import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import AmbientBackground from './components/AmbientBackground.jsx';
import HeroSection from './components/HeroSection.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import ResultsGrid from './components/ResultsGrid.jsx';
import CinematicModal from './components/CinematicModal.jsx';
import SurpriseReveal from './components/SurpriseReveal.jsx';
import { getGenres, getLanguages, getRecommendations, getSurprise } from './api.js';

export default function App() {
  // Meta
  const [genres, setGenres]       = useState([]);
  const [languages, setLanguages] = useState([]);

  // Filters
  const [filters, setFilters] = useState({
    genre: '', language: 'en', type: 'movie',
  });

  // Results
  const [movies, setMovies]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [searched, setSearched] = useState(false);

  // Modals
  const [selectedMovie, setSelectedMovie]   = useState(null);
  const [surpriseMovie, setSurpriseMovie]   = useState(null);
  const [surpriseLoading, setSurpriseLoading] = useState(false);

  const resultsRef = useRef(null);

  // Fetch genres & languages on mount + when type changes
  useEffect(() => {
    getGenres(filters.type).then(setGenres).catch(console.error);
  }, [filters.type]);

  useEffect(() => {
    getLanguages().then(setLanguages).catch(console.error);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setSearched(true);
    setMovies([]);
    try {
      const results = await getRecommendations(filters);
      setMovies(results);
    } catch (e) {
      setError(e.response?.data?.error || e.message || 'Failed to fetch recommendations.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleSurprise = async () => {
    setSurpriseLoading(true);
    try {
      const movie = await getSurprise();
      setSurpriseMovie(movie);
    } catch (e) {
      setError('Surprise failed. Try again!');
    } finally {
      setSurpriseLoading(false);
    }
  };

  const openMovie = movie => {
    setSurpriseMovie(null);
    setSelectedMovie(movie);
  };

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />

      <main className="relative">
        <HeroSection />

        <FilterPanel
          genres={genres}
          languages={languages}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onSurprise={handleSurprise}
          loading={loading || surpriseLoading}
        />

        <div ref={resultsRef}>
          <ResultsGrid
            movies={movies}
            loading={loading}
            searched={searched}
            error={error}
            onCardClick={openMovie}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-[11px] text-slate-700 tracking-wide">
        Powered by TMDB &nbsp;·&nbsp; No tracking, no ads &nbsp;·&nbsp; Made with ✦
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedMovie && (
          <CinematicModal
            key="cinematic"
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
        {surpriseMovie && (
          <SurpriseReveal
            key="surprise"
            movie={surpriseMovie}
            onView={openMovie}
            onClose={() => setSurpriseMovie(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
