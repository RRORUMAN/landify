import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Zap,
  Shield,
  Search,
  Wrench,
  Brain,
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find the perfect AI tools for your specific needs with our intelligent search system.",
    },
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description: "Get personalized tool suggestions based on your industry and requirements.",
    },
    {
      icon: Shield,
      title: "Verified Tools",
      description: "All tools are thoroughly vetted and reviewed for quality and reliability.",
    },
    {
      icon: Wrench,
      title: "Tool Management",
      description: "Keep track of your AI tools and subscriptions in one place.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Discover the Perfect AI Tools for Your Business
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Navigate the AI landscape with confidence. Find, compare, and implement the best AI tools
            tailored to your specific needs.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={() => navigate("/auth")}
          >
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Why Choose Relevence?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all hover:transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className="w-12 h-12 mb-4 text-purple-400" />
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="container mx-auto px-4 py-20 bg-gray-800/30">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
            Track Your AI Journey
          </h3>
          <p className="text-xl text-gray-300">
            Visualize your AI tool usage and optimize your workflow
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: BarChart3, title: "Usage Analytics", description: "Monitor tool usage patterns" },
            { icon: LineChart, title: "Performance Tracking", description: "Track ROI and efficiency" },
            { icon: PieChart, title: "Resource Distribution", description: "Optimize tool allocation" },
          ].map((chart, index) => (
            <div
              key={chart.title}
              className="p-8 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-all animate-fade-in flex flex-col items-center text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <chart.icon className="w-16 h-16 mb-4 text-purple-400" />
              <h4 className="text-xl font-semibold mb-2">{chart.title}</h4>
              <p className="text-gray-400">{chart.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg bg-gray-800/50 animate-fade-in">
            <h4 className="text-4xl font-bold text-purple-400 mb-2">500+</h4>
            <p className="text-gray-400">AI Tools Available</p>
          </div>
          <div
            className="p-6 rounded-lg bg-gray-800/50 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h4 className="text-4xl font-bold text-purple-400 mb-2">50k+</h4>
            <p className="text-gray-400">Active Users</p>
          </div>
          <div
            className="p-6 rounded-lg bg-gray-800/50 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h4 className="text-4xl font-bold text-purple-400 mb-2">20+</h4>
            <p className="text-gray-400">Categories</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-20 bg-gray-800/30">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
            Benefits of Using Relevence
          </h3>
          <p className="text-xl text-gray-300">
            Transform your workflow with our comprehensive AI tool management platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            "Save time finding the right AI tools",
            "Reduce costs with smart recommendations",
            "Track and optimize tool usage",
            "Access verified and reliable tools",
            "Streamline your AI workflow",
            "Get personalized suggestions",
          ].map((benefit, index) => (
            <div
              key={benefit}
              className="flex items-center p-4 rounded-lg bg-gray-800/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Check className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
              <p className="text-gray-300">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Ready to Transform Your Business with AI?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses already using Relevence to find and implement the perfect AI tools.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={() => navigate("/pricing")}
          >
            View Pricing <Zap className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;