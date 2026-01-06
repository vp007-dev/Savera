import { useState } from "react";
import MobileLayout from "@/components/app/MobileLayout";
import { 
  FileText, 
  Download,
  Share2,
  Calendar,
  TrendingDown,
  Zap,
  Droplets,
  Leaf,
  ChevronRight,
  ExternalLink,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState("december");

  const months = [
    { value: "december", label: "December 2024" },
    { value: "november", label: "November 2024" },
    { value: "october", label: "October 2024" },
  ];

  const monthlySummary = {
    electricity: { usage: 285, cost: 2840, saved: 420, change: -12 },
    water: { usage: 15000, cost: 1250, saved: 180, change: -8 },
    co2: 145,
    trees: 7,
  };

  const annualSummary = {
    totalSaved: 8450,
    electricitySaved: 2400,
    waterSaved: 180000,
    co2Reduced: 1740,
    treesEquivalent: 84,
    percentile: 15,
  };

  const handleDownload = (type: string) => {
    toast({
      title: "Preparing download",
      description: `Your ${type} report will be ready shortly`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard",
    });
  };

  return (
    <MobileLayout currentPath="/reports">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Reports</h1>
          <p className="text-xs text-muted-foreground">Download and share your impact</p>
        </div>

        {/* Month Selector */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {months.map((month) => (
            <button
              key={month.value}
              onClick={() => setSelectedMonth(month.value)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedMonth === month.value 
                  ? 'bg-primary text-primary-foreground' 
                  : 'glass text-muted-foreground'
              }`}
            >
              {month.label}
            </button>
          ))}
        </div>

        {/* Monthly Report Preview */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Monthly Summary</h3>
            </div>
            <span className="text-xs text-muted-foreground">December 2024</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-energy/10">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="w-3.5 h-3.5 text-energy-foreground" />
                <span className="text-xs text-muted-foreground">Electricity</span>
              </div>
              <p className="text-lg font-bold text-foreground">{monthlySummary.electricity.usage} kWh</p>
              <p className="text-xs text-success">₹{monthlySummary.electricity.saved} saved</p>
            </div>
            <div className="p-3 rounded-xl bg-water/10">
              <div className="flex items-center gap-1.5 mb-1">
                <Droplets className="w-3.5 h-3.5 text-water-foreground" />
                <span className="text-xs text-muted-foreground">Water</span>
              </div>
              <p className="text-lg font-bold text-foreground">{(monthlySummary.water.usage / 1000).toFixed(0)}K L</p>
              <p className="text-xs text-success">₹{monthlySummary.water.saved} saved</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-success/10 mb-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-foreground">{monthlySummary.co2} kg CO₂ reduced</p>
                <p className="text-xs text-muted-foreground">≈ {monthlySummary.trees} trees planted</p>
              </div>
            </div>
            <TrendingDown className="w-5 h-5 text-success" />
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDownload("monthly")}
              className="flex-1 rounded-xl"
            >
              <Download className="w-4 h-4 mr-1.5" />
              PDF
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShare}
              className="flex-1 rounded-xl"
            >
              <Share2 className="w-4 h-4 mr-1.5" />
              Share
            </Button>
          </div>
        </div>

        {/* Annual Report */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">2024 Annual Impact</h3>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              Full Year
            </span>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
              <span className="text-sm text-muted-foreground">Total Saved</span>
              <span className="text-lg font-bold text-primary">₹{annualSummary.totalSaved.toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-lg bg-muted/30 text-center">
                <p className="text-lg font-bold text-foreground">{annualSummary.electricitySaved}</p>
                <p className="text-[10px] text-muted-foreground">kWh saved</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/30 text-center">
                <p className="text-lg font-bold text-foreground">{(annualSummary.waterSaved / 1000).toFixed(0)}K</p>
                <p className="text-[10px] text-muted-foreground">liters saved</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/30 text-center">
                <p className="text-lg font-bold text-foreground">{annualSummary.co2Reduced}</p>
                <p className="text-[10px] text-muted-foreground">kg CO₂ reduced</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/30 text-center">
                <p className="text-lg font-bold text-foreground">{annualSummary.treesEquivalent}</p>
                <p className="text-[10px] text-muted-foreground">trees equivalent</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-success/10 border border-success/20 mb-4">
            <p className="text-xs text-center text-muted-foreground">
              🏆 You're in the <span className="text-success font-bold">top {annualSummary.percentile}%</span> of eco-conscious households in your city!
            </p>
          </div>

          <Button 
            onClick={() => handleDownload("annual")}
            className="w-full rounded-xl"
          >
            <FileText className="w-4 h-4 mr-1.5" />
            Download Annual Report
          </Button>
        </div>

        {/* Shareable Link */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">Shareable Impact Card</h3>
              <p className="text-xs text-muted-foreground">Share your achievements on social media</p>
            </div>
            <Button size="sm" variant="outline" onClick={handleShare} className="rounded-xl">
              Copy Link
            </Button>
          </div>
        </div>

        {/* Export Options */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Export Data</h3>
          <div className="space-y-2">
            {[
              { label: "Monthly Usage CSV", desc: "Raw data for spreadsheets" },
              { label: "Recommendations Log", desc: "All completed actions" },
              { label: "Full Account Data", desc: "GDPR-compliant export" },
            ].map((option) => (
              <button
                key={option.label}
                onClick={() => handleDownload(option.label)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/30 active:bg-muted/50 transition-colors"
              >
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.desc}</p>
                </div>
                <Download className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Reports;
