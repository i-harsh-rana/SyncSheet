import React, { useMemo, useRef } from 'react';
import {motion, useInView} from 'framer-motion'

const GoldenGlittery = () => {
  const divRef = useRef();
  const inView = useInView(divRef, {once: true, amount: 0.5});

  const sparkles = useMemo(() => {
    return Array.from({ length: 500 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 1+1}px`,
      duration: `${Math.random() * 3 + 1}s`
    }));
  }, []);

  return (
    <motion.div
      ref={divRef}
      initial={{y: 50, opacity: 0}}
      animate={{y: inView ? 0 : 50, opacity: inView ? 1 : 0}}
      transition={{duration: 0.8, ease: 'easeInOut'}}
      className="relative w-[50rem] h-[30rem] rounded-lg p-6 cursor-pointer overflow-hidden"
      style={{
        background: '#b8860b',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            background: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
            animation: `sparkle ${sparkle.duration} linear infinite`,
          }}
        />
      ))}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white mb-2">Glittery Interactive Background</h2>
        <p className="text-white">Move your cursor over this div to see the glittery effect!</p>
      </div>
      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </motion.div>
  );
};

export default GoldenGlittery;