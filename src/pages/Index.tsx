import FloatingHearts from "@/components/FloatingHearts";
import ValentineElements from "@/components/ValentineElements";
import HeartCursorTrail from "@/components/HeartCursorTrail";
import SoundToggle from "@/components/SoundToggle";
import JourneyController from "@/components/journey/JourneyController";

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
      
      {/* Main Content - Multi-Stage Journey */}
      <JourneyController />
    </div>
  );
};

export default Index;
