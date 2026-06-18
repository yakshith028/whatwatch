import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.68, 0, 1.2] } },
};

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-10 pb-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        {/* Eyebrow */}
        <motion.div variants={item} className="mb-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.18em] uppercase text-purple-DEFAULT"
            style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}>
            🎬 Personalised for You
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={item}
          className="font-display text-[clamp(2.6rem,7.5vw,6.5rem)] font-black leading-[1.04] tracking-tight mb-5 max-w-4xl"
        >
          What Should I{' '}
          <span className="gradient-text italic">Watch</span>
          <br />
          Tonight?
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={item}
          className="text-[clamp(1rem,2vw,1.2rem)] text-slate-400 max-w-[480px] leading-relaxed mb-3"
        >
          Stop scrolling endlessly.{' '}
          <span className="text-slate-200 font-medium">Discover your next favourite</span>{' '}
          movie or series in seconds.
        </motion.p>

        <motion.p
          variants={item}
          className="text-xs text-slate-600 tracking-wide"
        >
          No login. No ads. Just movies.
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] tracking-[0.15em] uppercase text-slate-600">Pick your vibe</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="text-slate-700 text-lg"
        >↓</motion.div>
      </motion.div>
    </section>
  );
}
