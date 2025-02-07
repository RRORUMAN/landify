
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
      delay: 0.2
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
      delay: 0.4
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
      delay: 0.6
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
      delay: 0.8
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
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your AI Command Center
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
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
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative bg-white rounded-xl p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center"
                  >
                    <feature.icon className="w-6 h-6 text-blue-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-700 mb-6 text-lg">{feature.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {feature.metrics.map((metric, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="bg-blue-50 rounded-lg p-4"
                    >
                      <div className="text-xl font-bold text-blue-600 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-700">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <ul className="space-y-3 mb-6">
                  {feature.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: feature.delay + (i * 0.1) }}
                      className="flex items-center text-gray-700"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>

                <Button
                  variant="ghost"
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium transition-all duration-300"
                >
                  Learn More →
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardTreeSection;
