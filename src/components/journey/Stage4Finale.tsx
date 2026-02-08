import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import EvasiveButton from "./EvasiveButton";
import DatePlannerModal from "../DatePlannerModal";

const Stage4Finale = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateConfirmed, setDateConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const triggerConfetti = useCallback(() => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 35, spread: 360, ticks: 80, zIndex: 100 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 60 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff6b8a", "#ff85a1", "#ffa7b8", "#ffccd5", "#ff4d6d", "#e879f9", "#f0abfc", "#ffd700"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff6b8a", "#ff85a1", "#ffa7b8", "#ffccd5", "#ff4d6d", "#e879f9", "#f0abfc", "#ffd700"],
      });
    }, 200);
  }, []);

  const handleYes = () => {
    triggerConfetti();
    setShowDatePicker(true);
  };

  const handleDateSelect = (choice: string) => {
    setSelectedDate(choice);
    setDateConfirmed(true);
    setShowDatePicker(false);
    
    triggerConfetti();
    
    const subject = encodeURIComponent(`She said YES! + ${choice}`);
    const body = encodeURIComponent(`Get ready for a ${choice}! 💕🎉`);
    window.location.href = `mailto:zeyazaid@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <AnimatePresence mode="wait">
        {!dateConfirmed ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="card-romantic max-w-md w-full text-center"
          >
            {/* Grand display with balloons */}
            <motion.div
              className="mb-6 flex justify-center gap-4 text-5xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {["🎈", "💐", "🎀", "💐", "🎈"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, i % 2 === 0 ? 10 : -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>

            {/* The Big Question */}
            <motion.h1
              className="text-3xl md:text-4xl font-extrabold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Will you be my{" "}
              <motion.span 
                className="text-primary inline-block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Valentine
              </motion.span>
              ? 💕
            </motion.h1>

            <motion.p
              className="font-handwritten text-2xl text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              You made it this far... it's destiny! ✨
            </motion.p>

            {/* Giant Yes Button and Evasive No */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={handleYes}
                className="btn-yes px-12 py-6 text-2xl font-bold"
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 0 60px hsl(350 80% 55% / 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(350 80% 55% / 0.3)",
                    "0 0 40px hsl(350 80% 55% / 0.5)",
                    "0 0 20px hsl(350 80% 55% / 0.3)",
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              >
                YES! I will! 💖
              </motion.button>

              <EvasiveButton>No way! 💔</EvasiveButton>
            </motion.div>

            {/* Floating hearts around card */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl pointer-events-none"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                💕
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-romantic max-w-md w-full text-center"
          >
            {/* Celebration */}
            <motion.div
              className="mb-6 text-6xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              🎉
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-primary mb-4"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              I knew you would say yes!
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-foreground font-bold mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              See you soon! ❤️
            </motion.p>

            <motion.p
              className="text-lg font-handwritten text-primary"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Get ready for: {selectedDate} 🥰
            </motion.p>

            <motion.div
              className="mt-8 flex justify-center gap-2 text-4xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              {["💕", "💖", "💗", "💝", "💘"].map((heart, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                >
                  {heart}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DatePlannerModal isOpen={showDatePicker} onSelect={handleDateSelect} />
    </div>
  );
};

export default Stage4Finale;
