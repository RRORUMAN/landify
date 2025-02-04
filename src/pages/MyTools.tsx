import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tool } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTools = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("user_tools")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        // Here you would typically fetch the full tool details for each tool_id
        // For now, we'll just display the IDs
        setTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTools();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Tools</h1>
          <Button
            onClick={() => navigate("/tools")}
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black"
          >
            Browse Tools
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : tools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">You haven't saved any tools yet.</p>
            <Button
              onClick={() => navigate("/tools")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Discover Tools
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