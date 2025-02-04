import { ArrowRight, Search, Zap, BarChart3, Shield } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover",
      description: "Find the perfect AI tools with our intelligent search system that understands your specific needs and use cases",
      details: ["Smart filtering by industry", "Use case matching", "Budget optimization"]
    },
    {
      icon: Zap,
      title: "Analyze",
      description: "Get detailed insights and comparisons to make informed decisions about your AI tool stack",
      details: ["Feature comparison", "Price analysis", "User reviews"]
    },
    {
      icon: BarChart3,
      title: "Optimize",
      description: "Track usage patterns and optimize your AI investments for maximum ROI",
      details: ["Usage analytics", "Cost tracking", "Performance metrics"]
    },
    {
      icon: Shield,
      title: "Scale",
      description: "Grow your AI capabilities with confidence using our enterprise-grade platform",
      details: ["Team collaboration", "Integration support", "Security compliance"]
    },
  ];

  return (
    <div className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your Journey to AI Excellence
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Four simple steps to transform your AI workflow
          </p>
        </div>

        <div className="relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex items-center gap-8 mb-16 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="flex-1">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6"
                >
                  <step.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <motion.li
                      key={detail}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 p-8 rounded-2xl"
                  >
                    <div className="aspect-square rounded-xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center">
                      <step.icon className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;