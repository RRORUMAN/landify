
import { Tool } from "@/data/types";
import { DetailedComparison } from "@/types/aiTypes";
import PerformanceComparison from "../detailed/PerformanceComparison";
import UseCaseComparison from "../detailed/UseCaseComparison";
import SecurityComparison from "../detailed/SecurityComparison";
import ResourceComparison from "../detailed/ResourceComparison";
import PricingComparison from "../detailed/PricingComparison";

interface DetailedComparisonProps {
  tools: Tool[];
  getDetailedComparison: (toolId: string) => DetailedComparison | undefined;
}

const DetailedComparisons = ({ tools, getDetailedComparison }: DetailedComparisonProps) => {
  return (
    <>
      <PerformanceComparison
        tools={tools}
        getDetailedComparison={getDetailedComparison}
      />

      <UseCaseComparison
        tools={tools}
        getDetailedComparison={getDetailedComparison}
      />

      <SecurityComparison
        tools={tools}
        getDetailedComparison={getDetailedComparison}
      />

      <ResourceComparison
        tools={tools}
        getDetailedComparison={getDetailedComparison}
      />

      <PricingComparison
        tools={tools}
        getDetailedComparison={getDetailedComparison}
      />
    </>
  );
};

export default DetailedComparisons;

