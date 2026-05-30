import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { CONFIG } from "../config";
import { Button } from "@/components/ui/button";

interface MemoryJourneyProps {
  onComplete: () => void;
}

export function MemoryJourney({ onComplete }: MemoryJourneyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        if (currentIndex < CONFIG.memories.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
          onComplete(); // Move to next scene if auto-playing reaches end
        }
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, onComplete]);

  const handleNext = () => {
    if (currentIndex < CONFIG.memories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentMemory = CONFIG.memories[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative"
    >
      <div className="w-full max-w-lg relative perspective-[1000px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, rotateY: 15, z: -100 }}
            animate={{ opacity: 1, rotateY: 0, z: 0 }}
            exit={{ opacity: 0, rotateY: -15, z: -100 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white p-4 pb-12 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu"
          >
            <div className="w-full aspect-square bg-gradient-to-br from-primary/10 to-primary/30 rounded flex items-center justify-center overflow-hidden">
              {currentMemory.photo ? (
                <img
                  src={currentMemory.photo}
                  alt="Memory"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6">
                  <p className="font-serif text-black/40 text-lg italic">
                    A beautiful memory...
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 text-center">
              <p className="font-handwriting text-2xl text-black/80">
                {currentMemory.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center gap-6 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="rounded-full border-primary/50 text-primary hover:bg-primary/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className="rounded-full border-primary/50 text-primary hover:bg-primary/20"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="rounded-full border-primary/50 text-primary hover:bg-primary/20"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      
      {currentIndex === CONFIG.memories.length - 1 && !isPlaying && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1}} className="mt-8 z-10">
          <Button onClick={onComplete} className="bg-primary/20 text-primary hover:bg-primary/40 rounded-full font-serif px-8">
            Continue
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
