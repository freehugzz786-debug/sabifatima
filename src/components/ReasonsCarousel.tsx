import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reasons = [
  "You bring light to my days ✨",
  "My favorite notification 📱💕",
  "The reason I smile 😊",
  "My heart's favorite person 💗",
  "Every moment with you is magic ✨",
];

const ReasonsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reasons.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6 h-16 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: 90 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.4, 0, 0.2, 1] 
          }}
          className="font-handwritten text-2xl md:text-3xl text-primary text-center px-4"
          style={{ 
            textShadow: "0 2px 10px rgba(200, 100, 120, 0.2)" 
          }}
        >
          "{reasons[currentIndex]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default ReasonsCarousel;
