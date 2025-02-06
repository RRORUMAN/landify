
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tool } from "@/data/types";
import { Check, AlertTriangle, Minus, Info, Star, Zap, Shield, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { ComparisonFeature, FeatureCategory } from "@/types/aiTypes";

interface SmartFeatureMatchProps {
  tools: Tool[];
  featureCategories: FeatureCategory[];
}

export const SmartFeatureMatch = ({ tools, featureCategories }: SmartFeatureMatchProps) => {
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'performance':
        return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'security':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'reliability':
        return <Star className="h-5 w-5 text-purple-500" />;
      case 'scalability':
        return <Clock className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const renderFeatureValue = (value: string | boolean, confidenceScore: number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-500" />
          <Progress className="w-20 h-1.5" value={confidenceScore * 100} />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Minus className="h-5 w-5 text-gray-400" />
          <Progress className="w-20 h-1.5" value={confidenceScore * 100} />
        </div>
      );
    }
    
    if (value.toLowerCase().includes('limited')) {
      return (
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <span className="text-sm">{value}</span>
          <Progress className="w-20 h-1.5" value={confidenceScore * 100} />
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">{value}</span>
        <Progress className="w-20 h-1.5" value={confidenceScore * 100} />
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {featureCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="p-6">
          <div className="flex items-center gap-3 mb-6">
            {getCategoryIcon(category.name)}
            <div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {category.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="border-t pt-4 first:border-t-0 first:pt-0">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-medium">{feature.name}</span>
                  <Badge 
                    variant="secondary" 
                    className={getImportanceColor(feature.importance)}
                  >
                    {feature.importance}
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-sm">{feature.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {feature.values.map((value, vIndex) => {
                    const tool = tools.find(t => t.id === value.toolId);
                    if (!tool) return null;
                    return (
                      <div key={vIndex} className="flex items-start gap-4 p-4 rounded-lg border bg-gray-50">
                        <div className="flex-1">
                          <div className="font-medium text-sm mb-2">{tool.name}</div>
                          <div className="mt-1">
                            {renderFeatureValue(value.value, value.confidenceScore)}
                          </div>
                          {value.notes && (
                            <p className="text-sm text-gray-500 mt-2">{value.notes}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
