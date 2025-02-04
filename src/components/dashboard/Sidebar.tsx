import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Grid, ArrowLeft, Tool, Scale } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "All Tools",
      icon: Grid,
      path: "/tools",
    },
    {
      title: "My Tools",
      icon: Tool,
      path: "/my-tools",
    },
    {
      title: "Compare Tools",
      icon: Scale,
      path: "/tools",
      hash: "#compare",
    },
  ];

  return (
    <div className="min-h-screen w-64 bg-white border-r border-gray-100 p-4">
      <Link to="/" className="flex items-center gap-2 mb-8 px-2">
        <ArrowLeft className="h-5 w-5 text-gray-500" />
        <span className="font-semibold text-gray-700">Back to Home</span>
      </Link>
      
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={`${item.path}${item.hash || ""}`}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-colors",
              location.pathname === item.path
                ? "bg-brand-blue text-primary font-medium"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;