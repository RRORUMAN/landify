import { Search, Brain, Zap, CircuitBoard, Users, ChartBar } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div id="features" className="py-32 bg-gradient-to-b from-white via-blue-50/10 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Powerful Features for AI Tool Discovery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
              color: "from-purple-400 to-purple-600",
            },
            {
              icon: CircuitBoard,
              title: "Verified Tools",
              description: "Every tool is thoroughly vetted for quality and reliability.",
              color: "from-green-400 to-green-600",
            },
            {
              icon: ChartBar,
              title: "Usage Analytics",
              description: "Track and analyze your AI tool usage patterns.",
              color: "from-yellow-400 to-yellow-600",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Centralize tool access and permissions. Keep your team aligned and productive.",
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
              className="p-8 rounded-xl bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-all hover:transform hover:scale-105 animate-fade-in shadow-lg dark:shadow-gray-800/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-lg w-fit mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
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
