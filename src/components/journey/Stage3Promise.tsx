import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EvasiveButton from "./EvasiveButton";

interface Stage3PromiseProps {
  onComplete: () => void;
}

const Stage3Promise = ({ onComplete }: Stage3PromiseProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleYes = () => {
    setIsOpening(true);
    setTimeout(onComplete, 1800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <AnimatePresence mode="wait">
        {!isOpening ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Treasure Box */}
            <motion.div
              className="relative w-56 h-44 mb-8"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Box base */}
              <div className="absolute bottom-0 w-full h-28 bg-gradient-to-b from-rose to-deep-rose rounded-xl shadow-xl">
                {/* Gold trim */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 rounded-t-xl" />
                {/* Heart decoration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-4xl"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    💎
                  </motion.span>
                </div>
              </div>

              {/* Box lid */}
              <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-blush to-rose rounded-t-2xl shadow-lg origin-bottom">
                {/* Gold trim on lid */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300" />
                {/* Clasp */}
                <motion.div
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full shadow-md flex items-center justify-center text-sm"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🔒
                </motion.div>
              </div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  boxShadow: "0 0 40px hsl(350 80% 60% / 0.4)",
                }}
                animate={{ 
                  boxShadow: [
                    "0 0 40px hsl(350 80% 60% / 0.4)",
                    "0 0 60px hsl(350 80% 60% / 0.6)",
                    "0 0 40px hsl(350 80% 60% / 0.4)"
                  ] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Floating sparkles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xl"
                  style={{
                    top: `${-10 + Math.random() * 120}%`,
                    left: `${-10 + Math.random() * 120}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, -20, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </motion.div>

            {/* Question */}
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Trust me?
            </motion.h2>

            <motion.p
              className="text-muted-foreground font-handwritten text-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Something special is inside... 💝
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                onClick={handleYes}
                className="btn-yes px-8 py-4 text-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(350 80% 55% / 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                I trust you! 💎
              </motion.button>

              <EvasiveButton>I'm scared...</EvasiveButton>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="opening"
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Box Opening Animation */}
            <div className="relative w-56 h-44">
              {/* Box base */}
              <div className="absolute bottom-0 w-full h-28 bg-gradient-to-b from-rose to-deep-rose rounded-xl shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 rounded-t-xl" />
                
                {/* Ring/treasure inside */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-5xl"
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -60, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                >
                  💍
                </motion.div>
              </div>

              {/* Lid opening */}
              <motion.div
                className="absolute top-0 w-full h-20 bg-gradient-to-b from-blush to-rose rounded-t-2xl shadow-lg origin-bottom"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: -120 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300" />
              </motion.div>
            </div>

            {/* Explosion of hearts and sparkles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{ 
                  top: "30%",
                  left: "50%",
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 300 - 100,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  delay: 0.6 + i * 0.05,
                  duration: 1.2,
                  ease: "easeOut",
                }}
              >
                {["💕", "💖", "✨", "💗", "⭐", "💝"][i % 6]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stage3Promise;
