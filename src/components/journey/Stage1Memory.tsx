import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EvasiveButton from "./EvasiveButton";

interface Stage1MemoryProps {
  onComplete: () => void;
}

const Stage1Memory = ({ onComplete }: Stage1MemoryProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleYes = () => {
    setIsOpening(true);
    setTimeout(onComplete, 1200);
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
            {/* Closed Envelope */}
            <motion.div
              className="relative w-64 h-48 mb-8 cursor-pointer"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Envelope body */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose to-primary rounded-lg shadow-lg overflow-hidden">
                {/* Envelope flap */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-blush to-rose"
                  style={{
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                    transformOrigin: "top center",
                  }}
                />
                {/* Heart seal */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💌
                </motion.div>
              </div>
              {/* Sparkles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xl"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
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
              Do you remember our first adventure?
            </motion.h2>

            <motion.p
              className="text-muted-foreground font-handwritten text-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Open this letter to find out... 💕
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
                Yes, I remember! 💖
              </motion.button>

              <EvasiveButton>No 😢</EvasiveButton>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="opening"
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Opening Envelope Animation */}
            <motion.div className="relative w-64 h-48">
              {/* Envelope body */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose to-primary rounded-lg shadow-lg overflow-hidden">
                {/* Flap opening */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-blush to-rose origin-top"
                  style={{
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  }}
                  animate={{ rotateX: 180 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                {/* Letter coming out */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-white rounded-t-lg shadow-md flex items-center justify-center"
                  initial={{ y: 0 }}
                  animate={{ y: -100 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                >
                  <span className="text-3xl">💝</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating hearts */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ 
                  opacity: 0, 
                  x: 0, 
                  y: 0,
                  scale: 0 
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: -150 - Math.random() * 100,
                  scale: [0, 1.2, 0.8]
                }}
                transition={{ 
                  delay: 0.5 + i * 0.1,
                  duration: 1
                }}
              >
                💕
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stage1Memory;
