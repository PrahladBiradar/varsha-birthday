import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { CONFIG } from "../config";
import { Button } from "@/components/ui/button";

interface FloatingHeartsProps {
  onComplete: () => void;
}

interface HeartData {
  id: number;
  x: number;
  y: number;
  size: number;
  message: string;
}

export function FloatingHearts({ onComplete }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<HeartData[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const generateHearts = () => {
    const newHearts: HeartData[] = [];
    const count = 5;
    for (let i = 0; i < count; i++) {
      const msgIndex = (poppedCount + i) % CONFIG.heartMessages.length;
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * 80 + 10, // 10% to 90%
        y: Math.random() * 80 + 10,
        size: Math.random() * 20 + 30, // 30 to 50px
        message: CONFIG.heartMessages[msgIndex],
      });
    }
    setHearts(newHearts);
  };

  useEffect(() => {
    generateHearts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePop = (id: number, message: string) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setActiveMessage(message);
    setPoppedCount((prev) => prev + 1);

    setTimeout(() => {
      setActiveMessage(null);
    }, 3000);
  };

  useEffect(() => {
    if (hearts.length === 0 && poppedCount > 0) {
      if (poppedCount >= Math.min(CONFIG.heartMessages.length, 8)) {
        // Show continue button after clicking enough
      } else {
        setTimeout(generateHearts, 1000);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hearts.length, poppedCount]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full relative overflow-hidden"
    >
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -20, 20, 0],
              x: [0, 10, -10, 0]
            }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ 
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              x: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              opacity: { duration: 0.3 }
            }}
            className="absolute cursor-pointer text-primary hover:text-pink-400 transition-colors"
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
            onClick={() => handlePop(heart.id, heart.message)}
          >
            <Heart size={heart.size} fill="currentColor" className="drop-shadow-[0_0_10px_rgba(255,182,193,0.5)]" />
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card/80 backdrop-blur p-6 rounded-2xl border border-primary/20 shadow-2xl text-center max-w-sm w-full z-20"
          >
            <p className="font-serif text-xl text-primary-foreground text-foreground">{activeMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {hearts.length === 0 && poppedCount > 0 && !activeMessage && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
        >
          <Button onClick={onComplete} className="bg-primary/20 text-primary hover:bg-primary/40 rounded-full font-serif px-8">
            Continue
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
