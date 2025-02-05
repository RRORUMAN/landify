
import { Tool } from "@/data/types";
import { Check, X, Award } from "lucide-react";

interface SentimentAnalysisProps {
  sentiment: any;
}

const SentimentAnalysis = ({ sentiment }: SentimentAnalysisProps) => {
  if (!sentiment) return null;

  return (
    <>
      <div className="pt-4 border-t">
        <h4 className="font-medium mb-3 text-sm">Key Strengths</h4>
        <div className="space-y-2">
          {sentiment.pros?.slice(0, 3).map((pro: string, index: number) => (
            <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{pro}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <h4 className="font-medium mb-3 text-sm">Limitations</h4>
        <div className="space-y-2">
          {sentiment.cons?.slice(0, 3).map((con: string, index: number) => (
            <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
              <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{con}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <h4 className="font-medium mb-3 text-sm">Key Insights</h4>
        <div className="space-y-2">
          {sentiment.key_insights?.slice(0, 2).map((insight: string, index: number) => (
            <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
              <Award className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{insight}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SentimentAnalysis;
