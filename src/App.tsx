import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Navbar from "./components/Navbar";
import Sidebar from "./components/dashboard/Sidebar";
import ToolCategories from "./pages/tools/ToolCategories";
import AddTool from "./pages/tools/AddTool";
import CompareTools from "./pages/tools/CompareTools";
import AIRecommendations from "./pages/tools/AIRecommendations";

const queryClient = new QueryClient();

const AppContent = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  const isAuthenticatedRoute = (pathname: string) => {
    return pathname.startsWith('/tools');
  };

  return (
    <div className="flex min-h-screen w-full">
      {session && <Sidebar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={session ? <Navigate to="/tools/categories" /> : <Landing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/tools/categories" />} />
          <Route
            path="/tools/categories"
            element={session ? <ToolCategories /> : <Navigate to="/auth" />}
          />
          <Route
            path="/tools/add"
            element={session ? <AddTool /> : <Navigate to="/auth" />}
          />
          <Route
            path="/tools/compare"
            element={session ? <CompareTools /> : <Navigate to="/auth" />}
          />
          <Route
            path="/tools/recommendations"
            element={session ? <AIRecommendations /> : <Navigate to="/auth" />}
          />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;