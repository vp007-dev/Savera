import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Leaf, 
  Mail, 
  Lock, 
  Phone, 
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Globe
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    country: "",
    city: "",
    consent: false,
  });

  const countries = [
    { value: "india", label: "India", cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata"] },
    { value: "usa", label: "United States", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"] },
    { value: "uk", label: "United Kingdom", cities: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow"] },
    { value: "uae", label: "UAE", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"] },
    { value: "singapore", label: "Singapore", cities: ["Singapore"] },
  ];

  const selectedCountry = countries.find(c => c.value === formData.country);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/household-setup");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    navigate("/household-setup");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <button 
          onClick={() => navigate("/")}
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
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLogin 
              ? "Sign in to track your resource savings" 
              : "Join thousands saving water & energy"
            }
          </p>
        </div>

        {/* Toggle */}
        <div className="glass rounded-xl p-1 flex mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isLogin ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              !isLogin ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSocialLogin("google")}
            className="w-full p-3 rounded-xl glass flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-medium text-foreground">Continue with Google</span>
          </button>

          <button
            onClick={() => handleSocialLogin("apple")}
            className="w-full p-3 rounded-xl glass flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span className="text-sm font-medium text-foreground">Continue with Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-11 h-12 rounded-xl glass border-0"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-11 h-12 rounded-xl glass border-0"
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="Phone number (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-11 h-12 rounded-xl glass border-0"
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-11 pr-11 h-12 rounded-xl glass border-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Eye className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>

          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData({ ...formData, country: value, city: "" })}
                >
                  <SelectTrigger className="h-12 rounded-xl glass border-0">
                    <Globe className="w-5 h-5 text-muted-foreground mr-2" />
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={formData.city}
                  onValueChange={(value) => setFormData({ ...formData, city: value })}
                  disabled={!formData.country}
                >
                  <SelectTrigger className="h-12 rounded-xl glass border-0">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCountry?.cities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl glass">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, consent: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed">
                  I agree to share anonymized usage data to help improve resource conservation recommendations. 
                  Your personal information is never sold.
                </label>
              </div>
            </>
          )}

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base font-semibold"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </div>

          {isLogin && (
            <button 
              type="button" 
              className="w-full text-sm text-primary font-medium"
            >
              Forgot password?
            </button>
          )}
        </form>

        {/* Trust indicators */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Privacy-first</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>AI-powered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
