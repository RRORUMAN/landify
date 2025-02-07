
import { Tool } from "@/data/types";
import { DetailedComparison } from "@/types/aiTypes";
import { AICompatibilityScore } from "../AICompatibilityScore";

interface AICompatibilitySectionProps {
  tools: Tool[];
  getDetailedComparison: (toolId: string) => DetailedComparison | undefined;
}

const AICompatibilitySection = ({ tools, getDetailedComparison }: AICompatibilitySectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool) => {
        const comparison = getDetailedComparison(tool.id);
        if (!comparison) return null;
        
        return (
          <AICompatibilityScore
            key={tool.id}
            score={comparison.performance?.accuracy_score || 0}
            factors={{
              'API Reliability': comparison.performance?.api_reliability_score || 0,
              'Cost Efficiency': comparison.performance?.cost_efficiency_score || 0,
              'Support Quality': comparison.performance?.support_quality_score || 0,
            }}
            useCases={comparison.useCases?.map(uc => uc.use_case) || []}
          />
        );
      })}
    </div>
  );
};

export default AICompatibilitySection;

