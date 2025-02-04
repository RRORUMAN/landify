import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Zap,
  LineChart,
  BarChart3,
  Users,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Scale your analytics <br />without hiring
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find and implement the perfect AI tools for your business. 
            Get data-driven insights to scale efficiently.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              onClick={() => navigate("/auth")}
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={scrollToFeatures}
            >
              See how it works
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
          <img 
            src="/lovable-uploads/118efe55-083f-428e-9378-6bc3689dfa2c.png" 
            alt="Dashboard Preview"
            className="w-full"
          />
        </div>

        {/* Trusted By Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-8">Trusted by innovative companies</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-50">
            {Array(8).fill(null).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="features" className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">
              See your data like never before
            </h2>
            <p className="text-xl text-gray-600">
              Powerful analytics tools that help you make better decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: LineChart,
                title: "Real-time Analytics",
                description: "Get instant insights with our real-time dashboard",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together seamlessly with your team",
              },
              {
                icon: Sparkles,
                title: "AI-Powered Insights",
                description: "Let AI help you discover hidden opportunities",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                Transform your business with data-driven decisions
              </h2>
              <div className="space-y-6">
                {[
                  "Real-time analytics dashboard",
                  "Custom reports and visualizations",
                  "AI-powered recommendations",
                  "Team collaboration tools",
                  "Automated insights",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="bg-green-100 p-1 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                className="mt-8 bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/auth")}
              >
                Start Free Trial <ArrowUpRight className="ml-2" />
              </Button>
            </div>
            <div className="bg-gray-100 p-8 rounded-2xl">
              <BarChart3 className="w-full h-64 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to transform your business?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of companies already using our platform
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50"
            onClick={() => navigate("/auth")}
          >
            Get Started Now <ChevronRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;