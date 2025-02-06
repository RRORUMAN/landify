
import { useState } from "react";
import { Tool } from "@/data/types";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";
import ToolSelectionCard from "./ToolSelectionCard";
import CompareToolsSection from "./CompareToolsSection";
import { useToolsQuery } from "@/hooks/useToolsQuery";

const ComparePage = () => {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const { toast } = useToast();

  const { data: tools = [], isLoading } = useToolsQuery(selectedCategory);

  const handleSelectTool = (tool: Tool) => {
    if (selectedTools.length < 4 && !selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool]);
      setIsSelecting(false);
    } else if (selectedTools.length >= 4) {
      toast({
        title: "Maximum tools reached",
        description: "You can compare up to 4 tools at a time.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveTool = (tool: Tool) => {
    setSelectedTools(selectedTools.filter((t) => t.id !== tool.id));
  };

  const handleReset = () => {
    setSelectedTools([]);
    setIsSelecting(false);
    setSelectedCategory(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Compare AI Tools</h1>
        <p className="text-gray-600">Get detailed insights and comparisons between different AI tools</p>
      </div>
      
      {!isSelecting && selectedTools.length > 0 ? (
        <CompareToolsSection
          selectedTools={selectedTools}
          handleReset={handleReset}
          handleRemoveTool={handleRemoveTool}
          setIsSelecting={setIsSelecting}
        />
      ) : (
        <ToolSelectionCard
          tools={tools}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSelectTool={handleSelectTool}
          selectedTools={selectedTools}
          setIsSelecting={setIsSelecting}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default ComparePage;
