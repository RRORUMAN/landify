import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CircuitBoard } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 pt-32 pb-20">
      <div className="text-center max-w-4xl mx-auto animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-6">
          <CircuitBoard className="w-5 h-5 text-blue-600" />
          <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1 rounded-full text-sm font-medium">
            TRUSTED BY 10,000+ COMPANIES
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary dark:text-white">
          Discover & Manage Your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Tools
          </span>{" "}
          Effortlessly
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          The most comprehensive AI tool discovery platform. Find, compare, and implement
          the perfect AI solutions for your business needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl w-full sm:w-auto animate-fade-in group transition-all duration-300"
            onClick={() => navigate("/auth")}
          >
            Get Started Free{" "}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;