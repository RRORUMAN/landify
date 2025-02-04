import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  LineChart,
  PieChart,
  Zap,
  Brain,
  Search,
  Shield,
  Wrench,
} from "lucide-react";

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Powerful Features for AI Tool Discovery
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Explore our comprehensive suite of features designed to help you find and manage AI tools effectively.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Search,
              title: "Smart Search",
              description: "Advanced filtering and search capabilities to find the perfect AI tools.",
              color: "from-blue-400 to-blue-600",
            },
            {
              icon: Brain,
              title: "AI Recommendations",
              description: "Get personalized tool suggestions based on your needs and preferences.",
              color: "from-purple-400 to-purple-600",
            },
            {
              icon: Shield,
              title: "Verified Tools",
              description: "Every tool is thoroughly vetted for quality and reliability.",
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
              description: "Organize and manage your AI tools in one place.",
              color: "from-red-400 to-red-600",
            },
            {
              icon: Zap,
              title: "Quick Integration",
              description: "Seamlessly integrate AI tools into your workflow.",
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
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Powerful Analytics
          </h2>
          <p className="text-xl text-gray-300">
            Track your AI tool usage and optimize your workflow
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: BarChart3, title: "Usage Metrics" },
            { icon: LineChart, title: "Growth Trends" },
            { icon: PieChart, title: "Category Distribution" },
          ].map((chart, index) => (
            <div
              key={chart.title}
              className="p-6 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <chart.icon className="w-12 h-12 mb-4 text-purple-400 mx-auto" />
              <h4 className="text-xl font-semibold text-center mb-2">{chart.title}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Ready to Transform Your AI Workflow?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals already using Relevence to optimize their AI tool usage.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={() => navigate("/auth")}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features;