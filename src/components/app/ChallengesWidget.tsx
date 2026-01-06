import { Trophy, Droplets, Medal, Flame } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ChallengesWidget = () => {
  const currentChallenge = {
    title: "Save Water Challenge",
    goal: "Reduce by 15%",
    progress: 81,
    deadline: "2 days left",
    reward: "₹500 + Badge"
  };

  const leaderboard = [
    { rank: 1, name: "Sharma Family", points: 156, isUser: false },
    { rank: 2, name: "Patel Family", points: 142, isUser: false },
    { rank: 3, name: "Gupta Family", points: 128, isUser: false },
    { rank: 4, name: "You (Demo)", points: 96, isUser: true },
  ];

  const badges = [
    { name: "Energy Saver", icon: "⚡", earned: true },
    { name: "Water Guardian", icon: "💧", earned: true },
    { name: "Eco Warrior", icon: "🌱", earned: true },
    { name: "30-Day Streak", icon: "🔥", earned: false, progress: 87 },
  ];

  return (
    <div className="space-y-4">
      {/* Current Challenge */}
      <div className="p-4 rounded-2xl glass">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-water/20 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-water-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">{currentChallenge.title}</h3>
            <p className="text-xs text-muted-foreground">{currentChallenge.deadline}</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-water/20 text-water-foreground text-xs font-medium">
            Active
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{currentChallenge.goal}</span>
            <span className="font-semibold text-foreground">{currentChallenge.progress}%</span>
          </div>
          <Progress value={currentChallenge.progress} className="h-2.5" />
        </div>
        
        <p className="text-xs text-muted-foreground mt-3">
          🎁 Reward: {currentChallenge.reward}
        </p>
      </div>
      
      {/* Leaderboard */}
      <div className="p-4 rounded-2xl glass">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Trophy className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Leaderboard</h3>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {leaderboard.map((entry) => (
            <div 
              key={entry.rank}
              className={`flex items-center gap-3 p-2.5 rounded-xl ${
                entry.isUser ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                entry.rank === 1 ? 'bg-yellow-400/20 text-yellow-600' :
                entry.rank === 2 ? 'bg-gray-300/20 text-gray-600' :
                entry.rank === 3 ? 'bg-amber-600/20 text-amber-700' :
                'bg-muted text-muted-foreground'
              }`}>
                {entry.rank}
              </div>
              <span className="flex-1 text-sm text-foreground">{entry.name}</span>
              <span className="text-sm font-bold text-foreground">{entry.points} pts</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Badges */}
      <div className="p-4 rounded-2xl glass">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
            <Medal className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Your Badges</h3>
            <p className="text-xs text-muted-foreground">Keep earning!</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {badges.map((badge) => (
            <div 
              key={badge.name}
              className={`p-3 rounded-xl text-center ${
                badge.earned 
                  ? 'bg-primary/10 border border-primary/20' 
                  : 'bg-muted/50 border border-border'
              }`}
            >
              <span className="text-2xl">{badge.icon}</span>
              {!badge.earned && badge.progress && (
                <p className="text-[10px] text-primary mt-1">{badge.progress}%</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengesWidget;
