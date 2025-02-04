import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import MyTools from "./pages/MyTools";
import ToolCategories from "./pages/tools/ToolCategories";
import AddTool from "./pages/tools/AddTool";
import CompareTools from "./pages/tools/CompareTools";
import AIRecommendations from "./pages/tools/AIRecommendations";
import Analytics from "./pages/tools/Analytics";
import Sidebar from "./components/dashboard/Sidebar";

function App() {
  const isDashboardRoute = (pathname: string) => {
    return pathname.startsWith('/tools') || pathname === '/my-tools';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {!isDashboardRoute(window.location.pathname) && <Navbar />}
        <div className="flex">
          {isDashboardRoute(window.location.pathname) && <Sidebar />}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/features" element={<Features />} />
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
    </Router>
  );
}

export default App;