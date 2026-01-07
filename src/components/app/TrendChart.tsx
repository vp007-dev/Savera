import { memo, useMemo } from "react";
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jul", electricity: 5200, water: 2400, total: 7600 },
  { month: "Aug", electricity: 5800, water: 2800, total: 8600 },
  { month: "Sep", electricity: 5100, water: 2200, total: 7300 },
  { month: "Oct", electricity: 4800, water: 2100, total: 6900 },
  { month: "Nov", electricity: 4600, water: 2000, total: 6600 },
  { month: "Dec", electricity: 4500, water: 2000, total: 6500 },
];

const TrendChart = memo(() => {
  const chartColors = useMemo(() => ({
    electricity: "hsl(25, 95%, 53%)",
    water: "hsl(195, 100%, 50%)",
    axis: "hsl(0, 0%, 60%)"
  }), []);

  return (
    <div className="p-4 lg:p-6 rounded-3xl bento-card">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div>
          <h3 className="text-base lg:text-lg font-semibold text-foreground">Spending Trend</h3>
          <p className="text-xs lg:text-sm text-muted-foreground">6-month history</p>
        </div>
        <div className="flex items-center gap-3 lg:gap-4 text-[10px] lg:text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-energy" />
            <span className="text-muted-foreground">Electricity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-water" />
            <span className="text-muted-foreground">Water</span>
          </div>
        </div>
      </div>
      
      <div className="h-32 lg:h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.electricity} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={chartColors.electricity} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.water} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={chartColors.water} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              stroke={chartColors.axis}
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Area 
              type="monotone" 
              dataKey="electricity" 
              stroke={chartColors.electricity}
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorElectricity)" 
            />
            <Area 
              type="monotone" 
              dataKey="water" 
              stroke={chartColors.water}
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorWater)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Summary */}
      <div className="mt-4 lg:mt-6 grid grid-cols-3 gap-2 lg:gap-3">
        <div className="p-2.5 lg:p-3 rounded-2xl bg-energy/10 text-center">
          <p className="text-lg lg:text-xl font-bold text-foreground">-13%</p>
          <p className="text-[10px] lg:text-xs text-muted-foreground">Electricity</p>
        </div>
        <div className="p-2.5 lg:p-3 rounded-2xl bg-water/10 text-center">
          <p className="text-lg lg:text-xl font-bold text-foreground">-17%</p>
          <p className="text-[10px] lg:text-xs text-muted-foreground">Water</p>
        </div>
        <div className="p-2.5 lg:p-3 rounded-2xl bg-success/10 text-center">
          <p className="text-lg lg:text-xl font-bold text-success">₹3K</p>
          <p className="text-[10px] lg:text-xs text-muted-foreground">Saved</p>
        </div>
      </div>
    </div>
  );
});

TrendChart.displayName = "TrendChart";

export default TrendChart;
