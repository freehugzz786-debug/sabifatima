import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EvasiveButton from "./EvasiveButton";

interface Stage2AdventureProps {
  onComplete: () => void;
}

const Stage2Adventure = ({ onComplete }: Stage2AdventureProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleYes = () => {
    setIsOpening(true);
    setTimeout(onComplete, 1500);
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
            {/* Whimsical Door */}
            <motion.div
              className="relative w-48 h-72 mb-8"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Door frame */}
              <div className="absolute inset-0 bg-gradient-to-b from-deep-rose to-primary rounded-t-[100px] shadow-xl">
                {/* Door panel */}
                <div className="absolute inset-2 bg-gradient-to-br from-rose to-blush rounded-t-[90px] flex flex-col items-center justify-center">
                  {/* Door handle */}
                  <motion.div 
                    className="absolute right-4 top-1/2 w-4 h-8 bg-yellow-400 rounded-full shadow-md"
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Heart window */}
                  <div className="text-5xl mb-4">🚪</div>
                  {/* Light from behind */}
                  <motion.div
                    className="absolute inset-4 rounded-t-[80px] opacity-30"
                    style={{
                      background: "radial-gradient(ellipse at center, hsl(45 100% 70%) 0%, transparent 70%)"
                    }}
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Magical sparkles around door */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-lg"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: i % 2 === 0 ? "-20px" : "calc(100% + 5px)",
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  ⭐
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
              Are you ready to see where we go next?
            </motion.h2>

            <motion.p
              className="text-muted-foreground font-handwritten text-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              A magical adventure awaits... ✨
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
                Open the door! 🚪
              </motion.button>

              <EvasiveButton>Maybe later...</EvasiveButton>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="opening"
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Door Opening Animation */}
            <div className="relative w-48 h-72 perspective-1000">
              {/* Door frame */}
              <div className="absolute inset-0 bg-gradient-to-b from-deep-rose to-primary rounded-t-[100px] shadow-xl overflow-hidden">
                {/* Light flooding out */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(ellipse at center, hsl(45 100% 85%) 0%, hsl(350 80% 95%) 100%)"
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Door swinging open */}
                <motion.div
                  className="absolute inset-2 bg-gradient-to-br from-rose to-blush rounded-t-[90px] origin-left"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -110 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute right-4 top-1/2 w-4 h-8 bg-yellow-400 rounded-full shadow-md" />
                </motion.div>

                {/* Silhouette or pathway inside */}
                <motion.div
                  className="absolute inset-8 flex items-center justify-center text-6xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  🌟
                </motion.div>
              </div>
            </div>

            {/* Light rays */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-32 bg-gradient-to-t from-transparent to-yellow-200"
                style={{
                  top: "20%",
                  left: "50%",
                  transformOrigin: "bottom center",
                  rotate: `${(i - 6) * 15}deg`,
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 0.6, scaleY: 1 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stage2Adventure;
