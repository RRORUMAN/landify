import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Bookmark, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      await navigator.share({
        title: tool.name,
        text: tool.description,
        url: tool.visitUrl,
      });
    } catch (error) {
      navigator.clipboard.writeText(tool.visitUrl);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share it with others!",
      });
    }
  };

  return (
    <Card className="p-6 bg-white border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img src={tool.logo} alt={tool.name} className="w-12 h-12 rounded-lg" />
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{tool.name}</h3>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(tool.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({tool.reviews})</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 text-gray-500" />
          </Button>
          <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
            {tool.pricing}
          </span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Bookmark className="h-4 w-4" />
            {tool.bookmarks}
          </span>
        </div>
      </div>
      
      <p className="mt-4 text-gray-600 line-clamp-2">{tool.description}</p>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="mt-6 flex gap-3">
        <Button
          variant="default"
          className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white"
          onClick={() => window.open(tool.visitUrl, "_blank")}
        >
          Visit
        </Button>
        {tool.dealUrl && (
          <Button
            variant="outline"
            className="flex-1 border-gray-200 hover:bg-gray-50"
            onClick={() => window.open(tool.dealUrl, "_blank")}
          >
            Get Deal
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ToolCard;