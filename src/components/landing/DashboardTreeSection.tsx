import { motion } from "framer-motion";
import { TreeDeciduous, Sprout, LeafyGreen, GitBranch, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardTreeSection = () => {
  const features = [
    {
      icon: TreeDeciduous,
      title: "Smart Tool Discovery",
      description: "AI-powered recommendations to find the perfect tools for your needs",
      stats: [
        { label: "Average Time to Find Tools", value: "75% Faster" },
        { label: "Recommendation Accuracy", value: "98%" }
      ],
      benefits: ["Personalized AI recommendations", "Category-based filtering", "Real-time updates"],
      delay: 0.2,
    },
    {
      icon: Sprout,
      title: "Cost Optimization",
      description: "Track spending and optimize your AI tool investments",
      stats: [
        { label: "Average Cost Savings", value: "32%" },
        { label: "ROI Improvement", value: "3.5x" }
      ],
      benefits: ["Automated spend tracking", "Budget alerts", "Cost forecasting"],
      delay: 0.4,
    },
    {
      icon: LeafyGreen,
      title: "Usage Analytics",
      description: "Deep insights into tool usage and team productivity",
      stats: [
        { label: "Productivity Increase", value: "45%" },
        { label: "Team Adoption Rate", value: "89%" }
      ],
      benefits: ["Real-time usage metrics", "Team performance tracking", "Integration insights"],
      delay: 0.6,
    },
    {
      icon: GitBranch,
      title: "Custom Collections",
      description: "Organize tools your way with personalized categories",
      stats: [
        { label: "Time Saved", value: "12 hrs/week" },
        { label: "Team Satisfaction", value: "96%" }
      ],
      benefits: ["Flexible organization", "Team sharing", "Quick access"],
      delay: 0.8,
    },
    {
      icon: TreePine,
      title: "Integration Hub",
      description: "Seamlessly connect and monitor all your AI tools",
      stats: [
        { label: "Integration Success Rate", value: "99.9%" },
        { label: "Setup Time", value: "< 5 mins" }
      ],
      benefits: ["One-click integrations", "Health monitoring", "Auto-sync"],
      delay: 1.0,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/50 to-white">
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
          <p className="text-black max-w-2xl mx-auto">
            Unlock the full potential of your AI toolkit with our comprehensive dashboard
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-blue-600 h-full"
          />

          <div className="relative z-10 space-y-24">
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
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-black">
                      {feature.title}
                    </h3>
                    <p className="text-black mb-6">{feature.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {feature.stats.map((stat, i) => (
                        <div key={i} className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">
                            {stat.value}
                          </div>
                          <div className="text-sm text-black">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-black">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="ghost"
                      className="mt-4 text-blue-600 hover:bg-blue-50"
                    >
                      Learn More →
                    </Button>
                  </motion.div>
                </div>

                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center shadow-lg"
                  >
                    <feature.icon className="w-8 h-8 text-blue-600" />
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
