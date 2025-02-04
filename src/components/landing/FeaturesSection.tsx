import { Search, Brain, Shield, CircuitBoard, Users, ChartBar } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div className="py-32 bg-gradient-to-b from-white via-blue-50/10 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-8">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Powerful features designed to help you find and manage the perfect AI tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
              className="relative p-8 rounded-2xl bg-white dark:bg-gray-800/50 hover:shadow-2xl dark:hover:shadow-blue-500/5 transition-all duration-300 animate-fade-in group hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;