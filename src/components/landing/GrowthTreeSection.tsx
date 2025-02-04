import { motion } from "framer-motion";
import { TreeDeciduous, Sprout, Leaf, Branch, ArrowUpRight } from "lucide-react";

const GrowthTreeSection = () => {
  const benefits = [
    {
      icon: Sprout,
      title: "Start Smart",
      description: "Begin with intelligent AI tool discovery and recommendations",
      delay: 0.2,
    },
    {
      icon: Leaf,
      title: "Optimize Usage",
      description: "Track and optimize your AI investments with real-time analytics",
      delay: 0.4,
    },
    {
      icon: Branch,
      title: "Scale Efficiently",
      description: "Expand your AI capabilities across teams and departments",
      delay: 0.6,
    },
    {
      icon: TreeDeciduous,
      title: "Full Integration",
      description: "Achieve seamless workflow integration across your tech stack",
      delay: 0.8,
    },
  ];

  return (
    <div className="py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-full text-sm font-medium text-green-600 dark:text-green-400">
            <ArrowUpRight className="w-4 h-4 animate-bounce" />
            Growth Journey
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Grow Your AI Ecosystem
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch your AI capabilities flourish with our comprehensive platform
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-1 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: benefit.delay }}
                className={`relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 group ${
                  index % 2 === 0 ? "md:translate-x-8" : "md:-translate-x-8 md:mt-24"
                }`}
              >
                <div className="absolute top-1/2 -translate-y-1/2 right-0 md:left-1/2 transform translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div className="pr-8">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthTreeSection;