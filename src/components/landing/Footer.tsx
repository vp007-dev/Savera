import { memo } from "react";
import { Leaf, Mail, MapPin } from "lucide-react";

const Footer = memo(() => {
  return (
    <footer className="py-8 px-4 bg-card border-t border-border safe-area-bottom">
      <div className="container max-w-lg mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">SAVERA</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            AI-powered household resource intelligence for Indian families.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Bangalore</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>hello@savera.in</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground mb-6">
          <a href="#features" className="hover:text-primary transition-colors duration-150">Features</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors duration-150">How It Works</a>
          <a href="#pricing" className="hover:text-primary transition-colors duration-150">Pricing</a>
          <a href="#" className="hover:text-primary transition-colors duration-150">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors duration-150">Terms</a>
        </div>
        
        <p className="text-center text-[10px] text-muted-foreground">
          © 2026 SAVERA by Team Kasukabe. Microsoft Imagine Cup 2026.
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
