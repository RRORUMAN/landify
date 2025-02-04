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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
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
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;