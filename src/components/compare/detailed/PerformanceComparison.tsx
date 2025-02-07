
import { Tool } from "@/data/types";
import { DetailedComparison } from "@/types/aiTypes";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, Clock, Scale, User, DollarSign, HeartHandshake, Shield, Settings } from "lucide-react";

interface PerformanceComparisonProps {
  tools: Tool[];
  getDetailedComparison: (toolId: string) => DetailedComparison | undefined;
}

const PerformanceComparison = ({ tools, getDetailedComparison }: PerformanceComparisonProps) => {
  const metrics = [
    { key: 'accuracy_score', label: 'Accuracy', icon: Zap },
    { key: 'response_time', label: 'Response Time', icon: Clock },
    { key: 'scalability_score', label: 'Scalability', icon: Scale },
    { key: 'ease_of_use_score', label: 'Ease of Use', icon: User },
    { key: 'cost_efficiency_score', label: 'Cost Efficiency', icon: DollarSign },
    { key: 'support_quality_score', label: 'Support Quality', icon: HeartHandshake },
    { key: 'api_reliability_score', label: 'API Reliability', icon: Shield },
    { key: 'customization_score', label: 'Customization', icon: Settings },
  ];

  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-lg font-semibold">Performance Metrics</h3>
      <div className="grid gap-4">
        {metrics.map(({ key, label, icon: Icon }) => (
          <Card key={key} className="p-4">
            <div className="grid grid-cols-[1fr,repeat(4,1fr)] gap-4">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">{label}</span>
              </div>
              {tools.map((tool) => {
                const comparison = getDetailedComparison(tool.id);
                const score = comparison?.performance?.[key as keyof typeof comparison.performance] || 0;
                
                return (
                  <div key={tool.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{Math.round(Number(score) * 100)}%</span>
                    </div>
                    <Progress value={Number(score) * 100} className="h-2" />
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PerformanceComparison;
