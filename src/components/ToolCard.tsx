
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tool } from "@/data/types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { trackToolInteraction } from "@/utils/toolAnalytics";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const { toast } = useToast();
  const [isOwned, setIsOwned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(tool.bookmarks);

  useEffect(() => {
    const checkToolOwnership = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      try {
        const { data: userTool } = await supabase
          .from('user_tools')
          .select('*')
          .eq('tool_id', tool.id)
          .eq('user_id', user.id)
          .maybeSingle();
        
        setIsOwned(!!userTool);
      } catch (error) {
        console.error('Error checking tool ownership:', error);
        setIsOwned(false);
      }
    };

    checkToolOwnership();
    // Track view when component mounts
    trackToolInteraction(tool.id, 'view');
  }, [tool.id]);

  const handleVisit = () => {
    trackToolInteraction(tool.id, 'click');
    window.open(tool.visit_url, "_blank");
  };

  const handleBookmark = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to bookmark tools.",
        variant: "destructive",
      });
      return;
    }

    try {
      trackToolInteraction(tool.id, 'bookmark');
      
      const { data: toolData } = await supabase
        .from('tools')
        .select('bookmarks')
        .eq('id', tool.id)
        .single();

      if (toolData) {
        const newCount = toolData.bookmarks + 1;
        await supabase
          .from('tools')
          .update({ bookmarks: newCount })
          .eq('id', tool.id);

        setBookmarkCount(newCount);
        
        toast({
          title: "Tool bookmarked",
          description: "This tool has been added to your bookmarks.",
        });
      }
    } catch (error) {
      console.error('Error bookmarking tool:', error);
      toast({
        title: "Error",
        description: "Failed to bookmark tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-900/80 dark:border-gray-800">
        <div className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <motion.div 
                className="flex items-center gap-3"
                animate={{ scale: isHovered ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={tool.logo} 
                  alt={tool.name} 
                  className="w-[60px] h-[60px] rounded-lg object-cover bg-gray-50 transition-transform duration-300"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {tool.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 transition-colors duration-300 ${
                          i < Math.floor(tool.rating) 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-200 dark:text-gray-700"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      ({tool.reviews})
                    </span>
                  </div>
                </div>
              </motion.div>
              <motion.span 
                className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookmark}
              >
                <Bookmark className="h-4 w-4" />
                {bookmarkCount}
              </motion.span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              {tool.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="default"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300"
                onClick={handleVisit}
              >
                Visit
              </Button>
              {tool.special_pricing && (
                <Button
                  variant="outline"
                  className="flex-1 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
                  onClick={() => window.open(tool.visit_url, "_blank")}
                >
                  Get Deal
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ToolCard;
