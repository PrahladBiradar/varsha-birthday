import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateWish } from "@/hooks/use-mock-api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NightSkyWishProps {
  onComplete: () => void;
}

export function NightSkyWish({ onComplete }: NightSkyWishProps) {
  const [showInput, setShowInput] = useState(false);
  const [wishText, setWishText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const createWish = useCreateWish();

  const handleStarClick = () => {
    setShowInput(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    createWish.mutate(
      { data: { text: wishText } },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          setTimeout(() => {
            onComplete();
          }, 4000);
        }
      }
    );
  };

  // Generate background stars
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    size: Math.random() * 3 + 1
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2 } }}
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-[#0a0510] via-[#1a0b2e] to-[#2d1b4e]"
    >
      {/* Background stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.animationDelay
          }}
        />
      ))}

      {/* Nebula glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />

      {!showInput && !isSubmitted && (
        <motion.div
          className="absolute top-1/4 left-0 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_4px_rgba(255,255,255,0.8)] cursor-pointer z-20"
          initial={{ x: -100, y: -100, opacity: 0 }}
          animate={{ x: '100vw', y: '100vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
          onClick={handleStarClick}
        >
          <div className="absolute top-1/2 left-1/2 w-32 h-[1px] bg-gradient-to-r from-white to-transparent transform -translate-y-1/2 rotate-45 origin-left" />
        </motion.div>
      )}

      <div className="absolute inset-0 flex items-center justify-center p-6 z-30">
        <AnimatePresence mode="wait">
          {showInput && !isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 w-full max-w-md text-center"
            >
              <h3 className="text-2xl font-serif text-white mb-6">What are you wishing for?</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Your wish..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 text-center text-lg focus-visible:ring-primary/50"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  disabled={!wishText.trim() || createWish.isPending}
                  className="w-full bg-primary/80 hover:bg-primary text-white rounded-full"
                >
                  {createWish.isPending ? "Sending..." : "Send to the stars ✨"}
                </Button>
              </form>
            </motion.div>
          )}

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <p className="text-3xl font-serif text-white text-shadow-lg">
                Your wish has been sent to the stars ✨
              </p>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 2, 0], y: -200, opacity: [1, 1, 0] }}
                transition={{ duration: 3, delay: 1 }}
                className="w-4 h-4 bg-white rounded-full shadow-[0_0_30px_10px_rgba(255,255,255,0.8)] mx-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
