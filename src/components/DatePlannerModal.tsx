import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DatePlannerModalProps {
  isOpen: boolean;
  onSelect: (choice: string) => void;
}

const dateOptions = [
  { id: "dinner", emoji: "🍽️", label: "Candlelight Dinner", color: "from-amber-400 to-orange-500" },
  { id: "movie", emoji: "🎬", label: "Movie Night", color: "from-purple-400 to-pink-500" },
  { id: "drive", emoji: "🚗", label: "Long Drive", color: "from-blue-400 to-cyan-500" },
  { id: "surprise", emoji: "🎁", label: "Surprise Me!", color: "from-pink-400 to-rose-500" },
];

const DatePlannerModal = ({ isOpen, onSelect }: DatePlannerModalProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      setIsConfirming(true);
      const option = dateOptions.find((o) => o.id === selectedOption);
      setTimeout(() => {
        onSelect(option?.label || selectedOption);
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative card-glass p-6 md:p-8 max-w-lg w-full"
          >
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2"
            >
              How should we celebrate? 💕
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-muted-foreground mb-6"
            >
              Pick your perfect Valentine's date!
            </motion.p>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
              {dateOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => handleSelect(option.id)}
                  className={`date-option-card flex flex-col items-center gap-2 py-5 ${
                    selectedOption === option.id ? "selected" : ""
                  }`}
                >
                  <motion.span
                    className="text-4xl md:text-5xl"
                    animate={
                      selectedOption === option.id
                        ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {option.emoji}
                  </motion.span>
                  <span className="font-semibold text-sm md:text-base text-foreground text-center">
                    {option.label}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedOption ? 1 : 0.5 }}
              onClick={handleConfirm}
              disabled={!selectedOption || isConfirming}
              className="w-full btn-yes py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={selectedOption ? { scale: 1.02 } : {}}
              whileTap={selectedOption ? { scale: 0.98 } : {}}
            >
              {isConfirming ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    💌
                  </motion.span>
                  Sending...
                </span>
              ) : (
                "Let's Go! 💖"
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DatePlannerModal;
