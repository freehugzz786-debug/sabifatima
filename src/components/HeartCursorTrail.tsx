import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

const heartEmojis = ["💕", "💗", "💖", "❤️", "💘", "✨"];

const HeartCursorTrail = () => {
  const [hearts, setHearts] = useState<TrailHeart[]>([]);

  const addHeart = useCallback((x: number, y: number) => {
    const newHeart: TrailHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 12 + 10,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    };

    setHearts((prev) => [...prev.slice(-15), newHeart]);
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const throttleMs = 50;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > throttleMs) {
        addHeart(e.clientX, e.clientY);
        lastTime = now;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTime > throttleMs && e.touches[0]) {
        addHeart(e.touches[0].clientX, e.touches[0].clientY);
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [addHeart]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts((prev) => prev.slice(1));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="heart-trail">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 1, 
              scale: 1, 
              x: heart.x - heart.size / 2, 
              y: heart.y - heart.size / 2 
            }}
            animate={{ 
              opacity: 0, 
              scale: 0.3, 
              y: heart.y - heart.size / 2 - 30 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "fixed",
              fontSize: `${heart.size}px`,
              pointerEvents: "none",
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeartCursorTrail;
