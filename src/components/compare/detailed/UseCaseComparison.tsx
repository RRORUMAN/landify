
import { Tool } from "@/data/types";
import { DetailedComparison } from "@/types/aiTypes";
import { Card } from "@/components/ui/card";
import { Check, AlertTriangle, Clock, DollarSign } from "lucide-react";

interface UseCaseComparisonProps {
  tools: Tool[];
  getDetailedComparison: (toolId: string) => DetailedComparison | undefined;
}

const UseCaseComparison = ({ tools, getDetailedComparison }: UseCaseComparisonProps) => {
  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-lg font-semibold">Use Cases</h3>
      <div className="grid gap-4">
        {tools.map((tool) => {
          const comparison = getDetailedComparison(tool.id);
          const useCases = comparison?.useCases || [];

          return (
            <Card key={tool.id} className="p-4">
              <h4 className="font-medium mb-4">{tool.name}</h4>
              <div className="space-y-4">
                {useCases.map((useCase, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2">{useCase.use_case}</h5>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Effectiveness: {Math.round(useCase.effectiveness_score * 100)}%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span>Complexity: {Math.round(useCase.implementation_complexity * 100)}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>Time Savings: {Math.round(useCase.time_savings)}hrs/month</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span>Cost Impact: ${Math.round(useCase.cost_impact)}/month</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UseCaseComparison;
