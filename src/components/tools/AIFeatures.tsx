
import { Brain, TrendingUp, Users, LineChart, Clock } from "lucide-react";
import AIFeatureCard from "./AIFeatureCard";

export const AIFeatures = () => {
  const aiFeatures = [
    {
      title: "Workflow Optimization",
      description: "AI-generated suggestions for automating repetitive tasks",
      icon: <Brain className="w-5 h-5" />,
      type: "optimization" as const,
      score: 85,
    },
    {
      title: "Budget Optimization",
      description: "Smart recommendations for cost-saving opportunities",
      icon: <TrendingUp className="w-5 h-5" />,
      type: "optimization" as const,
      score: 92,
    },
    {
      title: "Team Collaboration Insights",
      description: "AI analysis of tool usage across team members",
      icon: <Users className="w-5 h-5" />,
      type: "insight" as const,
      score: 78,
    },
    {
      title: "Performance Benchmarking",
      description: "Compare your tool usage against industry standards",
      icon: <LineChart className="w-5 h-5" />,
      type: "insight" as const,
      score: 88,
    },
    {
      title: "Predictive Tool Needs",
      description: "AI forecasting of future tool requirements based on growth patterns",
      icon: <Clock className="w-5 h-5" />,
      type: "prediction" as const,
      score: 75,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">AI Insights & Optimization</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {aiFeatures.map((feature, index) => (
          <AIFeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};
