
import { motion } from "framer-motion";
import { TreeDeciduous, Sprout, LeafyGreen, GitBranch, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardTreeSection = () => {
  const features = [
    {
      icon: TreeDeciduous,
      title: "Smart Tool Discovery",
      description: "AI-powered recommendations to find the perfect tools for your needs",
      metrics: [
        { value: "75% Faster", label: "Average Time to Find Tools" },
        { value: "98%", label: "Recommendation Accuracy" }
      ],
      benefits: ["Personalized AI recommendations", "Category-based filtering", "Real-time updates"],
      delay: 0.2,
    },
    {
      icon: Sprout,
      title: "Cost Optimization",
      description: "Track and optimize your AI tool investments effortlessly",
      metrics: [
        { value: "32%", label: "Average Cost Savings" },
        { value: "3.5x", label: "ROI Improvement" }
      ],
      benefits: ["Automated spend tracking", "Budget alerts", "Cost forecasting"],
      delay: 0.4,
    },
    {
      icon: LeafyGreen,
      title: "Usage Analytics",
      description: "Get deep insights into tool usage and team productivity",
      metrics: [
        { value: "45%", label: "Productivity Increase" },
        { value: "89%", label: "Team Adoption Rate" }
      ],
      benefits: ["Real-time usage metrics", "Team performance tracking", "Integration insights"],
      delay: 0.6,
    },
    {
      icon: GitBranch,
      title: "Custom Collections",
      description: "Organize and access your tools with personalized categories",
      metrics: [
        { value: "12 hrs/week", label: "Time Saved" },
        { value: "96%", label: "Team Satisfaction" }
      ],
      benefits: ["Flexible organization", "Team sharing", "Quick access"],
      delay: 0.8,
    },
    {
      icon: TreePine,
      title: "Integration Hub",
      description: "Connect and monitor all your AI tools seamlessly",
      metrics: [
        { value: "99.9%", label: "Integration Success" },
        { value: "< 5 mins", label: "Setup Time" }
      ],
      benefits: ["One-click integrations", "Health monitoring", "Auto-sync"],
      delay: 1.0,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-black mb-4">
            Your AI Command Center
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of your AI toolkit with our comprehensive dashboard
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center"
                >
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-black">{feature.title}</h3>
              </div>

              <p className="text-gray-600 mb-6">{feature.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {feature.metrics.map((metric, i) => (
                  <div key={i} className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600">
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
                    className="flex items-center text-gray-600"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>

              <Button
                variant="ghost"
                className="w-full text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Learn More →
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardTreeSection;
