import { Search, Brain, Zap, CircuitBoard, Users, ChartBar } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div id="features" className="py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-96 w-96 border border-black/5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `scale(${Math.random() * 2 + 1})`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black bg-clip-text">
            Powerful Features for AI Tool Discovery
          </h2>
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
              className="p-8 rounded-xl bg-white hover:bg-gray-50 transition-all hover:transform hover:scale-105 animate-fade-in shadow-lg relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10">
                <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
              {/* Subtle card pattern */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;