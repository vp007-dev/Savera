import { useState } from "react";
import MobileLayout from "@/components/app/MobileLayout";
import { 
  HelpCircle, 
  MessageCircle,
  Mail,
  ChevronDown,
  ChevronUp,
  Search,
  Send,
  ExternalLink,
  Leaf
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ type: "suggestion", message: "" });

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How does SAVERA calculate my savings?",
      answer: "SAVERA uses AI to analyze your utility bills and compare your consumption patterns with similar households. We factor in your appliances, household size, and local rates to estimate potential savings from each recommendation.",
      category: "general",
    },
    {
      id: "2",
      question: "Is my data secure?",
      answer: "Absolutely! We use bank-level encryption for all data. Your personal information is never sold. We only use anonymized, aggregated data to improve our AI recommendations. You can delete your data anytime from Settings.",
      category: "privacy",
    },
    {
      id: "3",
      question: "How do I connect my utility account?",
      answer: "Currently, we support manual bill uploads (photo or PDF) and manual data entry. Direct utility integrations are coming soon for select providers in India. We'll notify you when your provider is supported.",
      category: "setup",
    },
    {
      id: "4",
      question: "What are challenges and how do I earn points?",
      answer: "Challenges are weekly or monthly goals to reduce your consumption. Complete them to earn points and badges! Points can be redeemed for rewards from our partners. Check the Challenges page for current active challenges.",
      category: "features",
    },
    {
      id: "5",
      question: "How accurate are the AI recommendations?",
      answer: "Our AI has been trained on data from thousands of households. Recommendations are personalized to your usage patterns. Most users see 15-30% reduction in bills by following our top 3 suggestions.",
      category: "features",
    },
    {
      id: "6",
      question: "Can I add family members to my account?",
      answer: "Yes! Go to the Family page from the menu to invite family members. You can set different roles (Admin/Member) and track everyone's contribution to your household savings goals.",
      category: "features",
    },
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback submitted!",
      description: "Thank you for helping us improve SAVERA",
    });
    setFeedback({ type: "suggestion", message: "" });
    setShowFeedback(false);
  };

  return (
    <MobileLayout currentPath="/help">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Help & Support</h1>
          <p className="text-xs text-muted-foreground">Find answers or get in touch</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 rounded-xl glass border-0"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowFeedback(true)}
            className="glass rounded-2xl p-4 text-left active:scale-[0.98] transition-transform"
          >
            <MessageCircle className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm font-medium text-foreground">Send Feedback</p>
            <p className="text-xs text-muted-foreground">Share your thoughts</p>
          </button>
          <a
            href="mailto:support@savera.app"
            className="glass rounded-2xl p-4 text-left active:scale-[0.98] transition-transform"
          >
            <Mail className="w-6 h-6 text-secondary-foreground mb-2" />
            <p className="text-sm font-medium text-foreground">Email Support</p>
            <p className="text-xs text-muted-foreground">Get help from team</p>
          </a>
        </div>

        {/* FAQs */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-2">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="rounded-xl bg-muted/30 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-3 text-left"
                >
                  <span className="text-sm font-medium text-foreground pr-4">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-3 pb-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No results found</p>
              <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
            </div>
          )}
        </div>

        {/* Resources */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Resources</h3>
          <div className="space-y-2">
            {[
              { label: "Getting Started Guide", desc: "Learn the basics" },
              { label: "Energy Saving Tips", desc: "Expert advice" },
              { label: "Water Conservation", desc: "Best practices" },
            ].map((resource) => (
              <button
                key={resource.label}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/30 active:bg-muted/50 transition-colors"
              >
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{resource.label}</p>
                  <p className="text-xs text-muted-foreground">{resource.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="glass rounded-2xl p-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground">SAVERA</p>
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground mt-2">
            Made with 💚 for a sustainable future
          </p>
        </div>

        {/* Feedback Modal */}
        {showFeedback && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="glass rounded-2xl p-6 w-full max-w-sm animate-slide-up">
              <h3 className="text-lg font-semibold text-foreground mb-4">Send Feedback</h3>
              
              <div className="flex gap-2 mb-4">
                {["suggestion", "bug", "other"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFeedback({ ...feedback, type })}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                      feedback.type === type 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <Textarea
                placeholder="Tell us what you think..."
                value={feedback.message}
                onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                className="mb-4 min-h-[100px] rounded-xl"
              />

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFeedback(false)}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitFeedback}
                  className="flex-1 rounded-xl"
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default HelpSupport;
