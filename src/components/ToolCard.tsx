
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Bookmark, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tool } from "@/data/types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { trackToolInteraction } from "@/utils/toolAnalytics";

export interface ToolCardProps {
  tool: Tool & {
    monthly_cost?: number;
    billing_cycle?: string;
    next_billing_date?: string;
    subscription_status?: string;
  };
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(tool.bookmarks || 0);
  const isTrending = tool.trending_tools && tool.trending_tools.length > 0;

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
      <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <motion.div 
                className="flex items-center gap-3"
                animate={{ scale: isHovered ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <img 
                    src={tool.logo} 
                    alt={tool.name} 
                    className="w-[60px] h-[60px] rounded-lg object-cover"
                  />
                  {isTrending && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Trending
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {tool.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
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
              <div className="flex flex-col items-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookmark}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Bookmark className="h-4 w-4" />
                </motion.button>
                {tool.monthly_cost !== undefined && (
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${tool.monthly_cost}/mo
                    </p>
                    {tool.billing_cycle && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Billed {tool.billing_cycle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
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

              {tool.subscription_status && (
                <div className={`text-sm px-3 py-1 rounded-full inline-block ${
                  tool.subscription_status === 'active' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {tool.subscription_status.charAt(0).toUpperCase() + tool.subscription_status.slice(1)}
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleVisit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Visit Tool <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ToolCard;
