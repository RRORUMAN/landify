import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-b from-black to-card dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-32">
        <div className="text-center max-w-4xl mx-auto animate-fade-in space-y-8">
          <div className="inline-flex items-center gap-2 bg-brand-blue-light/10 dark:bg-blue-900/30 px-4 py-2 rounded-full text-sm font-medium text-brand-blue dark:text-blue-400 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Your AI Tool Discovery Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient">
            Find the Perfect AI Tools for Your{" "}
            <span className="bg-gradient-to-r from-brand-blue via-brand-blue-dark to-brand-blue bg-clip-text text-transparent animate-text">
              Business
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover, compare, and manage AI tools all in one place. Save time and money with personalized recommendations and analytics for your AI stack.
          </p>
          
          <div className="flex flex-col items-center justify-center mt-12">
            <Button
              size="lg"
              className="bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-6 text-lg rounded-xl w-full sm:w-auto animate-fade-in group transition-all duration-300 hover:scale-105 mb-4"
              onClick={() => navigate("/auth")}
            >
              Start Discovering AI Tools{" "}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <span className="text-sm text-gray-400 dark:text-gray-400 animate-fade-in">
              Free forever • No credit card required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;