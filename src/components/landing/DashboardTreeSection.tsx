import { motion } from "framer-motion";
import { TreeDeciduous, Sprout, LeafyGreen, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardTreeSection = () => {
  const features = [
    {
      icon: TreeDeciduous,
      title: "AI Tool Discovery",
      description: "Find and compare the perfect AI tools for your workflow",
      metrics: [
        { value: "Smart", label: "Search & Filter" },
        { value: "Real-time", label: "Updates" }
      ],
      benefits: ["AI-powered recommendations", "Category optimization", "Tool comparisons"],
      delay: 0.2,
      gradient: "from-blue-500/5 to-indigo-500/5"
    },
    {
      icon: Sprout,
      title: "Budget Management",
      description: "Track and optimize your AI investments effortlessly",
      metrics: [
        { value: "Live", label: "Cost Tracking" },
        { value: "Smart", label: "Alerts" }
      ],
      benefits: ["Spend analytics", "Budget forecasting", "Cost optimization"],
      delay: 0.4,
      gradient: "from-indigo-500/5 to-violet-500/5"
    },
    {
      icon: LeafyGreen,
      title: "Usage Analytics",
      description: "Get deep insights into your AI tool utilization",
      metrics: [
        { value: "Real-time", label: "Metrics" },
        { value: "Clear", label: "Insights" }
      ],
      benefits: ["Usage patterns", "ROI analysis", "Performance tracking"],
      delay: 0.6,
      gradient: "from-violet-500/5 to-purple-500/5"
    },
    {
      icon: GitBranch,
      title: "Custom Collections",
      description: "Organize your AI tools with smart categorization",
      metrics: [
        { value: "Flexible", label: "Organization" },
        { value: "Easy", label: "Management" }
      ],
      benefits: ["Custom categories", "Tool grouping", "Quick access"],
      delay: 0.8,
      gradient: "from-purple-500/5 to-blue-500/5"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your AI Command Center
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Unlock the full potential of your AI toolkit with our comprehensive dashboard
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-xl border border-gray-200/20 dark:border-gray-700/20 rounded-xl p-8 neo-blur transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center"
                >
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {feature.metrics.map((metric, i) => (
                  <div key={i} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <ul className="space-y-3 mb-6">
                {feature.benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: feature.delay + (i * 0.1) }}
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>

              <Button
                variant="ghost"
                className="w-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Learn More →
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardTreeSection;