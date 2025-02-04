import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Bookmark, Share2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tool } from "@/data/types";
import { useEffect, useState } from "react";
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

  const handleShare = async () => {
    try {
      await navigator.share({
        title: tool.name,
        text: tool.description,
        url: tool.visit_url,
      });
    } catch (error) {
      navigator.clipboard.writeText(tool.visit_url);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share it with others!",
      });
    }
  };

  return (
    <Card className="group p-6 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={tool.logo} 
                alt={tool.name} 
                className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300" 
              />
              {isOwned && (
                <div className="absolute -top-1 -right-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.floor(tool.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({tool.reviews})</span>
              </div>
            </div>
          </div>
          
          {/* Action Items */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-100"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 text-gray-500" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                {tool.pricing}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                {tool.bookmarks}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {tool.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 bg-gray-50 text-gray-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <Button
            variant="default"
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2"
            onClick={() => window.open(tool.visit_url, "_blank")}
          >
            Visit Tool
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ToolCard;