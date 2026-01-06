import { memo } from "react";
import { Upload, BarChart3, Lightbulb, TrendingDown } from "lucide-react";
import { useScrollFade, useParallax } from "@/hooks/use-parallax";

const steps = [
  {
    number: "1",
    icon: Upload,
    title: "Upload Bills",
    description: "PDF, image, or manual entry. Takes 5 minutes.",
  },
  {
    number: "2",
    icon: BarChart3,
    title: "See Breakdown",
    description: "Appliance & fixture level cost analysis.",
  },
  {
    number: "3",
    icon: Lightbulb,
    title: "Get Tips",
    description: "AI-powered personalized recommendations.",
  },
  {
    number: "4",
    icon: TrendingDown,
    title: "Track Savings",
    description: "Watch savings grow, earn badges.",
  }
];

const StepCard = memo(({ step, index }: { step: typeof steps[0]; index: number }) => (
  <div 
    className="flex items-start gap-4 p-4 rounded-2xl glass-strong"
    style={{ 
      animationDelay: `${index * 60}ms`,
      animation: 'fade-in 0.2s ease-out forwards'
    }}
  >
    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
      {step.number}
    </div>
    <div className="flex-1 pt-1">
      <h3 className="text-base font-semibold text-foreground mb-1">
        {step.title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {step.description}
      </p>
    </div>
    <step.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
  </div>
));

StepCard.displayName = "StepCard";

const HowItWorks = memo(() => {
  const { opacity, translateY, elementRef } = useScrollFade();
  const { offset, elementRef: parallaxRef } = useParallax(0.1);

  return (
    <section className="py-16 px-4 bg-muted/30 relative overflow-hidden" id="how-it-works">
      {/* Parallax background element */}
      <div 
        ref={parallaxRef}
        className="absolute right-0 top-0 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none"
        style={{ transform: `translateY(${offset}px)` }}
      />
      
      <div 
        ref={elementRef}
        className="container max-w-lg mx-auto relative z-10"
        style={{ 
          opacity, 
          transform: `translateY(${translateY}px)`,
          transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
        }}
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            How It Works
          </h2>
          <p className="text-sm text-muted-foreground">
            Start saving in 5 minutes
          </p>
        </div>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

HowItWorks.displayName = "HowItWorks";

export default HowItWorks;
