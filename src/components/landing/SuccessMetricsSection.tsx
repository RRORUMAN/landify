import { motion } from "framer-motion";
import { Zap, Search, Brain, ChartBar } from "lucide-react";

const SuccessMetricsSection = () => {
  const metrics = [
    {
      title: "AI Tools",
      value: "500+",
      description: "Curated AI tools across categories",
      icon: Brain,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Categories",
      value: "20+",
      description: "Organized tool categories",
      icon: Search,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Time Saved",
      value: "10hrs",
      description: "Average weekly time saved per user",
      icon: Zap,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Cost Savings",
      value: "30%",
      description: "Average reduction in AI tool spend",
      icon: ChartBar,
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-sm font-medium text-blue-600 mb-8">
            <Zap className="w-4 h-4" />
            Platform Overview
          </span>
          <h2 className="text-4xl font-bold mb-6 text-black">
            Your AI Tool Management Hub
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to discover, manage, and optimize your AI tool stack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="w-full h-full text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-black">
                {metric.value}
              </h3>
              <p className="text-lg font-semibold mb-1 text-black">
                {metric.title}
              </p>
              <p className="text-gray-600">
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