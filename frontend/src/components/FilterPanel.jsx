import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Select from './Select.jsx';

export default function FilterPanel({
  genres, languages, filters, onFilterChange,
  onSearch, onSurprise, loading,
}) {
  const [roulette, setRoulette] = useState(false);

  const genreOptions = [
    { value: '', label: 'Any Genre' },
    ...genres.map(g => ({ value: String(g.id), label: g.name })),
  ];

  const languageOptions = [
    { value: '', label: 'Any Language' },
    ...languages.map(l => ({ value: l.iso_639_1, label: l.english_name })),
  ];

  const typeOptions = [
    { value: 'movie', label: '🎬  Movie' },
    { value: 'tv',    label: '📺  TV Series' },
  ];

  const handleSurprise = () => {
    setRoulette(true);
    setTimeout(() => setRoulette(false), 700);
    onSurprise();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 0.68, 0, 1.2] }}
      className="relative z-10 w-full max-w-3xl mx-auto px-4 mb-20"
    >
      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 0 80px rgba(139,92,246,0.07), 0 2px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* Selects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Select
            label="Genre"
            value={filters.genre}
            onChange={v => onFilterChange('genre', v)}
            options={genreOptions}
            disabled={loading}
          />
          <Select
            label="Language"
            value={filters.language}
            onChange={v => onFilterChange('language', v)}
            options={languageOptions}
            disabled={loading}
          />
          <Select
            label="Content Type"
            value={filters.type}
            onChange={v => onFilterChange('type', v)}
            options={typeOptions}
            disabled={loading}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSearch}
            disabled={loading}
            className="btn-primary flex-1 sm:flex-none justify-center py-3.5 text-base"
          >
            {loading ? (
              <>
                <SpinIcon />
                Searching…
              </>
            ) : (
              <>
                <SearchIcon />
                Find Recommendations
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            animate={roulette ? { rotate: [0, 360] } : {}}
            transition={{ duration: 0.6 }}
            onClick={handleSurprise}
            disabled={loading}
            className="btn-ghost flex-1 sm:flex-none justify-center py-3.5 text-base"
          >
            🎲 Surprise Me
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SpinIcon() {
  return (
    <motion.svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </motion.svg>
  );
}
