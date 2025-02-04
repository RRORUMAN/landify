import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-32">
        <div className="text-center max-w-4xl mx-auto animate-fade-in space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI Tool Discovery & Management Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-text">
              AI Solution
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Stop wasting time searching for the right AI tools. Our intelligent platform helps you discover, evaluate, and implement the perfect AI solutions for your needs in minutes, not months.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl w-full sm:w-auto animate-fade-in group transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/auth")}
            >
              Start Your Journey{" "}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <span className="text-sm text-gray-500 dark:text-gray-400 animate-fade-in">
              14-day free trial • No credit card required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;