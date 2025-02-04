import { Clock } from "lucide-react";
import { tools } from "@/data/tools";
import ToolCard from "./ToolCard";

const RecentlyAdded = () => {
  // Get the 4 most recent tools
  const recentTools = tools
    .sort((a, b) => b.bookmarks - a.bookmarks)
    .slice(0, 4);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Recently Added</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;