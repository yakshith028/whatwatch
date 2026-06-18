import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from './MovieCard.jsx';
import SkeletonCard from './SkeletonCard.jsx';

export default function ResultsGrid({ movies, loading, searched, error, onCardClick }) {
  if (!searched && !loading) return null;

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
      {/* Header */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading-header"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mb-8"
          >
            <div className="skeleton-line h-3 w-24 mb-3" />
            <div className="skeleton-line h-8 w-72" />
          </motion.div>
        ) : !error && movies.length > 0 ? (
          <motion.div
            key="results-header"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-purple-DEFAULT mb-2">
              ✦ Curated for You
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-100">
              {movies.length} Recommendations
              <span
                className="ml-3 text-sm font-sans font-semibold px-2.5 py-1 rounded-full align-middle"
                style={{ background: 'rgba(20,184,166,0.15)', color: '#14B8A6', border: '1px solid rgba(20,184,166,0.25)' }}
              >
                Live
              </span>
            </h2>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Error */}
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-slate-200 mb-2">Something went wrong</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">{error}</p>
        </motion.div>
      )}

      {/* No results */}
      {!loading && !error && searched && movies.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="text-5xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold text-slate-200 mb-2">No results found</h3>
          <p className="text-slate-500 text-sm">Try different filters or hit Surprise Me.</p>
        </motion.div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: 12 }, (_, i) => <SkeletonCard key={i} />)
          : movies.map((movie, i) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                index={i}
                onClick={onCardClick}
              />
            ))
        }
      </div>
    </section>
  );
}
