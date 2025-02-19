
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import MyTools from "./pages/MyTools";
import ToolCategories from "./pages/tools/ToolCategories";
import AddTool from "./pages/tools/AddTool";
import CompareTools from "./pages/tools/CompareTools";
import AIRecommendations from "./pages/tools/AIRecommendations";
import Teams from "./pages/teams/Teams";
import TeamDashboard from "./pages/teams/TeamDashboard";
import TeamFolders from "./pages/teams/TeamFolders";
import ReferralProgram from "./pages/teams/ReferralProgram";
import Sidebar from "./components/dashboard/Sidebar";

const queryClient = new QueryClient();

const AppContent = () => {
  const isDashboardRoute = (pathname: string) => {
    return pathname.startsWith('/tools') || pathname === '/my-tools' || pathname.startsWith('/teams');
  };

  // Show navbar only on landing and pricing pages
  const showNavbar = ['/', '/pricing'].includes(window.location.pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {showNavbar && <Navbar />}
      <div className="flex">
        {isDashboardRoute(window.location.pathname) && <Sidebar />}
        <main className={cn(
          "flex-1 transition-colors duration-300",
          isDashboardRoute(window.location.pathname) 
            ? "pl-4 pr-6 pt-6 bg-gray-50 dark:bg-gray-900" 
            : "bg-white dark:bg-gray-900"
        )}>
          <Routes>
            <Route path="/" element={<Navigate to="/my-tools" replace />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/my-tools" element={<MyTools />} />
            <Route path="/tools">
              <Route index element={<ToolCategories />} />
              <Route path="categories" element={<ToolCategories />} />
              <Route path="add" element={<AddTool />} />
              <Route path="compare" element={<CompareTools />} />
              <Route path="recommendations" element={<AIRecommendations />} />
            </Route>
            <Route path="/teams">
              <Route index element={<Teams />} />
              <Route path=":teamId" element={<TeamDashboard />} />
              <Route path=":teamId/folders/*" element={<TeamFolders />} />
              <Route path="referral" element={<ReferralProgram />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
