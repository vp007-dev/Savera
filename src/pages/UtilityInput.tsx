import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Leaf, 
  ArrowLeft,
  ArrowRight,
  Upload,
  Camera,
  FileText,
  Zap,
  Droplets,
  Check,
  AlertCircle,
  Sparkles,
  Edit3
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const UtilityInput = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [uploadMethod, setUploadMethod] = useState<"upload" | "manual" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    electricity: { units: number; amount: number; confidence: number };
    water: { units: number; amount: number; confidence: number };
  } | null>(null);
  const [manualData, setManualData] = useState({
    electricityUnits: "",
    electricityAmount: "",
    waterUnits: "",
    waterAmount: "",
  });

  const handleFileUpload = (type: "electricity" | "water") => {
    setIsProcessing(true);
    // Simulate AI extraction
    setTimeout(() => {
      setExtractedData({
        electricity: { units: 285, amount: 2840, confidence: 94 },
        water: { units: 15000, amount: 1250, confidence: 91 },
      });
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  const handleConfirm = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate("/household-setup")}
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
        <div className="w-10" />
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
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Add Your Bills</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Upload your utility bills or enter data manually
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => { setUploadMethod("upload"); setStep(2); }}
                className="w-full p-4 rounded-2xl glass flex items-center gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-medium text-foreground">Upload Bill</p>
                  <p className="text-xs text-muted-foreground">PDF or image of your bill</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-medium text-primary">AI Extract</span>
                </div>
              </button>

              <button
                onClick={() => { setUploadMethod("upload"); setStep(2); }}
                className="w-full p-4 rounded-2xl glass flex items-center gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-medium text-foreground">Take Photo</p>
                  <p className="text-xs text-muted-foreground">Scan your bill with camera</p>
                </div>
              </button>

              <button
                onClick={() => { setUploadMethod("manual"); setStep(2); }}
                className="w-full p-4 rounded-2xl glass flex items-center gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-medium text-foreground">Manual Entry</p>
                  <p className="text-xs text-muted-foreground">Enter values yourself</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 2 && uploadMethod === "upload" && (
          <div className="animate-fade-in">
            {isProcessing ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground mb-2">Processing Bill</h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  AI is extracting your usage data...
                </p>
                <Progress value={66} className="w-48 h-2" />
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold text-foreground mb-6">Upload Bills</h1>
                
                <div className="space-y-4">
                  {/* Electricity Bill Upload */}
                  <div className="p-4 rounded-2xl glass">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-energy/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-energy-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Electricity Bill</p>
                        <p className="text-xs text-muted-foreground">PDF, JPG, or PNG</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFileUpload("electricity")}
                      className="w-full p-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Tap to upload</span>
                    </button>
                  </div>

                  {/* Water Bill Upload */}
                  <div className="p-4 rounded-2xl glass">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-water/20 flex items-center justify-center">
                        <Droplets className="w-5 h-5 text-water-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Water Bill</p>
                        <p className="text-xs text-muted-foreground">PDF, JPG, or PNG</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFileUpload("water")}
                      className="w-full p-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Tap to upload</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {step === 2 && uploadMethod === "manual" && (
          <div className="animate-fade-in">
            <h1 className="text-xl font-bold text-foreground mb-6">Enter Bill Details</h1>
            
            <div className="space-y-4">
              {/* Electricity */}
              <div className="p-4 rounded-2xl glass">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-energy/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-energy-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Electricity</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Units (kWh)</label>
                    <Input
                      type="number"
                      placeholder="285"
                      value={manualData.electricityUnits}
                      onChange={(e) => setManualData({ ...manualData, electricityUnits: e.target.value })}
                      className="mt-1 h-11 rounded-xl glass border-0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder="2840"
                      value={manualData.electricityAmount}
                      onChange={(e) => setManualData({ ...manualData, electricityAmount: e.target.value })}
                      className="mt-1 h-11 rounded-xl glass border-0"
                    />
                  </div>
                </div>
              </div>

              {/* Water */}
              <div className="p-4 rounded-2xl glass">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-water/20 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-water-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Water</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Units (L)</label>
                    <Input
                      type="number"
                      placeholder="15000"
                      value={manualData.waterUnits}
                      onChange={(e) => setManualData({ ...manualData, waterUnits: e.target.value })}
                      className="mt-1 h-11 rounded-xl glass border-0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder="1250"
                      value={manualData.waterAmount}
                      onChange={(e) => setManualData({ ...manualData, waterAmount: e.target.value })}
                      className="mt-1 h-11 rounded-xl glass border-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Button 
                onClick={() => {
                  setExtractedData({
                    electricity: { 
                      units: parseInt(manualData.electricityUnits) || 285, 
                      amount: parseInt(manualData.electricityAmount) || 2840, 
                      confidence: 100 
                    },
                    water: { 
                      units: parseInt(manualData.waterUnits) || 15000, 
                      amount: parseInt(manualData.waterAmount) || 1250, 
                      confidence: 100 
                    },
                  });
                  setStep(3);
                }}
                className="w-full h-12 rounded-xl text-base font-semibold"
              >
                Review Data
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && extractedData && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Confirm Your Data</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Review and edit if needed
              </p>
            </div>

            <div className="space-y-4">
              {/* Electricity Summary */}
              <div className="p-4 rounded-2xl glass">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-energy-foreground" />
                    <span className="text-sm font-medium text-foreground">Electricity</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10">
                    <span className="text-[10px] font-medium text-success">
                      {extractedData.electricity.confidence}% confident
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Units</p>
                    <p className="text-lg font-bold text-foreground">{extractedData.electricity.units} kWh</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="text-lg font-bold text-foreground">₹{extractedData.electricity.amount}</p>
                  </div>
                </div>
              </div>

              {/* Water Summary */}
              <div className="p-4 rounded-2xl glass">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-water-foreground" />
                    <span className="text-sm font-medium text-foreground">Water</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10">
                    <span className="text-[10px] font-medium text-success">
                      {extractedData.water.confidence}% confident
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Usage</p>
                    <p className="text-lg font-bold text-foreground">{extractedData.water.units.toLocaleString()} L</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="text-lg font-bold text-foreground">₹{extractedData.water.amount}</p>
                  </div>
                </div>
              </div>

              {/* AI Notice */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
                <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Values are AI-estimated from your bill. Tap any field to edit if needed.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Button 
                onClick={handleConfirm}
                className="w-full h-12 rounded-xl text-base font-semibold"
              >
                Confirm & View Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtilityInput;
