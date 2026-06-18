import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MovieCard({ movie, index, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = e => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const rating = movie.rating ?? 0;
  const ratingColor = rating >= 8 ? '#22C55E' : rating >= 6.5 ? '#FBBF24' : '#EF4444';
  const year = (movie.releaseDate || '').slice(0, 4);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(movie)}
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.06,
        duration: 0.55,
        ease: [0.22, 0.68, 0, 1.2],
      }}
      whileHover={{ y: -8 }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className="relative cursor-pointer rounded-2xl overflow-hidden group"
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: '0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(139,92,246,0.1)' }}
      />

      {/* Card surface */}
      <div
        className="relative z-10 rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">
          {movie.poster ? (
            <motion.img
              src={movie.poster}
              alt={movie.title}
              loading="lazy"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl text-slate-700">
              🎬
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(7,9,15,0.98) 0%, rgba(7,9,15,0.3) 50%, transparent 100%)' }} />

          {/* Rating badge */}
          <div
            className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold"
            style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', color: ratingColor }}
          >
            ★ {rating.toFixed(1)}
          </div>

          {/* Type badge */}
          <div
            className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase"
            style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.35)', color: '#A78BFA', backdropFilter: 'blur(8px)' }}
          >
            {movie.type === 'tv' ? 'Series' : 'Film'}
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="font-display font-bold text-base leading-tight text-slate-100 mb-2 line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
            {year && <span>{year}</span>}
            {year && <span className="w-1 h-1 rounded-full bg-slate-700" />}
            <span className="capitalize">{movie.type === 'tv' ? 'TV Series' : 'Movie'}</span>
          </div>
          {movie.overview && (
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
              {movie.overview}
            </p>
          )}
        </div>

        {/* Click cue */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(139,92,246,0.08)' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="glass rounded-full px-4 py-2 text-xs font-semibold text-white flex items-center gap-2"
          >
            ▶ Details
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
