import { Search, Brain, Zap, CircuitBoard, Users, ChartBar } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div id="features" className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Powerful Features for AI Tool Discovery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive suite of features designed to help you find and manage AI tools effectively.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
              color: "from-blue-400 to-blue-600",
            },
            {
              icon: CircuitBoard,
              title: "Verified Tools",
              description: "Every tool is thoroughly vetted for quality and reliability.",
              color: "from-blue-400 to-blue-600",
            },
            {
              icon: ChartBar,
              title: "Usage Analytics",
              description: "Track and analyze your AI tool usage patterns.",
              color: "from-blue-400 to-blue-600",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Centralize tool access and permissions. Keep your team aligned and productive.",
              color: "from-blue-400 to-blue-600",
            },
            {
              icon: Zap,
              title: "Quick Integration",
              description: "Seamlessly integrate AI tools into your workflow.",
              color: "from-blue-400 to-blue-600",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="p-8 rounded-xl bg-white hover:bg-gray-50 transition-all hover:transform hover:scale-105 animate-fade-in shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-lg w-fit mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;