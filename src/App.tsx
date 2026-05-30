import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

// Scenes
import { GiftBox } from "@/components/GiftBox";
import { MusicSelector } from "@/components/MusicSelector";
import { CatCompanion } from "@/components/CatCompanion";
import { MemoryJourney } from "@/components/MemoryJourney";
import { FloatingHearts } from "@/components/FloatingHearts";
import { PersonalLetter } from "@/components/PersonalLetter";
import { NightSkyWish } from "@/components/NightSkyWish";
import { FeelingsJournal } from "@/components/FeelingsJournal";
import { GrandFinale } from "@/components/GrandFinale";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CONFIG } from "./config";

const queryClient = new QueryClient();

function Experience() {
  const [currentScene, setCurrentScene] = useState(1);
  const [selectedSongUrl, setSelectedSongUrl] = useState<string | null>(null);

  const handleNextScene = () => setCurrentScene(prev => prev + 1);

  const handleSongSelect = (index: number) => {
    setSelectedSongUrl(`/music/${CONFIG.songs[index].file}`);
    handleNextScene();
  };

  return (
    <main className="min-h-[100dvh] w-full bg-background text-foreground overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {currentScene === 1 && <GiftBox key="scene1" onOpen={handleNextScene} />}
        {currentScene === 2 && <MusicSelector key="scene2" onSelect={handleSongSelect} />}
        {currentScene === 3 && (
          <div key="scene3" className="min-h-screen flex items-center justify-center p-6 text-center">
            <div className="space-y-8 animate-in fade-in zoom-in duration-1000">
              <h2 className="text-4xl font-serif text-primary">A Journey For You</h2>
              <button onClick={handleNextScene} className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/50">Begin</button>
            </div>
          </div>
        )}
        {currentScene === 4 && <MemoryJourney key="scene4" onComplete={handleNextScene} />}
        {currentScene === 5 && <FloatingHearts key="scene5" onComplete={handleNextScene} />}
        {currentScene === 6 && <PersonalLetter key="scene6" onComplete={handleNextScene} />}
        {currentScene === 7 && <NightSkyWish key="scene7" onComplete={handleNextScene} />}
        {currentScene === 8 && <FeelingsJournal key="scene8" onComplete={handleNextScene} />}
        {currentScene === 9 && <GrandFinale key="scene9" />}
      </AnimatePresence>

      <CatCompanion scene={currentScene} />
      {selectedSongUrl && <AudioPlayer src={selectedSongUrl} />}
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Experience />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
