
import { Tool } from "@/data/types";
import { ComparisonFeature } from "@/types/aiTypes";
import FeatureGroup from "../features/FeatureGroup";

interface FeatureGroupListProps {
  featuresByGroup: Record<string, { category: string; group: string; features: Set<string> }>;
  tools: Tool[];
  getFeatureValue: (toolId: string, featureName: string) => ComparisonFeature | undefined;
}

const FeatureGroupList = ({ featuresByGroup, tools, getFeatureValue }: FeatureGroupListProps) => {
  return (
    <>
      {Object.entries(featuresByGroup).map(([groupKey, { category, group, features }]) => (
        <FeatureGroup
          key={groupKey}
          category={category}
          group={group}
          features={features}
          tools={tools}
          getFeatureValue={getFeatureValue}
        />
      ))}
    </>
  );
};

export default FeatureGroupList;

