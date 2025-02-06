
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AICompatibilityScoreProps {
  score: number;
  factors: Record<string, any>;
  useCases: string[];
}

export const AICompatibilityScore = ({ score, factors, useCases }: AICompatibilityScoreProps) => {
  const scorePercentage = Math.round(score * 100);
  
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">AI Compatibility Analysis</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-5 w-5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Compatibility score based on integration capabilities, feature overlap, and user success rates</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Compatibility Score</span>
          <span className="font-medium">{scorePercentage}%</span>
        </div>
        <Progress value={scorePercentage} className="h-2" />
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Integration Factors</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(factors).map(([factor, value]) => (
              <div key={factor} className="text-sm">
                <span className="text-gray-500">{factor}:</span>{" "}
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Recommended Use Cases</h4>
          <ul className="list-disc list-inside space-y-1">
            {useCases.map((useCase, index) => (
              <li key={index} className="text-sm text-gray-600">{useCase}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
