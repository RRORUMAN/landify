import { Search, Brain, Zap, CircuitBoard, Users, ChartBar } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  return (
    <div className="py-32 bg-gradient-to-b from-white via-blue-50/10 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-8">
            Core Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
            Discover, Analyze, and Optimize Your AI Stack
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Navigate the AI landscape with confidence using our comprehensive toolkit
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: Search,
              title: "Smart Discovery",
              description: "Find the perfect AI tools in minutes with our AI-powered search that understands your specific needs and use cases.",
              stats: "90% faster tool discovery",
            },
            {
              icon: Brain,
              title: "AI-Driven Analysis",
              description: "Get data-driven insights and personalized recommendations based on your industry and requirements.",
              stats: "95% match accuracy",
            },
            {
              icon: Zap,
              title: "Instant Comparison",
              description: "Compare features, pricing, and user reviews side by side to make informed decisions quickly.",
              stats: "Save 4 hours per tool",
            },
            {
              icon: CircuitBoard,
              title: "ROI Tracking",
              description: "Monitor the performance and value of your AI investments with detailed analytics.",
              stats: "28% cost optimization",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Streamline tool evaluation and decision-making across your organization.",
              stats: "3x faster adoption",
            },
            {
              icon: ChartBar,
              title: "Performance Analytics",
              description: "Track usage patterns and optimize your AI tool stack for maximum efficiency.",
              stats: "32% efficiency boost",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-2xl dark:hover:shadow-blue-500/5 transition-all duration-300 group border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="text-blue-600 dark:text-blue-400 font-semibold">
                  {feature.stats}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;