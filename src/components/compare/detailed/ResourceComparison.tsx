
import { Tool } from "@/data/types";
import { DetailedComparison } from "@/types/aiTypes";
import { Card } from "@/components/ui/card";
import { Book, Star, Users, RefreshCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResourceComparisonProps {
  tools: Tool[];
  getDetailedComparison: (toolId: string) => DetailedComparison | undefined;
}

const ResourceComparison = ({ tools, getDetailedComparison }: ResourceComparisonProps) => {
  return (
    <div className="space-y-6 mb-8">
      <h3 className="text-lg font-semibold">Training & Resources</h3>
      <div className="grid gap-4">
        {tools.map((tool) => {
          const comparison = getDetailedComparison(tool.id);
          const resources = comparison?.resources || [];

          return (
            <Card key={tool.id} className="p-4">
              <h4 className="font-medium mb-4">{tool.name}</h4>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-4">
                      <Book className="h-4 w-4 text-blue-500" />
                      <h5 className="font-medium text-sm">{resource.resource_type}</h5>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">Quality</span>
                            </div>
                            <span className="text-sm font-medium">
                              {Math.round(resource.quality_score * 100)}%
                            </span>
                          </div>
                          <Progress value={resource.quality_score * 100} className="h-2" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Accessibility</span>
                            </div>
                            <span className="text-sm font-medium">
                              {Math.round(resource.accessibility_score * 100)}%
                            </span>
                          </div>
                          <Progress value={resource.accessibility_score * 100} className="h-2" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Book className="h-4 w-4 text-purple-500" />
                              <span className="text-sm">Comprehensiveness</span>
                            </div>
                            <span className="text-sm font-medium">
                              {Math.round(resource.comprehensiveness_score * 100)}%
                            </span>
                          </div>
                          <Progress value={resource.comprehensiveness_score * 100} className="h-2" />
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <RefreshCcw className="h-4 w-4 text-blue-500" />
                          <span>Update Frequency: {resource.update_frequency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceComparison;
