import { motion } from "framer-motion";
import { TreeDeciduous, Sprout, Leaf, GitBranch } from "lucide-react";

const GrowthTreeSection = () => {
  const benefits = [
    {
      icon: Sprout,
      title: "Discover",
      description: "Find the perfect AI tools for your specific needs",
      delay: 0.2,
    },
    {
      icon: Leaf,
      title: "Optimize",
      description: "Track usage and maximize your AI investments",
      delay: 0.4,
    },
    {
      icon: GitBranch,
      title: "Scale", 
      description: "Expand your AI capabilities across your organization",
      delay: 0.6,
    },
    {
      icon: TreeDeciduous,
      title: "Transform",
      description: "Build a powerful, integrated AI ecosystem",
      delay: 0.8,
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Your AI Journey
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Start small and grow your AI capabilities with confidence
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: benefit.delay }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 group hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthTreeSection;