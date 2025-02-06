
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tool } from "@/data/types";
import { Check, AlertTriangle, Minus } from "lucide-react";

interface SmartFeatureMatchProps {
  tools: Tool[];
  features: Array<{
    name: string;
    importance: 'high' | 'medium' | 'low';
    values: Array<{
      toolId: string;
      value: string | boolean;
      notes?: string;
    }>;
  }>;
}

export const SmartFeatureMatch = ({ tools, features }: SmartFeatureMatchProps) => {
  const getImportanceColor = (importance: string) => {
    switch (importance) {
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

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <Minus className="h-5 w-5 text-gray-400" />
      );
    }
    
    if (value.toLowerCase().includes('limited')) {
      return (
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <span className="text-sm">{value}</span>
        </div>
      );
    }

    return <span className="text-sm">{value}</span>;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Smart Feature Analysis</h3>
      
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div key={index} className="border-t pt-4 first:border-t-0 first:pt-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-medium">{feature.name}</span>
              <Badge variant="secondary" className={getImportanceColor(feature.importance)}>
                {feature.importance}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {feature.values.map((value, vIndex) => {
                const tool = tools.find(t => t.id === value.toolId);
                return (
                  <div key={vIndex} className="flex items-center gap-4">
                    <img src={tool?.logo} alt={tool?.name} className="w-8 h-8 rounded" />
                    <div>
                      <div className="font-medium text-sm">{tool?.name}</div>
                      <div className="mt-1">{renderFeatureValue(value.value)}</div>
                      {value.notes && (
                        <p className="text-sm text-gray-500 mt-1">{value.notes}</p>
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
  );
};
