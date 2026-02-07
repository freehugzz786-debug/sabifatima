import FloatingHearts from "@/components/FloatingHearts";
import ValentineCard from "@/components/ValentineCard";
import ValentineElements from "@/components/ValentineElements";
import HeartCursorTrail from "@/components/HeartCursorTrail";
import SoundToggle from "@/components/SoundToggle";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden animated-gradient-bg">
      {/* Sound Toggle */}
      <SoundToggle />
      
      {/* Background Elements */}
      <FloatingHearts />
      <ValentineElements />
      
      {/* Cursor Trail */}
      <HeartCursorTrail />
      
      {/* Main Content */}
      <ValentineCard />
    </div>
  );
};

export default Index;
