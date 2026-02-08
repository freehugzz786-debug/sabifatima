import { motion } from "framer-motion";

interface StageTransitionProps {
  children: React.ReactNode;
  stage: number;
}

const StageTransition = ({ children, stage }: StageTransitionProps) => {
  return (
    <motion.div
      key={stage}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, y: -20 }}
      transition={{
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default StageTransition;
