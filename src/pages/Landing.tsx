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

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Discover the Perfect AI Tools for Your Business
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Navigate the AI landscape with confidence. Find, compare, and implement the best AI tools
            tailored to your specific needs.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => navigate("/auth")}
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
              onClick={scrollToFeatures}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to manage and optimize your AI tool stack
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Search,
              title: "Smart Search",
              description: "Find the perfect AI tools with our intelligent search system.",
              color: "from-blue-400 to-blue-600",
            },
            {
              icon: Brain,
              title: "AI Recommendations",
              description: "Get personalized suggestions based on your needs.",
              color: "from-purple-400 to-purple-600",
            },
            {
              icon: Shield,
              title: "Verified Tools",
              description: "Every tool is thoroughly vetted for quality.",
              color: "from-green-400 to-green-600",
            },
            {
              icon: BarChart3,
              title: "Usage Analytics",
              description: "Track and analyze your AI tool usage patterns.",
              color: "from-yellow-400 to-yellow-600",
            },
            {
              icon: Wrench,
              title: "Tool Management",
              description: "Organize all your AI tools in one place.",
              color: "from-red-400 to-red-600",
            },
            {
              icon: Zap,
              title: "Quick Integration",
              description: "Seamlessly integrate tools into your workflow.",
              color: "from-indigo-400 to-indigo-600",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="p-8 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-all hover:transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-lg w-fit mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="container mx-auto px-4 py-20 bg-gray-800/30">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
            Track Your Progress
          </h2>
          <p className="text-xl text-gray-300">
            Visualize your AI tool usage and optimize your workflow
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: BarChart3, title: "Usage Analytics", description: "Monitor patterns" },
            { icon: LineChart, title: "Growth Tracking", description: "Track ROI" },
            { icon: PieChart, title: "Resource Distribution", description: "Optimize allocation" },
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

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
            Why Choose Relevence
          </h2>
          <p className="text-xl text-gray-300">
            Transform your workflow with our comprehensive platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses already using Relevence to find and implement the perfect AI tools.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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