import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";
import { CONFIG } from "../config";
import { Button } from "@/components/ui/button";

interface PersonalLetterProps {
  onComplete: () => void;
}

export function PersonalLetter({ onComplete }: PersonalLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(CONFIG.letter.slice(0, i));
      i++;
      if (i > CONFIG.letter.length) clearInterval(interval);
    }, 50); // Speed of typewriter

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full flex items-center justify-center p-6 relative"
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="flex flex-col items-center gap-6 cursor-pointer group"
            onClick={() => setIsOpen(true)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/40 transition-colors duration-500" />
              <MailOpen className="w-24 h-24 text-primary relative z-10 animate-float" />
            </div>
            <p className="font-serif text-2xl text-primary">You received a letter 💌</p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ y: 50, opacity: 0, rotateX: 45 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#fdfbf7] p-8 md:p-12 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-2xl w-full relative z-10"
            style={{
              backgroundImage: 'radial-gradient(#e5e5e5 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            <div className="whitespace-pre-wrap font-handwriting text-2xl md:text-3xl text-gray-800 leading-relaxed min-h-[400px]">
              {displayedText}
            </div>

            {displayedText.length >= CONFIG.letter.length && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 1 }}
                className="mt-12 text-center"
              >
                <Button 
                  onClick={onComplete}
                  variant="outline" 
                  className="rounded-full border-gray-300 text-gray-600 hover:bg-gray-100 font-serif px-8"
                >
                  Fold Letter
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
