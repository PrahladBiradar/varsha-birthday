import React from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GiftBoxProps {
  onOpen: () => void;
}

export function GiftBox({ onOpen }: GiftBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="z-10 text-center space-y-12 flex flex-col items-center"
      >
        <h1 className="text-3xl md:text-5xl font-serif text-primary tracking-wide">
          Someone made something special for you ❤️
        </h1>

        <motion.div
          className="relative group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
        >
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500 animate-pulse" />
          <div className="h-48 w-48 bg-card border border-primary/30 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
            {/* Box Ribbon Cross */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-full w-8 bg-primary/40" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-8 bg-primary/40" />
            </div>
            <Gift className="w-16 h-16 text-primary z-10" />
          </div>
        </motion.div>

        <Button
          onClick={onOpen}
          size="lg"
          className="bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary-foreground border border-primary/50 text-lg px-8 rounded-full font-serif transition-all duration-300"
        >
          Open Your Gift
        </Button>
      </motion.div>
    </motion.div>
  );
}
