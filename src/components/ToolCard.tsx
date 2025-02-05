
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tool } from "@/data/tools";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const { toast } = useToast();
  const [isOwned, setIsOwned] = useState(false);

  useEffect(() => {
    const checkToolOwnership = async () => {
      try {
        const { data: userTool } = await supabase
          .from('user_tools')
          .select('*')
          .eq('tool_id', tool.id)
          .maybeSingle();
        
        setIsOwned(!!userTool);
      } catch (error) {
        console.error('Error checking tool ownership:', error);
        setIsOwned(false);
      }
    };

    checkToolOwnership();
  }, [tool.id]);

  return (
    <Card className="overflow-hidden bg-white border border-gray-100 rounded-lg hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img 
                src={tool.logo} 
                alt={tool.name} 
                className="w-12 h-12 rounded-lg object-cover bg-gray-100"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {tool.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(tool.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">({tool.reviews})</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                {tool.bookmarks}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {tool.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="default"
              className="flex-1 bg-black hover:bg-gray-800 text-white"
              onClick={() => window.open(tool.visit_url, "_blank")}
            >
              Visit
            </Button>
            {tool.dealUrl && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(tool.dealUrl, "_blank")}
              >
                Get Deal
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ToolCard;
