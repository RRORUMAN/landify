
import { Tool } from "@/data/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SelectedToolsGrid from "./SelectedToolsGrid";
import CompareStats from "./CompareStats";

interface CompareToolsSectionProps {
  selectedTools: Tool[];
  handleReset: () => void;
  handleRemoveTool: (tool: Tool) => void;
  setIsSelecting: (value: boolean) => void;
}

const CompareToolsSection = ({ 
  selectedTools, 
  handleReset, 
  handleRemoveTool,
  setIsSelecting 
}: CompareToolsSectionProps) => {
  const { toast } = useToast();

  const handleSaveComparison = async () => {
    if (!selectedTools.length) return;

    try {
      const { error } = await supabase.from('saved_comparisons').insert({
        name: `Comparison ${new Date().toLocaleDateString()}`,
        tool_ids: selectedTools.map(t => t.id),
        comparison_data: {
          toolIds: selectedTools.map(t => t.id),
          timestamp: new Date().toISOString(),
          toolNames: selectedTools.map(t => t.name)
        }
      });

      if (error) throw error;

      toast({
        title: "Comparison Saved",
        description: "You can access this comparison later from your dashboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save comparison. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleReset}
          className="flex items-center gap-2 text-black hover:text-black/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Compare Different Tools
        </Button>
        <Button
          variant="default"
          onClick={handleSaveComparison}
          className="flex items-center gap-2 bg-[#2563EB] text-white hover:bg-[#2563EB]/90"
        >
          <Save className="h-4 w-4" />
          Save Comparison
        </Button>
      </div>

      <SelectedToolsGrid
        selectedTools={selectedTools}
        handleRemoveTool={handleRemoveTool}
        setIsSelecting={setIsSelecting}
      />

      <CompareStats tools={selectedTools} />
    </div>
  );
};

export default CompareToolsSection;
