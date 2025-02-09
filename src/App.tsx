
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
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
import { useAuth } from "./hooks/useAuth";
import { useToast } from "./hooks/use-toast";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    toast({
      title: "Authentication required",
      description: "Please sign in to access this page",
      variant: "destructive",
    });
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  const location = useLocation();
  
  const isDashboardRoute = (pathname: string) => {
    return pathname.startsWith('/tools') || pathname === '/my-tools' || pathname.startsWith('/teams');
  };

  const showNavbar = ['/', '/pricing'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {showNavbar && <Navbar />}
      <div className="flex">
        {isDashboardRoute(location.pathname) && <Sidebar />}
        <main className={cn(
          "flex-1 transition-colors duration-300",
          isDashboardRoute(location.pathname) 
            ? "pl-4 pr-6 pt-6 bg-gray-50 dark:bg-gray-900" 
            : "bg-white dark:bg-gray-900"
        )}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route path="/my-tools" element={
              <ProtectedRoute><MyTools /></ProtectedRoute>
            } />
            <Route path="/tools">
              <Route index element={<Navigate to="/tools/categories" replace />} />
              <Route path="categories" element={
                <ProtectedRoute><ToolCategories /></ProtectedRoute>
              } />
              <Route path="add" element={
                <ProtectedRoute><AddTool /></ProtectedRoute>
              } />
              <Route path="compare" element={
                <ProtectedRoute><CompareTools /></ProtectedRoute>
              } />
              <Route path="recommendations" element={
                <ProtectedRoute><AIRecommendations /></ProtectedRoute>
              } />
            </Route>
            <Route path="/teams">
              <Route index element={
                <ProtectedRoute><Teams /></ProtectedRoute>
              } />
              <Route path=":teamId" element={
                <ProtectedRoute><TeamDashboard /></ProtectedRoute>
              } />
              <Route path=":teamId/folders/*" element={
                <ProtectedRoute><TeamFolders /></ProtectedRoute>
              } />
              <Route path="referral" element={
                <ProtectedRoute><ReferralProgram /></ProtectedRoute>
              } />
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
