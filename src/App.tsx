
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import MyTools from "./pages/MyTools";
import ToolCategories from "./pages/tools/ToolCategories";
import AddTool from "./pages/tools/AddTool";
import CompareTools from "./pages/tools/CompareTools";
import AIRecommendations from "./pages/tools/AIRecommendations";
import Analytics from "./pages/tools/Analytics";
import Sidebar from "./components/dashboard/Sidebar";

// Create a client
const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  
  const isDashboardRoute = (pathname: string) => {
    return pathname.startsWith('/tools') || pathname === '/my-tools';
  };

  const showNavbar = ['/', '/pricing'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {showNavbar && <Navbar />}
      <div className="flex">
        {isDashboardRoute(location.pathname) && <Sidebar />}
        <main className={`flex-1 ${isDashboardRoute(location.pathname) ? 'pl-4 pr-6 pt-6' : ''} bg-white dark:bg-gray-900`}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/my-tools" element={<MyTools />} />
            <Route path="/tools">
              <Route index element={<Navigate to="/tools/categories" replace />} />
              <Route path="categories" element={<ToolCategories />} />
              <Route path="add" element={<AddTool />} />
              <Route path="compare" element={<CompareTools />} />
              <Route path="recommendations" element={<AIRecommendations />} />
              <Route path="analytics" element={<Analytics />} />
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
