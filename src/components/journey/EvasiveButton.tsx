import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface EvasiveButtonProps {
  children: React.ReactNode;
}

const EvasiveButton = ({ children }: EvasiveButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isEvading = useRef(false);

  const evade = useCallback(() => {
    if (isEvading.current) return;
    isEvading.current = true;

    const button = buttonRef.current;
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const parentRect = button.parentElement?.getBoundingClientRect();
    
    if (!parentRect) return;

    // Calculate safe boundaries
    const maxX = window.innerWidth - buttonRect.width - 40;
    const maxY = window.innerHeight - buttonRect.height - 40;
    const minX = -parentRect.left + 40;
    const minY = -parentRect.top + 40;

    // Generate random position away from current
    let newX = position.x + (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 150);
    let newY = position.y + (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 100);

    // Clamp to boundaries
    newX = Math.max(minX, Math.min(maxX - parentRect.left, newX));
    newY = Math.max(minY, Math.min(maxY - parentRect.top, newY));

    setPosition({ x: newX, y: newY });

    setTimeout(() => {
      isEvading.current = false;
    }, 100);
  }, [position]);

  const handleInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    evade();
  }, [evade]);

  return (
    <motion.button
      ref={buttonRef}
      className="btn-no px-6 py-3 text-muted-foreground select-none"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
      onClick={handleInteraction}
      whileHover={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default EvasiveButton;
