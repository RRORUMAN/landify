
import { Tool } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Check, X, Minus, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Feature {
  tool_id: string;
  feature_name: string;
  feature_value: string;
  is_premium: boolean;
  importance: 'high' | 'medium' | 'low';
  help_text: string | null;
}

interface FeatureRowProps {
  featureName: string;
  tools: Tool[];
  getFeatureValue: (toolId: string, featureName: string) => Feature | undefined;
  feature?: Feature;
}

const FeatureRow = ({ featureName, tools, getFeatureValue, feature }: FeatureRowProps) => {
  const renderImportanceBadge = (importance: 'high' | 'medium' | 'low') => {
    const styles = {
      high: 'bg-red-50 text-red-700 border-red-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      low: 'bg-green-50 text-green-700 border-green-200'
    };

    const labels = {
      high: 'Critical',
      medium: 'Important',
      low: 'Nice to Have'
    };

    return (
      <Badge 
        variant="secondary" 
        className={`text-xs px-2 py-0.5 border ${styles[importance]}`}
      >
        {labels[importance]}
      </Badge>
    );
  };

  const renderFeatureValue = (value: string | undefined, feature: Feature | undefined) => {
    if (!feature) return <X className="h-5 w-5 text-red-500" />;
    
    if (value === "true" || value === "Yes") {
      return (
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-500" />
          {feature.is_premium && (
            <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700">
              Premium
            </Badge>
          )}
        </div>
      );
    }
    
    if (value === "false" || value === "No") {
      return <Minus className="h-5 w-5 text-gray-400" />;
    }

    if (value?.includes('Limited')) {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs bg-yellow-50 text-yellow-700">
            Limited
          </Badge>
          {feature.is_premium && (
            <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700">
              Premium
            </Badge>
          )}
        </div>
      );
    }

    if (value?.includes('Add-on') || value?.includes('Required')) {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
            Add-on
          </Badge>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{value}</span>
        {feature.is_premium && (
          <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700">
            Premium
          </Badge>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-[1fr,repeat(4,1fr)] gap-4 items-center py-3 border-t border-gray-100 hover:bg-gray-50/50">
      <div className="flex items-start gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{featureName}</span>
            {feature?.help_text && (
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">{feature.help_text}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          {feature?.importance && (
            <div>{renderImportanceBadge(feature.importance)}</div>
          )}
        </div>
      </div>
      {tools.map((tool) => (
        <div key={tool.id} className="flex justify-center">
          {renderFeatureValue(
            getFeatureValue(tool.id, featureName)?.feature_value,
            getFeatureValue(tool.id, featureName)
          )}
        </div>
      ))}
    </div>
  );
};

export default FeatureRow;
