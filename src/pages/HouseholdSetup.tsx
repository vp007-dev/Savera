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
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-1/3 xl:w-1/4 bg-primary/5 border-r border-border flex-col p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-xl text-foreground">SAVERA</span>
        </div>
        
        <div className="space-y-4 flex-1">
          {[
            { num: 1, title: "Household Size", desc: "Number of residents", icon: Users },
            { num: 2, title: "Appliances", desc: "Electrical devices", icon: Zap },
            { num: 3, title: "Water Fixtures", desc: "Water usage points", icon: Droplets },
          ].map((s) => (
            <div 
              key={s.num}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                s.num === step 
                  ? 'bg-primary/10 border border-primary/30' 
                  : s.num < step 
                    ? 'opacity-60' 
                    : 'opacity-40'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                s.num < step ? 'bg-primary' : s.num === step ? 'bg-primary/20' : 'bg-muted'
              }`}>
                {s.num < step ? (
                  <Check className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <s.icon className={`w-5 h-5 ${s.num === step ? 'text-primary' : 'text-muted-foreground'}`} />
                )}
              </div>
              <div>
                <p className={`font-medium ${s.num === step ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.title}
                </p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm text-muted-foreground">
            💡 This information helps us provide personalized recommendations for your household.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:overflow-auto">
        {/* Mobile Header */}
        <div className="p-4 lg:p-6 flex items-center justify-between lg:border-b lg:border-border">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : navigate("/auth")}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-foreground">SAVERA</span>
          </div>
          <button 
            onClick={handleSkip}
            className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
          >
            Skip
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Progress */}
        <div className="px-4 mb-6 lg:hidden">
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
        <div className="flex-1 p-4 lg:p-8 lg:max-w-4xl lg:mx-auto lg:w-full flex flex-col">
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6 lg:mb-8">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-foreground">Household Size</h1>
                  <p className="text-sm lg:text-base text-muted-foreground">How many people live in your home?</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {householdSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setHouseholdSize(size.value)}
                    className={`relative p-4 lg:p-6 rounded-2xl glass text-left transition-all active:scale-[0.98] hover:bg-primary/5 ${
                      householdSize === size.value 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : ''
                    }`}
                  >
                    <span className="text-3xl lg:text-4xl">{size.icon}</span>
                    <p className="text-sm lg:text-base font-medium text-foreground mt-2">{size.label}</p>
                    {householdSize === size.value && (
                      <div className="absolute top-2 right-2 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 lg:w-4 lg:h-4 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 lg:hidden">
                <p className="text-xs text-muted-foreground">
                  💡 This helps us benchmark your usage against similar households and provide personalized recommendations.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6 lg:mb-8">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-energy/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 lg:w-7 lg:h-7 text-energy-foreground" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-foreground">Appliances</h1>
                  <p className="text-sm lg:text-base text-muted-foreground">Select your electrical appliances</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {appliances.map((appliance) => (
                  <button
                    key={appliance.id}
                    onClick={() => toggleAppliance(appliance.id)}
                    className={`relative p-3 lg:p-4 rounded-xl glass text-left transition-all active:scale-[0.98] hover:bg-primary/5 ${
                      selectedAppliances.includes(appliance.id) 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : ''
                    }`}
                  >
                    <span className="text-2xl lg:text-3xl">{appliance.icon}</span>
                    <p className="text-xs lg:text-sm font-medium text-foreground mt-1.5">{appliance.label}</p>
                    <p className="text-[10px] lg:text-xs text-muted-foreground">{appliance.wattage}</p>
                    {selectedAppliances.includes(appliance.id) && (
                      <div className="absolute top-2 right-2 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 lg:w-4 lg:h-4 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <p className="text-xs lg:text-sm text-muted-foreground text-center mt-4">
                Selected: {selectedAppliances.length} appliances
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6 lg:mb-8">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-water/20 flex items-center justify-center">
                  <Droplets className="w-6 h-6 lg:w-7 lg:h-7 text-water-foreground" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-foreground">Water Fixtures</h1>
                  <p className="text-sm lg:text-base text-muted-foreground">Select your water usage points</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                {fixtures.map((fixture) => (
                  <button
                    key={fixture.id}
                    onClick={() => toggleFixture(fixture.id)}
                    className={`relative p-3 lg:p-4 rounded-xl glass text-left transition-all active:scale-[0.98] hover:bg-primary/5 ${
                      selectedFixtures.includes(fixture.id) 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : ''
                    }`}
                  >
                    <span className="text-2xl lg:text-3xl">{fixture.icon}</span>
                    <p className="text-xs lg:text-sm font-medium text-foreground mt-1.5">{fixture.label}</p>
                    <p className="text-[10px] lg:text-xs text-muted-foreground">{fixture.usage}</p>
                    {selectedFixtures.includes(fixture.id) && (
                      <div className="absolute top-2 right-2 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 lg:w-4 lg:h-4 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <p className="text-xs lg:text-sm text-muted-foreground text-center mt-4">
                Selected: {selectedFixtures.length} fixtures
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-auto pt-6 lg:pt-8">
            <Button 
              onClick={handleNext}
              className="w-full lg:w-auto lg:px-12 h-12 rounded-xl text-base font-semibold lg:float-right"
            >
              {step === 3 ? "Continue to Bill Input" : "Next"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseholdSetup;
