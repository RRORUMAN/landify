
import { Plus } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Tool } from '@/data/types';

interface TeamToolsGridProps {
  tools: (Tool & { folder_id: string })[] | undefined;
}

const TeamToolsGrid = ({ tools }: TeamToolsGridProps) => {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-black dark:text-white">Shared Tools</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Tool
          </Button>
        </div>
        {!tools?.length ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tools have been shared with this team yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools?.map((tool) => (
              <Card key={tool.id} className="p-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={tool.logo} 
                    alt={tool.name} 
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-black dark:text-white">
                      {tool.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default TeamToolsGrid;
