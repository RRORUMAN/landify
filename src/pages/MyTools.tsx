
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tool, tools as allTools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MyTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserTools = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }

        const { data: userTools, error } = await supabase
          .from("user_tools")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        const userToolsWithData = userTools
          .map(userTool => allTools.find(tool => tool.id === userTool.tool_id))
          .filter((tool): tool is Tool => tool !== undefined);

        setTools(userToolsWithData);
      } catch (error) {
        console.error("Error fetching tools:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch your tools. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserTools();
  }, [navigate, toast]);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">My Tools</h1>
          </div>
          <Button
            onClick={() => navigate("/tools")}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Tools
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div 
                key={index} 
                className="h-[300px] bg-gray-50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Tools Yet</h3>
            <p className="text-gray-600 mb-6">Start building your collection by adding some tools.</p>
            <Button
              onClick={() => navigate("/tools")}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Browse Tools
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTools;
