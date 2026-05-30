import React from "react";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";
import { CONFIG } from "../config";
import { Card, CardContent } from "@/components/ui/card";

interface MusicSelectorProps {
  onSelect: (songIndex: number) => void;
}

export function MusicSelector({ onSelect }: MusicSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="min-h-screen w-full flex flex-col items-center justify-center relative p-6"
    >
      <div className="max-w-md w-full space-y-8 z-10">
        <div className="text-center space-y-4">
          <Music2 className="w-12 h-12 text-primary mx-auto animate-float" />
          <h2 className="text-3xl font-serif text-primary">Choose a song</h2>
          <p className="text-muted-foreground font-light text-lg">To accompany your journey...</p>
        </div>

        <div className="space-y-4">
          {CONFIG.songs.map((song, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card
                className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 cursor-pointer transition-all duration-300 hover:bg-card/80 group"
                onClick={() => onSelect(index)}
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors">
                      {song.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <Music2 className="w-5 h-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
