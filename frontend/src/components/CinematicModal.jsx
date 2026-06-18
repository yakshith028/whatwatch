import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function CinematicModal({ movie, onClose }) {
  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Escape key
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!movie) return null;

  const rating = movie.rating ?? 0;
  const ratingColor = rating >= 8 ? '#22C55E' : rating >= 6.5 ? '#FBBF24' : '#EF4444';
  const year = (movie.releaseDate || '').slice(0, 4);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-6 px-4"
        style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(18px)' }}
      >
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 0.68, 0, 1.2] }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-4xl my-auto rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(12,16,28,0.97)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(139,92,246,0.12)',
          }}
        >
          {/* Backdrop image (decorative, blurred behind) */}
          {movie.backdrop && (
            <div className="absolute inset-0 overflow-hidden rounded-3xl z-0">
              <img
                src={movie.backdrop}
                alt=""
                className="w-full h-full object-cover opacity-[0.07] scale-110 blur-sm"
              />
            </div>
          )}

          <div className="relative z-10">
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
              aria-label="Close"
            >
              ✕
            </motion.button>

            {/* Hero row */}
            <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8">
              {/* Poster */}
              {movie.poster && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex-shrink-0 w-36 sm:w-44 rounded-2xl overflow-hidden shadow-2xl self-start"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}
                >
                  <img src={movie.poster} alt={movie.title} className="w-full block" />
                </motion.div>
              )}

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 min-w-0"
              >
                {/* Type tag */}
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase mb-3"
                  style={{ background: 'rgba(139,92,246,0.18)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.3)' }}
                >
                  {movie.type === 'tv' ? 'TV Series' : 'Film'}
                </span>

                {/* Title */}
                <h2 className="font-display text-2xl sm:text-4xl font-black leading-tight text-white mb-4">
                  {movie.title}
                </h2>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
                  <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: ratingColor }}>
                    ★ {rating.toFixed(1)}
                    <span className="text-slate-500 font-normal text-xs">/ 10</span>
                  </div>
                  {year && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                      <span className="text-slate-600">📅</span> {year}
                    </div>
                  )}
                </div>

                {/* Overview */}
                {movie.overview && (
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mb-6">
                    {movie.overview}
                  </p>
                )}

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  {movie.trailerUrl && (
                    <motion.a
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={movie.trailerUrl.replace('?autoplay=1&mute=1&rel=0', '')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      ▶ Watch Trailer
                    </motion.a>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="btn-ghost text-sm"
                  >
                    ← Back
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Trailer embed */}
            {movie.trailerUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="px-6 sm:px-8 pb-8"
              >
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-600 mb-3">
                  🎞 Official Trailer
                </p>
                <div
                  className="w-full rounded-2xl overflow-hidden bg-black"
                  style={{
                    aspectRatio: '16/9',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                  }}
                >
                  <iframe
                    src={movie.trailerUrl}
                    title={`${movie.title} trailer`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0 block"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
