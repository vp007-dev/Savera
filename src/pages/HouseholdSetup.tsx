import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  ArrowLeft,
  ArrowRight,
  Users,
  Zap,
  Droplets,
  Check,
  SkipForward
} from "lucide-react";

const HouseholdSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [householdSize, setHouseholdSize] = useState<number | null>(null);
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
  const [selectedFixtures, setSelectedFixtures] = useState<string[]>([]);

  const householdSizes = [
    { value: 1, label: "1 Person", icon: "👤" },
    { value: 2, label: "2 People", icon: "👥" },
    { value: 3, label: "3-4 People", icon: "👨‍👩‍👧" },
    { value: 4, label: "5+ People", icon: "👨‍👩‍👧‍👦" },
  ];

  const appliances = [
    { id: "ac", label: "Air Conditioner", icon: "❄️", wattage: "1500W" },
    { id: "fridge", label: "Refrigerator", icon: "🧊", wattage: "150W" },
    { id: "heater", label: "Water Heater", icon: "🔥", wattage: "2000W" },
    { id: "washer", label: "Washing Machine", icon: "🧺", wattage: "500W" },
    { id: "dryer", label: "Dryer", icon: "💨", wattage: "3000W" },
    { id: "tv", label: "Television", icon: "📺", wattage: "100W" },
    { id: "microwave", label: "Microwave", icon: "🍳", wattage: "1200W" },
    { id: "dishwasher", label: "Dishwasher", icon: "🍽️", wattage: "1800W" },
  ];

  const fixtures = [
    { id: "shower", label: "Shower", icon: "🚿", usage: "65L/use" },
    { id: "bathtub", label: "Bathtub", icon: "🛁", usage: "150L/use" },
    { id: "toilet", label: "Toilet", icon: "🚽", usage: "6L/flush" },
    { id: "sink", label: "Kitchen Sink", icon: "🚰", usage: "8L/min" },
    { id: "garden", label: "Garden/Lawn", icon: "🌿", usage: "Variable" },
    { id: "pool", label: "Pool", icon: "🏊", usage: "High" },
  ];

  const toggleAppliance = (id: string) => {
    setSelectedAppliances(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleFixture = (id: string) => {
    setSelectedFixtures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/utility-input");
    }
  };

  const handleSkip = () => {
    navigate("/utility-input");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate("/auth")}
          className="w-10 h-10 rounded-xl glass flex items-center justify-center active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-foreground">SAVERA</span>
        </div>
        <button 
          onClick={handleSkip}
          className="text-sm text-muted-foreground flex items-center gap-1"
        >
          Skip
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Progress */}
      <div className="px-4 mb-6">
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Step {step} of 3
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Household Size</h1>
                <p className="text-sm text-muted-foreground">How many people live in your home?</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {householdSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setHouseholdSize(size.value)}
                  className={`p-4 rounded-2xl glass text-left transition-all active:scale-[0.98] ${
                    householdSize === size.value 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : ''
                  }`}
                >
                  <span className="text-3xl">{size.icon}</span>
                  <p className="text-sm font-medium text-foreground mt-2">{size.label}</p>
                  {householdSize === size.value && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground">
                💡 This helps us benchmark your usage against similar households and provide personalized recommendations.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-energy/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-energy-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Appliances</h1>
                <p className="text-sm text-muted-foreground">Select your electrical appliances</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {appliances.map((appliance) => (
                <button
                  key={appliance.id}
                  onClick={() => toggleAppliance(appliance.id)}
                  className={`relative p-3 rounded-xl glass text-left transition-all active:scale-[0.98] ${
                    selectedAppliances.includes(appliance.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : ''
                  }`}
                >
                  <span className="text-2xl">{appliance.icon}</span>
                  <p className="text-xs font-medium text-foreground mt-1.5">{appliance.label}</p>
                  <p className="text-[10px] text-muted-foreground">{appliance.wattage}</p>
                  {selectedAppliances.includes(appliance.id) && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Selected: {selectedAppliances.length} appliances
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-water/20 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-water-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Water Fixtures</h1>
                <p className="text-sm text-muted-foreground">Select your water usage points</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {fixtures.map((fixture) => (
                <button
                  key={fixture.id}
                  onClick={() => toggleFixture(fixture.id)}
                  className={`relative p-3 rounded-xl glass text-left transition-all active:scale-[0.98] ${
                    selectedFixtures.includes(fixture.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : ''
                  }`}
                >
                  <span className="text-2xl">{fixture.icon}</span>
                  <p className="text-xs font-medium text-foreground mt-1.5">{fixture.label}</p>
                  <p className="text-[10px] text-muted-foreground">{fixture.usage}</p>
                  {selectedFixtures.includes(fixture.id) && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Selected: {selectedFixtures.length} fixtures
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-auto pt-6">
          <Button 
            onClick={handleNext}
            className="w-full h-12 rounded-xl text-base font-semibold"
          >
            {step === 3 ? "Continue to Bill Input" : "Next"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HouseholdSetup;
