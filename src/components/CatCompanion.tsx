import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface CatCompanionProps {
  scene: number;
}

interface FloatingHeart {
  id: number;
  x: number;
}

export function CatCompanion({ scene }: CatCompanionProps) {
  const [sceneMessage, setSceneMessage] = useState("");
  const [petMessage, setPetMessage] = useState<string | null>(null);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [wiggleTrigger, setWiggleTrigger] = useState(0);
  const [spinTrigger, setSpinTrigger] = useState(0);

  // Scene dialogue
  useEffect(() => {
    switch (scene) {
      case 3: setSceneMessage("Welcome 😊 I'm Pallu. I have something special to show you."); break;
      case 4: setSceneMessage("This next memory is beautiful..."); break;
      case 5: setSceneMessage("Keep clicking the hearts 💕"); break;
      case 6: setSceneMessage("A letter just for you..."); break;
      case 7: setSceneMessage("Before today ends... make a wish ✨"); break;
      case 8: setSceneMessage("Happy birthday, Varsha 🎂"); break;
      default: setSceneMessage(""); break;
    }
    // Clear any pet bubble when scene changes
    setPetMessage(null);
  }, [scene]);

  if (scene < 3) return null;

  // Cat messages when clicked (petted)
  const petResponses = [
    "Meow! *purrs happily* ❤️",
    "Did you click me? That feels nice! 🥰",
    "Happy Birthday, Varsha! 🎉",
    "Varsha! 🌸 You are the absolute best!",
    "Pallu thinks you are spectacular! ✨",
    "I'm Pallu, your birthday companion! 🐾",
    "You deserve all the treats today, Varsha! 🎁",
    "Varsha is the greatest! 👑",
    "Is there a birthday cake for Pallu too? 🍰",
    "Wishing you a year full of purr-fect days, Varsha! 🌟",
    "Pallu loves you, Varsha! 💕",
  ];

  const handleCatClick = () => {
    // Increment clicks
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    // Create a new floating heart
    const newHeart: FloatingHeart = {
      id: Date.now(),
      x: Math.random() * 40 - 20, // Spread hearts left and right
    };
    setHearts((prev) => [...prev, newHeart]);

    // Cleanup heart after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);

    // Trigger animations
    if (newClickCount % 5 === 0) {
      // Every 5th click, do a full spin!
      setSpinTrigger((prev) => prev + 1);
      setPetMessage("WHOAAAA! I'm spinning! 💫");
    } else {
      setWiggleTrigger((prev) => prev + 1);
      // Select a random response
      const randomMsg = petResponses[Math.floor(Math.random() * petResponses.length)];
      setPetMessage(randomMsg);
    }

    // Reset click count after a delay of no clicks
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 3000);

    return () => clearTimeout(timer);
  };

  // Clear pet message after 3 seconds of showing it
  useEffect(() => {
    if (petMessage) {
      const timer = setTimeout(() => {
        setPetMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [petMessage, wiggleTrigger, spinTrigger]);

  const activeMessage = petMessage || sceneMessage;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-4 pointer-events-none">
      {/* Interactive Cat Illustration (CSS) */}
      <div className="relative pointer-events-auto">
        {/* Floating Heart Particles */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                y: -100, 
                x: heart.x,
                scale: [0.5, 1.2, 1, 0.8]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 left-6 text-pink-400 z-50 pointer-events-none"
            >
              <Heart size={20} fill="currentColor" />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          className="relative w-16 h-16 flex flex-col justify-end items-center cursor-pointer select-none active:scale-95"
          onClick={handleCatClick}
          whileHover={{ scale: 1.1 }}
          animate={{
            y: [0, -6, 0],
            rotate: spinTrigger > 0 ? [0, 360 * spinTrigger] : wiggleTrigger > 0 ? [0, -10, 10, -5, 5, 0] : 0
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 3.5,
              ease: "easeInOut",
            },
            rotate: {
              type: spinTrigger > 0 ? "tween" : "spring",
              duration: spinTrigger > 0 ? 0.8 : 0.5,
            }
          }}
        >
          <div className="w-14 h-12 bg-white rounded-t-3xl rounded-b-xl relative shadow-[0_0_18px_rgba(255,255,255,0.4)] transition-colors hover:bg-pink-50">
            {/* Ears */}
            <div className="absolute -top-3 left-0 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-white transform -rotate-12 transition-colors hover:border-b-pink-50" />
            <div className="absolute -top-3 right-0 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-white transform rotate-12 transition-colors hover:border-b-pink-50" />
            
            {/* Ear inner pinks */}
            <div className="absolute -top-1.5 left-1 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-pink-200 transform -rotate-12" />
            <div className="absolute -top-1.5 right-1 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-pink-200 transform rotate-12" />

            {/* Eyes */}
            <div className="absolute top-4 left-3 w-2 h-2 bg-black rounded-full animate-pulse" />
            <div className="absolute top-4 right-3 w-2 h-2 bg-black rounded-full animate-pulse" />
            
            {/* Cheeks */}
            <div className="absolute top-5 left-1.5 w-2 h-1 bg-pink-200 rounded-full opacity-60" />
            <div className="absolute top-5 right-1.5 w-2 h-1 bg-pink-200 rounded-full opacity-60" />

            {/* Nose & Mouth */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1.5 h-1 bg-pink-300 rounded-full" />
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b border-black rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        {activeMessage && (
          <motion.div
            key={activeMessage}
            initial={{ opacity: 0, x: -15, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            className="bg-white/95 backdrop-blur text-black px-4 py-2.5 rounded-2xl rounded-bl-none shadow-xl text-sm font-sans max-w-[210px] border border-pink-100"
          >
            {activeMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
