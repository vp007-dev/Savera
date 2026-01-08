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
  Globe,
  Building2,
  Landmark
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LoginType = "user" | "institution" | "government";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginType, setLoginType] = useState<LoginType>("user");
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
    if (loginType === "institution") {
      navigate("/institution");
    } else if (loginType === "government") {
      navigate("/government");
    } else {
      navigate("/household-setup");
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    navigate("/household-setup");
  };

  const getLoginTypeLabel = () => {
    switch (loginType) {
      case "institution": return "Institution";
      case "government": return "Government";
      default: return isLogin ? "Sign In" : "Create Account";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Desktop Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 xl:p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-2xl text-foreground">SAVERA</span>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight">
            Save Resources,<br />
            <span className="text-primary">Save the Planet</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Join thousands of households and organizations tracking and reducing their water and energy consumption.
          </p>
          
          <div className="flex items-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2M+</div>
              <div className="text-sm text-muted-foreground">kWh Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5M+</div>
              <div className="text-sm text-muted-foreground">Liters Saved</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span>Privacy-first</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>AI-powered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <span>Secure</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col lg:justify-center">
        {/* Mobile Header */}
        <div className="p-4 flex items-center gap-3 lg:hidden">
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

        {/* Desktop Back Button */}
        <div className="hidden lg:block p-6">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to home</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 xl:p-12 flex flex-col lg:max-w-lg lg:mx-auto lg:w-full">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {loginType === "user" 
                ? (isLogin ? "Welcome back" : "Create account")
                : loginType === "institution" 
                  ? "Institution Login" 
                  : "Government Login"
              }
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground mt-1">
              {loginType === "user"
                ? (isLogin 
                  ? "Sign in to track your resource savings" 
                  : "Join thousands saving water & energy")
                : loginType === "institution"
                  ? "Access your institution's sustainability dashboard"
                  : "Access the national resource management portal"
              }
            </p>
          </div>

          {/* Login Type Selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button
              onClick={() => { setLoginType("user"); setIsLogin(true); }}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                loginType === "user" 
                  ? 'bg-primary text-primary-foreground' 
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">User</span>
            </button>
            <button
              onClick={() => { setLoginType("institution"); setIsLogin(true); }}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                loginType === "institution" 
                  ? 'bg-primary text-primary-foreground' 
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="text-xs font-medium">Institution</span>
            </button>
            <button
              onClick={() => { setLoginType("government"); setIsLogin(true); }}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                loginType === "government" 
                  ? 'bg-primary text-primary-foreground' 
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              <Landmark className="w-5 h-5" />
              <span className="text-xs font-medium">Government</span>
            </button>
          </div>

          {/* Sign In / Sign Up Toggle - Only for User type */}
          {loginType === "user" && (
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
          )}

          {/* Social Login - Only for User type */}
          {loginType === "user" && (
            <>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="w-full p-3 lg:p-4 rounded-xl glass flex items-center justify-center gap-3 active:scale-[0.98] transition-transform hover:bg-muted/50"
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
                  className="w-full p-3 lg:p-4 rounded-xl glass flex items-center justify-center gap-3 active:scale-[0.98] transition-transform hover:bg-muted/50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="text-sm font-medium text-foreground">Continue with Apple</span>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 flex-1">
            {loginType === "user" && !isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-11 h-12 lg:h-14 rounded-xl glass border-0"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder={loginType === "institution" ? "Institution email" : loginType === "government" ? "Government email" : "Email address"}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-11 h-12 lg:h-14 rounded-xl glass border-0"
              />
            </div>

            {loginType === "user" && !isLogin && (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-11 h-12 lg:h-14 rounded-xl glass border-0"
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
                className="pl-11 pr-11 h-12 lg:h-14 rounded-xl glass border-0"
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

            {loginType === "user" && !isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value, city: "" })}
                  >
                    <SelectTrigger className="h-12 lg:h-14 rounded-xl glass border-0">
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
                    <SelectTrigger className="h-12 lg:h-14 rounded-xl glass border-0">
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

                <div className="flex items-start gap-3 p-3 lg:p-4 rounded-xl glass">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, consent: checked as boolean })
                    }
                    className="mt-0.5"
                  />
                  <label htmlFor="consent" className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                    I agree to share anonymized usage data to help improve resource conservation recommendations. 
                    Your personal information is never sold.
                  </label>
                </div>
              </>
            )}

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-12 lg:h-14 rounded-xl text-base lg:text-lg font-semibold"
              >
                {getLoginTypeLabel()}
              </Button>
            </div>

            {(isLogin || loginType !== "user") && (
              <button 
                type="button" 
                className="w-full text-sm text-primary font-medium"
              >
                Forgot password?
              </button>
            )}
          </form>

          {/* Trust indicators - Mobile only */}
          <div className="mt-6 pt-4 border-t border-border lg:hidden">
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
    </div>
  );
};

export default Auth;
