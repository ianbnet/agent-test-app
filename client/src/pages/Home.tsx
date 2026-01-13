import { useCounter, useIncrementCounter } from "@/hooks/use-counter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data, isLoading, error } = useCounter();
  const increment = useIncrementCounter();

  const handleClick = () => {
    increment.mutate();
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#ec4899', '#f97316', '#06b6d4'],
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatedBackground />

      <motion.main
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card w-full max-w-lg rounded-3xl p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-orange-500" />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-black text-gradient mb-6 leading-tight">
            Hello Ian
          </h1>
          <p className="text-xl text-muted-foreground font-medium mb-12">
            Welcome to your awesome dashboard
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="text-sm font-bold uppercase tracking-widest text-primary/60 mb-2">
              Current Count
            </div>
            
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-24 flex items-center justify-center"
                >
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </motion.div>
              ) : error ? (
                <div className="text-destructive font-medium">Error loading count</div>
              ) : (
                <motion.div
                  key={data?.count}
                  initial={{ y: 20, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-8xl font-black text-foreground tabular-nums"
                >
                  {data?.count ?? 0}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            disabled={increment.isPending}
            className="
              relative group overflow-hidden
              px-10 py-5 rounded-2xl font-bold text-xl text-white
              bg-gradient-to-r from-primary to-accent
              shadow-lg shadow-primary/30
              hover:shadow-xl hover:shadow-primary/40
              transition-all duration-300
              disabled:opacity-70 disabled:cursor-not-allowed
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              {increment.isPending && <Loader2 className="w-5 h-5 animate-spin" />}
              {increment.isPending ? "Updating..." : "Click Me!"}
            </span>
            
            {/* Shiny effect overlay */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </motion.button>
        </div>
      </motion.main>
    </div>
  );
}
