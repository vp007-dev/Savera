import { useState, memo } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onGetStarted: () => void;
}

const Navbar = memo(({ onGetStarted }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 safe-area-top">
      <div className="container max-w-lg mx-auto">
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-card/90 backdrop-blur-xl border border-border">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center glow-primary">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-base font-bold text-foreground">SAVERA</span>
          </div>
          
          {/* CTA & Menu */}
          <div className="flex items-center gap-2">
            <Button 
              size="sm"
              onClick={onGetStarted}
              className="rounded-xl gradient-primary text-primary-foreground font-medium text-sm px-4"
            >
              Start
            </Button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-muted/50 transition-colors duration-150 touch-target"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-2 p-4 rounded-3xl bg-card/95 backdrop-blur-xl border border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              <a 
                href="#features" 
                className="py-3 px-4 rounded-2xl text-sm text-foreground hover:bg-muted/50 transition-colors duration-150 touch-target"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="py-3 px-4 rounded-2xl text-sm text-foreground hover:bg-muted/50 transition-colors duration-150 touch-target"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#impact" 
                className="py-3 px-4 rounded-2xl text-sm text-foreground hover:bg-muted/50 transition-colors duration-150 touch-target"
                onClick={() => setIsOpen(false)}
              >
                Impact
              </a>
              <a 
                href="#pricing" 
                className="py-3 px-4 rounded-2xl text-sm text-foreground hover:bg-muted/50 transition-colors duration-150 touch-target"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              <div className="pt-3 mt-2 border-t border-border">
                <Button 
                  onClick={() => { onGetStarted(); setIsOpen(false); }}
                  className="w-full gradient-primary text-primary-foreground py-5 rounded-2xl touch-target"
                >
                  Get Started Free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
