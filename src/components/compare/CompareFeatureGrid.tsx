
import { Tool } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";

interface CompareFeatureGridProps {
  tools: Tool[];
}

const CompareFeatureGrid = ({ tools }: CompareFeatureGridProps) => {
  const featureCategories = [
    {
      name: "Key Features",
      features: ["AI Generation", "Templates", "API Access", "Team Collaboration"]
    },
    {
      name: "Integrations",
      features: ["Slack", "Google Drive", "GitHub", "MS Office"]
    },
    {
      name: "Support & Security",
      features: ["24/7 Support", "SOC2 Compliance", "Custom Training", "SLA"]
    }
  ];

  return (
    <ScrollArea className="h-[500px] w-full rounded-md border p-4">
      {featureCategories.map((category) => (
        <div key={category.name} className="mb-8">
          <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
          <div className="space-y-2">
            {category.features.map((feature) => (
              <div key={feature} className="grid grid-cols-[1fr,repeat(2,1fr)] gap-4 items-center">
                <span className="text-sm text-gray-600">{feature}</span>
                {tools.map((tool) => (
                  <div key={tool.id} className="flex items-center justify-center">
                    {Math.random() > 0.3 ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default CompareFeatureGrid;
