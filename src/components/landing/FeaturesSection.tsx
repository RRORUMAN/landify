import { Search, Brain, Shield, CircuitBoard, Users, ChartBar } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div id="features" className="py-32 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-1 rounded-full text-sm font-medium">
            FEATURES
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-primary dark:text-white">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features designed to help you find and manage the perfect AI tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Search,
              title: "Smart Search",
              description: "Advanced filtering system with AI-powered recommendations",
            },
            {
              icon: Brain,
              title: "AI Recommendations",
              description: "Get personalized suggestions based on your unique needs",
            },
            {
              icon: Shield,
              title: "Verified Tools",
              description: "Every tool is thoroughly vetted for quality and reliability",
            },
            {
              icon: CircuitBoard,
              title: "Easy Integration",
              description: "Seamlessly implement tools with step-by-step guides",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Work together efficiently with shared workspaces",
            },
            {
              icon: ChartBar,
              title: "Analytics Dashboard",
              description: "Track and optimize your AI tool usage with detailed insights",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="p-8 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-2xl dark:shadow-blue-500/5 transition-all duration-300 animate-fade-in group hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;