import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function SurpriseReveal({ movie, onView, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const year = (movie.releaseDate || '').slice(0, 4);
  const rating = movie.rating ?? 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)' }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
          onClick={e => e.stopPropagation()}
          className="relative max-w-sm w-full rounded-3xl overflow-hidden text-center"
          style={{
            background: 'rgba(14,18,30,0.98)',
            border: '1px solid rgba(139,92,246,0.4)',
            boxShadow: '0 0 80px rgba(139,92,246,0.3), 0 40px 100px rgba(0,0,0,0.8)',
          }}
        >
          {/* Glow header */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6)' }} />

          <div className="p-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 18 }}
              className="text-4xl mb-4"
            >
              🎲
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: '#A78BFA' }}
            >
              Tonight you're watching
            </motion.p>

            {movie.poster && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.45, type: 'spring' }}
                className="w-32 mx-auto rounded-xl overflow-hidden shadow-2xl mb-5"
              >
                <img src={movie.poster} alt={movie.title} className="w-full block" />
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="font-display text-2xl font-black text-white leading-tight mb-2"
            >
              {movie.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center justify-center gap-3 text-xs text-slate-400 mb-4"
            >
              {year && <span>{year}</span>}
              <span>·</span>
              <span style={{ color: '#FBBF24', fontWeight: 700 }}>★ {rating.toFixed(1)}</span>
              <span>·</span>
              <span>{movie.type === 'tv' ? 'Series' : 'Film'}</span>
            </motion.div>

            {movie.overview && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-3"
              >
                {movie.overview}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-3 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onView(movie)}
                className="btn-primary text-sm"
              >
                ▶ View Details
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                onClick={onClose}
                className="btn-ghost text-sm"
              >
                Try Another
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
