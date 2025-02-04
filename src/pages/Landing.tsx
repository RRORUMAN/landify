import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Shield,
  Search,
  Wrench,
  Brain,
  ChartBar,
  ArrowUpRight,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-primary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block">
            AI TOOL DISCOVERY
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
            Find the Perfect AI Tools{" "}
            <Zap className="inline-block w-12 h-12 text-blue-500" />{" "}
            for Your Business
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Never worry about finding the right AI tools again. Get personalized recommendations,
            compare features, and implement solutions that work for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-xl w-full sm:w-auto"
              onClick={() => navigate("/auth")}
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-200 text-primary hover:bg-gray-50 px-8 py-6 text-lg rounded-xl w-full sm:w-auto"
              onClick={scrollToFeatures}
            >
              See Features <ArrowUpRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="border-t border-gray-100 py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
              HOW IT WORKS
            </span>
            <h2 className="text-4xl font-bold mt-6 mb-4 text-primary">
              Three Simple Steps to AI Success
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and transform your workflow with AI tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "1. Discover",
                description: "Browse our curated collection of AI tools",
              },
              {
                icon: Brain,
                title: "2. Compare",
                description: "Get personalized recommendations based on your needs",
              },
              {
                icon: Wrench,
                title: "3. Implement",
                description: "Seamlessly integrate the perfect tools into your workflow",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-blue-50 p-3 rounded-xl w-fit mb-6">
                  <step.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
              FEATURES
            </span>
            <h2 className="text-4xl font-bold mt-6 mb-4 text-primary">
              Everything You Need
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you find and manage the perfect AI tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Smart Search",
                description: "Find tools with advanced filters and categories",
              },
              {
                icon: Brain,
                title: "AI Recommendations",
                description: "Get personalized suggestions based on your needs",
              },
              {
                icon: Shield,
                title: "Verified Tools",
                description: "Every tool is thoroughly vetted for quality",
              },
              {
                icon: Wrench,
                title: "Easy Integration",
                description: "Seamlessly implement tools into your workflow",
              },
              {
                icon: Zap,
                title: "Quick Setup",
                description: "Get started with any tool in minutes",
              },
              {
                icon: ChartBar,
                title: "Usage Analytics",
                description: "Track and optimize your AI tool usage",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-blue-50 p-3 rounded-xl w-fit mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-32 bg-gray-50">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-primary">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses already using Relevence to find and implement the perfect AI tools.
          </p>
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-xl"
            onClick={() => navigate("/auth")}
          >
            Get Started Now <Zap className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;