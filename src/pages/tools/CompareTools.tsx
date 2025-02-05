
import CompareToolsComponent from "@/components/CompareTools";
import { Toaster } from "@/components/ui/toaster";

const CompareTools = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Compare AI Tools</h1>
        <p className="text-gray-600">Get detailed insights and comparisons between different AI tools</p>
      </div>
      
      <CompareToolsComponent />
      <Toaster />
    </div>
  );
};

export default CompareTools;
