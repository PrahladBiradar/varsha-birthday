import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateFeeling } from "@/hooks/use-mock-api";

interface Props {
  onComplete: () => void;
}

export function FeelingsJournal({ onComplete }: Props) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const createFeeling = useCreateFeeling();

  const handleSubmit = async () => {
    if (!text.trim()) {
      onComplete();
      return;
    }
    await createFeeling.mutateAsync({ data: { text: text.trim() } });
    setSubmitted(true);
    setTimeout(onComplete, 2500);
  };

  const handleSkip = () => onComplete();

  return (
    <motion.div
      key="feelings"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 animate-pulse"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
              animationDuration: Math.random() * 3 + 2 + "s",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-xl flex flex-col items-center gap-8 relative z-10"
          >
            {/* Decorative line */}
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/40" />
              <span className="text-2xl">📖</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/40" />
            </div>

            <div className="text-center space-y-3">
              <h2 className="text-4xl font-serif text-primary leading-snug">
                How are you feeling?
              </h2>
              <p className="text-muted-foreground text-sm">
                This page is just for you. Write anything — or skip entirely.
              </p>
            </div>

            {/* Paper-like textarea */}
            <div className="w-full relative">
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,240,220,0.07) 0%, rgba(200,160,200,0.05) 100%)",
                  border: "1px solid rgba(255,200,200,0.15)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              />
              {/* Ruled lines */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-b border-white/[0.04]"
                    style={{ top: `${(i + 1) * 44}px` }}
                  />
                ))}
              </div>
              <textarea
                data-testid="input-feelings"
                className="relative z-10 w-full bg-transparent resize-none rounded-2xl p-6 pt-5 text-foreground/90 placeholder:text-muted-foreground/40 focus:outline-none leading-[44px] font-['Dancing_Script',cursive] text-lg"
                rows={10}
                placeholder="Whatever is on your heart right now..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={2000}
              />
            </div>

            {/* Character count */}
            {text.length > 0 && (
              <p className="text-xs text-muted-foreground/50 self-end -mt-4">
                {text.length} / 2000
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <motion.button
                data-testid="button-save-feelings"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={createFeeling.isPending}
                className="flex-1 py-3 px-6 rounded-full font-medium transition-all duration-300 disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
                  color: "hsl(var(--primary-foreground))",
                  boxShadow: "0 4px 20px rgba(180,100,160,0.4)",
                }}
              >
                {createFeeling.isPending
                  ? "Saving..."
                  : text.trim()
                  ? "Save & Continue ✨"
                  : "Continue"}
              </motion.button>

              <motion.button
                data-testid="button-skip-feelings"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSkip}
                className="py-3 px-6 rounded-full text-muted-foreground hover:text-foreground transition-colors text-sm border border-white/10 hover:border-white/20"
              >
                Skip for now
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="thankyou"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-5xl"
            >
              🌸
            </motion.div>
            <h3 className="text-3xl font-serif text-primary">
              Thank you for sharing.
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Your feelings are safe here. Always.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
