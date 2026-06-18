import { useEffect, useRef } from 'react';

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 25,
  duration: 18 + Math.random() * 18,
  size: Math.random() > 0.7 ? 3 : 2,
}));

export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none">
      {/* Orbs */}
      <div className="orb" style={{ width: 700, height: 700, background: '#8B5CF6', top: -250, left: -150, animationDelay: '0s' }} />
      <div className="orb" style={{ width: 550, height: 550, background: '#3B82F6', top: '45%', right: -180, animationDelay: '-9s' }} />
      <div className="orb" style={{ width: 450, height: 450, background: '#EC4899', bottom: -100, left: '35%', animationDelay: '-17s' }} />

      {/* Particles */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
