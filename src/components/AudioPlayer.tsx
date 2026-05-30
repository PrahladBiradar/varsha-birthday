import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";

interface AudioPlayerProps {
  src: string;
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      // Play when src changes
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback failed:", err);
        setIsPlaying(false);
      });
    }
  }, [src]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio ref={audioRef} src={src} loop />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 100 }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            className="bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-lg"
          >
            <div className="h-full flex flex-col items-center gap-2">
              <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/20 rounded-full" onClick={toggleMute}>
                {isMuted || volume === 0 ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                max={100}
                step={1}
                orientation="vertical"
                className="h-full"
                onValueChange={(vals) => {
                  setVolume(vals[0] / 100);
                  if (vals[0] > 0) setIsMuted(false);
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={togglePlay}
        size="icon"
        className="h-12 w-12 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary hover:bg-primary/40 shadow-lg transition-all"
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
      </Button>
    </div>
  );
}
