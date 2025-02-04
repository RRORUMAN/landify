import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import MyTools from "./pages/MyTools";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Navbar from "./components/Navbar";
import Sidebar from "./components/dashboard/Sidebar";

const queryClient = new QueryClient();

const App = () => {
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
    return ['/tools', '/my-tools'].includes(pathname);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {({ location }) => (
            <>
              {!isAuthenticatedRoute(location.pathname) && <Navbar />}
              <div className="flex min-h-screen w-full">
                {session && isAuthenticatedRoute(location.pathname) && <Sidebar />}
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={session ? <Navigate to="/tools" /> : <Landing />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/tools" />} />
                    <Route
                      path="/tools"
                      element={session ? <Index /> : <Navigate to="/auth" />}
                    />
                    <Route
                      path="/my-tools"
                      element={session ? <MyTools /> : <Navigate to="/auth" />}
                    />
                  </Routes>
                </main>
              </div>
            </>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;