import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const heartEmojis = ["❤️", "💕", "💗", "💖", "💘", "✨"];

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: Heart[] = [];
      for (let i = 0; i < 20; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          size: Math.random() * 18 + 14,
          duration: Math.random() * 10 + 12,
          delay: Math.random() * 12,
          emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            opacity: 0.25,
          }}
          initial={{ y: "100vh", opacity: 0, rotate: 0, scale: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.3, 0.3, 0],
            rotate: 360,
            scale: [0, 1, 1, 0.5],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
