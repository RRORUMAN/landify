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
    },
    {
      title: "Add Own Tools",
      icon: Plus,
      path: "/tools/add",
      description: "Add and manage your custom tools",
    },
    {
      title: "Compare Tools",
      icon: Scale,
      path: "/tools/compare",
      description: "Compare different tools side by side",
    },
    {
      title: "AI Tool Recommendations",
      icon: Brain,
      path: "/tools/recommendations",
      description: "Get personalized AI tool suggestions",
    },
  ];

  return (
    <div className="min-h-screen w-64 bg-white border-r border-gray-100 p-4">
      <div className="space-y-6">
        <div className="px-2">
          <h2 className="text-lg font-semibold text-gray-900">Tools Dashboard</h2>
          <p className="text-sm text-gray-500">Manage and discover AI tools</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon className="h-5 w-5" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-xs text-gray-400">{item.description}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;