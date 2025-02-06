
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, LayoutGrid, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardHeaderProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const DashboardHeader = ({ viewMode, setViewMode }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-900 hover:bg-transparent"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-semibold text-gray-900">My Tools</h1>
      </div>
      <div className="flex items-center gap-4">
        <Tabs defaultValue={viewMode} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="grid" 
              onClick={() => setViewMode('grid')}
              className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white hover:bg-transparent"
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Grid
            </TabsTrigger>
            <TabsTrigger 
              value="list" 
              onClick={() => setViewMode('list')}
              className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white hover:bg-transparent"
            >
              <Activity className="w-4 h-4 mr-2" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          onClick={() => navigate("/tools/add")}
          className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Tools
        </Button>
      </div>
    </div>
  );
};
