import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import ReasonsCarousel from "./ReasonsCarousel";
import DatePlannerModal from "./DatePlannerModal";

const noButtonPhrases = [
  "No",
  "Are you sure?",
  "Really? 🥺",
  "Think again!",
  "Please ban jao",
  "Don't do this!",
  "You're breaking my heart! 💔",
  "Last chance!",
  "Pretty pleaseee? 🙏",
  "I'll be sad forever 😢",
];

const sadGifs = [
  "https://media.giphy.com/media/BEob5qwFkSJ7G/giphy.gif",
  "https://media.giphy.com/media/W0c3xcZ3F1d0EYYb0f/giphy.gif",
  "https://media.giphy.com/media/OPU6wzx8JrHna/giphy.gif",
];

const happyGif = "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif";

const ValentineCard = () => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateConfirmed, setDateConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentGif, setCurrentGif] = useState(sadGifs[0]);

  const yesButtonScale = Math.min(1 + noClickCount * 0.25, 4);
  const noButtonPhrase = noButtonPhrases[Math.min(noClickCount, noButtonPhrases.length - 1)];

  const triggerConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff6b8a", "#ff85a1", "#ffa7b8", "#ffccd5", "#ff4d6d", "#e879f9", "#f0abfc"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff6b8a", "#ff85a1", "#ffa7b8", "#ffccd5", "#ff4d6d", "#e879f9", "#f0abfc"],
      });
    }, 250);
  }, []);

  const handleYesClick = () => {
    triggerConfetti();
    setShowDatePicker(true);
  };

  const handleDateSelect = (choice: string) => {
    setSelectedDate(choice);
    setDateConfirmed(true);
    setShowDatePicker(false);
    
    // Trigger another confetti burst
    triggerConfetti();
    
    // Trigger email notification with date choice
    const subject = encodeURIComponent(`She said YES! + ${choice}`);
    const body = encodeURIComponent(`Get ready for a ${choice}! 💕🎉`);
    window.location.href = `mailto:zeyazaid@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleNoClick = () => {
    setNoClickCount((prev) => prev + 1);
    setCurrentGif(sadGifs[(noClickCount + 1) % sadGifs.length]);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
      <AnimatePresence mode="wait">
        {!dateConfirmed ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="card-romantic max-w-md w-full text-center"
          >
            {/* Reasons Carousel */}
            <ReasonsCarousel />

            {/* Cute GIF */}
            <motion.div
              className="mb-6 rounded-2xl overflow-hidden mx-auto shadow-lg"
              style={{ maxWidth: "200px" }}
              animate={{ scale: noClickCount > 0 ? [1, 0.95, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={currentGif}
                alt="Cute reaction"
                className="w-full h-auto"
              />
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-3xl md:text-4xl font-extrabold text-foreground mb-8"
              animate={noClickCount > 3 ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              Will you be my{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text">
                Valentine
              </span>
              ? 💕
            </motion.h1>

            {/* Buttons Container */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Yes Button - Grows with each "No" click */}
              <motion.button
                onClick={handleYesClick}
                className="btn-yes px-8 py-4 text-lg"
                animate={{
                  scale: yesButtonScale,
                }}
                whileHover={{
                  scale: yesButtonScale * 1.05,
                  boxShadow: "0 0 50px hsl(350 80% 55% / 0.5)",
                }}
                whileTap={{
                  scale: yesButtonScale * 0.95,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{
                  zIndex: 10,
                }}
              >
                Yes! 💖
              </motion.button>

              {/* No Button - Changes text */}
              {noClickCount < noButtonPhrases.length - 1 && (
                <motion.button
                  onClick={handleNoClick}
                  className="btn-no px-6 py-3 text-muted-foreground"
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: Math.max(1 - noClickCount * 0.05, 0.6),
                    opacity: Math.max(1 - noClickCount * 0.1, 0.4),
                  }}
                >
                  {noButtonPhrase}
                </motion.button>
              )}
            </div>

            {/* Hint text after multiple no clicks */}
            {noClickCount >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-sm text-muted-foreground font-handwritten text-lg"
              >
                The Yes button is calling you... 👀
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-romantic max-w-md w-full text-center"
          >
            {/* Happy GIF */}
            <motion.div
              className="mb-6 rounded-2xl overflow-hidden mx-auto shadow-lg"
              style={{ maxWidth: "250px" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <img
                src={happyGif}
                alt="Happy celebration"
                className="w-full h-auto"
              />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-primary mb-4"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Yay! 🎉
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
                  animate={{
                    y: [0, -10, 0],
                  }}
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

      {/* Date Planner Modal */}
      <DatePlannerModal isOpen={showDatePicker} onSelect={handleDateSelect} />
    </div>
  );
};

export default ValentineCard;
