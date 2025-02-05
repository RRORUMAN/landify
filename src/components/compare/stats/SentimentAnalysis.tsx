
import { Check, X, Lightbulb } from "lucide-react";

interface SentimentProps {
  pros?: string[];
  cons?: string[];
  key_insights?: string[];
}

const SentimentAnalysis = ({ pros, cons, key_insights }: SentimentProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Key Strengths</h4>
        <div className="space-y-2">
          {pros?.slice(0, 3).map((pro, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{pro}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Limitations</h4>
        <div className="space-y-2">
          {cons?.slice(0, 3).map((con, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span>{con}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Key Insights</h4>
        <div className="space-y-2">
          {key_insights?.slice(0, 2).map((insight, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>{insight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
