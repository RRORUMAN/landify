import { motion } from "framer-motion";
import { TreeDeciduous, Sprout, LeafyGreen, GitBranch, TreePine } from "lucide-react";

const DashboardTreeSection = () => {
  const features = [
    {
      icon: TreeDeciduous,
      title: "Smart Tool Discovery",
      description: "AI-powered recommendations to find the perfect tools for your needs",
      delay: 0.2,
    },
    {
      icon: Sprout,
      title: "Cost Optimization",
      description: "Track spending and optimize your AI tool investments",
      delay: 0.4,
    },
    {
      icon: LeafyGreen,
      title: "Usage Analytics",
      description: "Deep insights into tool usage and team productivity",
      delay: 0.6,
    },
    {
      icon: GitBranch,
      title: "Custom Collections",
      description: "Organize tools your way with personalized categories",
      delay: 0.8,
    },
    {
      icon: TreePine,
      title: "Integration Hub",
      description: "Seamlessly connect and monitor all your AI tools",
      delay: 1.0,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-text mb-4">
            Your AI Command Center
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Unlock the full potential of your AI toolkit with our comprehensive dashboard
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 h-full"
          />

          <div className="relative z-10 space-y-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 glass-morphism"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </motion.div>
                </div>

                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg"
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardTreeSection;