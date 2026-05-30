import React from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../config";

export function GrandFinale() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Soft collage background */}
      <div className="absolute inset-0 opacity-20 grid grid-cols-3 md:grid-cols-4 gap-4 p-4 transform scale-110">
        {CONFIG.memories.map((m, i) => (
          <div key={i} className="w-full h-full bg-primary/20 rounded-lg overflow-hidden blur-[2px]">
            {m.photo && <img src={m.photo} className="w-full h-full object-cover" alt="" />}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* SVG Constellation */}
      <motion.svg
        className="absolute inset-0 w-full h-full z-10 opacity-30 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 20,50 L 40,30 L 60,60 L 80,40"
          stroke="var(--color-primary)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
        {[ [20,50], [40,30], [60,60], [80,40] ].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r="1" fill="white" className="star" />
        ))}
      </motion.svg>

      <div className="z-20 text-center space-y-8 px-6">
        <motion.h1 
          className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/80 to-primary/40 font-bold"
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 1 }}
        >
          Happy Birthday ❤️
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl font-sans font-light text-foreground/80 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
        >
          {CONFIG.finalMessage}
        </motion.p>
      </div>

      {/* Falling petals/confetti */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary/60 blur-[1px]"
            initial={{ 
              x: `${Math.random() * 100}vw`, 
              y: -20,
              rotate: 0 
            }}
            animate={{ 
              y: '100vh',
              rotate: 360,
              x: `+=${Math.random() * 100 - 50}px`
            }}
            transition={{ 
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
