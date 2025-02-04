import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Plus, Scale, Brain } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Search Tools by Categories",
      icon: Search,
      path: "/tools/categories",
      description: "Browse tools organized by category",
      isNew: false,
    },
    {
      title: "Add Own Tools",
      icon: Plus,
      path: "/tools/add",
      description: "Add and manage your custom tools",
      isNew: true,
    },
    {
      title: "Compare Tools",
      icon: Scale,
      path: "/tools/compare",
      description: "Compare different tools side by side",
      isNew: false,
    },
    {
      title: "AI Tool Recommendations",
      icon: Brain,
      path: "/tools/recommendations",
      description: "Get personalized AI tool suggestions",
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen w-64 bg-white border-r border-gray-100 shadow-xl p-4 relative">
      <div className="space-y-6">
        <div className="px-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Tools Dashboard</h2>
          <p className="text-sm text-gray-500">Manage and discover AI tools</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={cn(
                "group flex items-start gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden",
                location.pathname === item.path
                  ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg transform -translate-x-1"
                  : "text-gray-600 hover:bg-gray-50 hover:shadow-md"
              )}
            >
              {item.isNew && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              )}
              <item.icon className={cn(
                "h-5 w-5 mt-0.5 transition-transform duration-300 group-hover:scale-110",
                location.pathname === item.path
                  ? "text-white"
                  : "text-gray-400 group-hover:text-gray-600"
              )} />
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none mb-1">{item.title}</span>
                <span className={cn(
                  "text-xs transition-colors duration-300",
                  location.pathname === item.path
                    ? "text-gray-200"
                    : "text-gray-400 group-hover:text-gray-500"
                )}>{item.description}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-1">Need Help?</h3>
            <p className="text-xs text-blue-700">Check out our guide on how to make the most of your AI tools.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;