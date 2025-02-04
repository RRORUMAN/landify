import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tool, tools as allTools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";

const MyTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

        // Map user tools to actual tool data
        const userToolsWithData = userTools
          .map(userTool => allTools.find(tool => tool.id === userTool.tool_id))
          .filter((tool): tool is Tool => tool !== undefined);

        setTools(userToolsWithData);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTools();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-primary hover:bg-gray-100"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold text-primary">My Tools</h1>
          </div>
          <Button
            onClick={() => navigate("/tools")}
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Tools
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm p-8 animate-fade-in">
            <h3 className="text-xl font-semibold mb-2 text-primary">No Tools Yet</h3>
            <p className="text-gray-600 mb-6">Start building your collection by adding some tools.</p>
            <Button
              onClick={() => navigate("/tools")}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Browse Tools
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
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