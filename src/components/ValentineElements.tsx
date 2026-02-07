import { motion } from "framer-motion";

const elements = [
  { emoji: "🧸", size: 40, x: "10%", duration: 20 },
  { emoji: "🌹", size: 35, x: "85%", duration: 18 },
  { emoji: "🍫", size: 32, x: "25%", duration: 22 },
  { emoji: "💐", size: 38, x: "70%", duration: 25 },
  { emoji: "🎁", size: 36, x: "50%", duration: 19 },
  { emoji: "💌", size: 30, x: "15%", duration: 23 },
  { emoji: "🥰", size: 28, x: "90%", duration: 21 },
];

const ValentineElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: el.x,
            fontSize: `${el.size}px`,
            opacity: 0.4,
          }}
          initial={{ y: "110vh", rotate: 0 }}
          animate={{
            y: "-10vh",
            rotate: [0, 15, -15, 10, -10, 0],
          }}
          transition={{
            y: {
              duration: el.duration,
              repeat: Infinity,
              ease: "linear",
              delay: index * 2,
            },
            rotate: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default ValentineElements;
