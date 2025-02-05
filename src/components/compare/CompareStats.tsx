
import { Tool } from "@/data/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ThumbsUp, DollarSign } from "lucide-react";

interface CompareStatsProps {
  tools: Tool[];
}

const CompareStats = ({ tools }: CompareStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool) => (
        <Card key={tool.id} className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <img src={tool.logo} alt={tool.name} className="w-16 h-16 rounded-lg" />
            <div>
              <h3 className="font-semibold text-lg">{tool.name}</h3>
              <p className="text-sm text-gray-500">{tool.pricing}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">Rating</span>
              </div>
              <span className="text-sm">{tool.rating}/5 ({tool.reviews} reviews)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Avg. Response Time</span>
              </div>
              <span className="text-sm">0.8s</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <span className="text-sm">98%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">Value Score</span>
              </div>
              <span className="text-sm">8.7/10</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">Key Differentiators</h4>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CompareStats;

