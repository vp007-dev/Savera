import { useState } from "react";
import MobileLayout from "@/components/app/MobileLayout";
import { 
  Users, 
  Plus,
  Crown,
  User,
  Target,
  TrendingUp,
  Trophy,
  Mail,
  Check,
  X,
  ChevronRight,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  avatar: string;
  contribution: number;
  points: number;
  joined: boolean;
}

const Family = () => {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: "1", name: "Rajesh Sharma", email: "rajesh@email.com", role: "admin", avatar: "RS", contribution: 45, points: 96, joined: true },
    { id: "2", name: "Priya Sharma", email: "priya@email.com", role: "member", avatar: "PS", contribution: 30, points: 72, joined: true },
    { id: "3", name: "Arjun Sharma", email: "arjun@email.com", role: "member", avatar: "AS", contribution: 25, points: 48, joined: true },
  ]);

  const [pendingInvites] = useState([
    { email: "grandma@email.com", sent: "2 days ago" },
  ]);

  const familyGoal = {
    target: 2000,
    current: 1540,
    deadline: "Dec 31",
  };

  const handleInvite = () => {
    if (!inviteEmail) return;
    toast({
      title: "Invitation sent!",
      description: `Invite sent to ${inviteEmail}`,
    });
    setInviteEmail("");
    setShowInvite(false);
  };

  const handleRoleChange = (id: string) => {
    setMembers(prev => prev.map(m => 
      m.id === id ? { ...m, role: m.role === "admin" ? "member" : "admin" } : m
    ));
    toast({
      title: "Role updated",
      description: "Member role has been changed",
    });
  };

  const totalPoints = members.reduce((sum, m) => sum + m.points, 0);
  const goalProgress = (familyGoal.current / familyGoal.target) * 100;

  return (
    <MobileLayout currentPath="/family">
      <div className="space-y-4 lg:space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">Sharma Family</h1>
            <p className="text-xs lg:text-sm text-muted-foreground">{members.length} members • {totalPoints} total points</p>
          </div>
          <button className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl glass flex items-center justify-center">
            <Settings className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
          </button>
        </div>

        {/* Family Goal */}
        <div className="glass rounded-2xl p-4 lg:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm lg:text-lg font-semibold text-foreground">Family Savings Goal</h3>
              <p className="text-xs lg:text-sm text-muted-foreground">Save ₹{familyGoal.target.toLocaleString()} by {familyGoal.deadline}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs lg:text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">
                ₹{familyGoal.current.toLocaleString()} / ₹{familyGoal.target.toLocaleString()}
              </span>
            </div>
            <Progress value={goalProgress} className="h-3 lg:h-4" />
            <p className="text-xs lg:text-sm text-success font-medium">
              {goalProgress.toFixed(0)}% complete • ₹{(familyGoal.target - familyGoal.current).toLocaleString()} to go!
            </p>
          </div>
        </div>

        {/* Grid Layout for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Members */}
          <div className="glass rounded-2xl p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm lg:text-base font-semibold text-foreground">Family Members</h3>
              <button
                onClick={() => setShowInvite(true)}
                className="flex items-center gap-1 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-primary/10 text-primary text-xs lg:text-sm font-medium"
              >
                <Plus className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                Invite
              </button>
            </div>

            <div className="space-y-3">
              {members.map((member, index) => (
                <div 
                  key={member.id}
                  className={`flex items-center gap-3 p-3 lg:p-4 rounded-xl ${
                    index === 0 ? 'bg-primary/5 border border-primary/20' : 'bg-muted/30'
                  }`}
                >
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-sm lg:text-base font-bold ${
                    member.role === "admin" ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm lg:text-base font-medium text-foreground truncate">{member.name}</p>
                      {member.role === "admin" && (
                        <Crown className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      {member.contribution}% contribution • {member.points} pts
                    </p>
                  </div>
                  <button onClick={() => handleRoleChange(member.id)}>
                    <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>

            {/* Pending Invites */}
            {pendingInvites.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs lg:text-sm text-muted-foreground mb-2">Pending Invites</p>
                {pendingInvites.map((invite, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 lg:p-3 rounded-lg bg-muted/30">
                    <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
                    <span className="text-xs lg:text-sm text-muted-foreground flex-1">{invite.email}</span>
                    <span className="text-[10px] lg:text-xs text-muted-foreground">{invite.sent}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contribution Breakdown */}
          <div className="glass rounded-2xl p-4 lg:p-6">
            <h3 className="text-sm lg:text-base font-semibold text-foreground mb-4">Contribution Breakdown</h3>
            <div className="space-y-3 lg:space-y-4">
              {members.sort((a, b) => b.contribution - a.contribution).map((member, index) => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="w-6 lg:w-8 text-center">
                    {index === 0 && <Trophy className="w-4 h-4 lg:w-5 lg:h-5 text-primary mx-auto" />}
                    {index > 0 && <span className="text-xs lg:text-sm text-muted-foreground">{index + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs lg:text-sm font-medium text-foreground">{member.name}</span>
                      <span className="text-xs lg:text-sm text-muted-foreground">{member.contribution}%</span>
                    </div>
                    <div className="h-2 lg:h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          index === 0 ? 'bg-primary' : 
                          index === 1 ? 'bg-secondary' : 'bg-muted-foreground'
                        }`}
                        style={{ width: `${member.contribution}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Invite Modal */}
        {showInvite && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end lg:items-center justify-center p-4">
            <div className="glass rounded-2xl p-6 w-full max-w-sm lg:max-w-md animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg lg:text-xl font-semibold text-foreground">Invite Member</h3>
                <button onClick={() => setShowInvite(false)}>
                  <X className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
                </button>
              </div>
              <p className="text-sm lg:text-base text-muted-foreground mb-4">
                Send an invitation to join your family group
              </p>
              <Input
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="mb-4 h-12 lg:h-14 rounded-xl"
              />
              <Button onClick={handleInvite} className="w-full h-12 lg:h-14 rounded-xl">
                Send Invitation
              </Button>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Family;
