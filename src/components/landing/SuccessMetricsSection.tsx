import { motion } from "framer-motion";
import { Zap, Target, TrendingUp, Sparkles } from "lucide-react";

const SuccessMetricsSection = () => {
  const metrics = [
    {
      title: "Smart Discovery",
      value: "Instant",
      description: "Find the perfect AI tools for your needs",
      icon: Sparkles,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Efficiency Boost",
      value: "Seamless",
      description: "Streamline your AI tool management",
      icon: Zap,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Success Rate",
      value: "Guaranteed",
      description: "Make informed decisions with confidence",
      icon: Target,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "ROI Impact",
      value: "Maximized",
      description: "Optimize your AI investments",
      icon: TrendingUp,
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-8">
            <Zap className="w-4 h-4" />
            Platform Benefits
          </span>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Empowering Your AI Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience a smarter way to discover, manage, and optimize your AI tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="w-full h-full text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {metric.value}
              </h3>
              <p className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-200">
                {metric.title}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {metric.description}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessMetricsSection;