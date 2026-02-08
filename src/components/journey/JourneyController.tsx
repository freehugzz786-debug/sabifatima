import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Stage1Memory from "./Stage1Memory";
import Stage2Adventure from "./Stage2Adventure";
import Stage3Promise from "./Stage3Promise";
import Stage4Finale from "./Stage4Finale";

const JourneyController = () => {
  const [currentStage, setCurrentStage] = useState(1);

  const advanceStage = () => {
    setCurrentStage((prev) => Math.min(prev + 1, 4));
  };

  // Progress indicator
  const stages = [
    { num: 1, label: "Memory" },
    { num: 2, label: "Adventure" },
    { num: 3, label: "Promise" },
    { num: 4, label: "Finale" },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center min-h-screen p-4">
      {/* Progress Indicator */}
      <motion.div 
        className="flex items-center gap-2 mt-6 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {stages.map((stage, index) => (
          <div key={stage.num} className="flex items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                currentStage >= stage.num
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-muted-foreground"
              }`}
              animate={{
                scale: currentStage === stage.num ? 1.2 : 1,
                boxShadow: currentStage === stage.num 
                  ? "0 0 20px hsl(350 80% 55% / 0.5)" 
                  : "none"
              }}
            >
              {currentStage > stage.num ? "✓" : stage.num}
            </motion.div>
            {index < stages.length - 1 && (
              <div 
                className={`w-8 md:w-12 h-1 mx-1 rounded transition-all duration-500 ${
                  currentStage > stage.num ? "bg-primary" : "bg-secondary"
                }`}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Stage Label */}
      <motion.p
        key={currentStage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-muted-foreground font-handwritten text-lg mb-4"
      >
        Chapter {currentStage}: {stages[currentStage - 1].label}
      </motion.p>

      {/* Stage Content */}
      <div className="flex-1 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {currentStage === 1 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Stage1Memory onComplete={advanceStage} />
            </motion.div>
          )}
          {currentStage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Stage2Adventure onComplete={advanceStage} />
            </motion.div>
          )}
          {currentStage === 3 && (
            <motion.div
              key="stage3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Stage3Promise onComplete={advanceStage} />
            </motion.div>
          )}
          {currentStage === 4 && (
            <motion.div
              key="stage4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Stage4Finale />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JourneyController;
