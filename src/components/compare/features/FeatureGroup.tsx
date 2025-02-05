
import { Building2, Zap, Trophy, Award, Gauge } from "lucide-react";
import FeatureRow from "./FeatureRow";
import { Tool } from "@/data/types";

interface Feature {
  tool_id: string;
  feature_category: string;
  feature_group: string;
  feature_name: string;
  feature_value: string;
  is_premium: boolean;
  importance: 'high' | 'medium' | 'low';
  help_text: string | null;
  sort_order: number;
}

interface FeatureGroupProps {
  category: string;
  group: string;
  features: Set<string>;
  tools: Tool[];
  getFeatureValue: (toolId: string, featureName: string) => Feature | undefined;
}

const FeatureGroup = ({ category, group, features, tools, getFeatureValue }: FeatureGroupProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Core Features':
        return <Building2 className="h-5 w-5 text-blue-500" />;
      case 'AI Capabilities':
        return <Zap className="h-5 w-5 text-purple-500" />;
      case 'Security':
        return <Trophy className="h-5 w-5 text-green-500" />;
      case 'Enterprise':
        return <Building2 className="h-5 w-5 text-gray-500" />;
      case 'Analytics':
        return <Gauge className="h-5 w-5 text-orange-500" />;
      default:
        return <Award className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="mb-8">
      <div className="sticky top-0 bg-white py-2">
        <div className="flex items-center gap-2 mb-2">
          {getCategoryIcon(category)}
          <h3 className="text-lg font-semibold">{category}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">{group}</p>
      </div>
      <div className="space-y-3">
        {Array.from(features).map((featureName) => (
          <FeatureRow
            key={featureName}
            featureName={featureName}
            tools={tools}
            getFeatureValue={getFeatureValue}
            feature={getFeatureValue(tools[0]?.id, featureName)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureGroup;
