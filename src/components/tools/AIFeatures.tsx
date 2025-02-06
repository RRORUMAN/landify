
import { Brain, TrendingUp, Users, LineChart, Clock } from "lucide-react";
import AIFeatureCard from "./AIFeatureCard";
import { Card } from "@/components/ui/card";

export const AIFeatures = () => {
  const aiFeatures = [
    {
      title: "Workflow Optimization",
      description: "AI suggestions for task automation",
      icon: <Brain className="w-4 h-4" />,
      type: "optimization" as const,
      score: 85,
    },
    {
      title: "Budget Insights",
      description: "Cost-saving opportunities",
      icon: <TrendingUp className="w-4 h-4" />,
      type: "optimization" as const,
      score: 92,
    },
    {
      title: "Team Insights",
      description: "Tool usage patterns",
      icon: <Users className="w-4 h-4" />,
      type: "insight" as const,
      score: 78,
    }
  ];

  return (
    <Card className="p-4">
      <h2 className="text-sm font-medium mb-3">AI-Powered Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {aiFeatures.map((feature, index) => (
          <AIFeatureCard key={index} {...feature} />
        ))}
      </div>
    </Card>
  );
};
