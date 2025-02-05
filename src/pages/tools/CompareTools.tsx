
import CompareToolsComponent from "@/components/CompareTools";
import { Toaster } from "@/components/ui/toaster";

const CompareTools = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Compare Tools</h1>
        <p className="text-gray-600">Compare different AI tools side by side with advanced analytics</p>
      </div>
      
      <CompareToolsComponent />
      <Toaster />
    </div>
  );
};

export default CompareTools;
