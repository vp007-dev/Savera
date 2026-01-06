import { memo } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Impact from "@/components/landing/Impact";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import { useNavigate } from "react-router-dom";

const Landing = memo(() => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/auth");
  };
  
  const handleViewDemo = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <HowItWorks />
      <Impact />
      <Pricing onGetStarted={handleGetStarted} />
      <Footer />
    </div>
  );
});

Landing.displayName = "Landing";

export default Landing;
