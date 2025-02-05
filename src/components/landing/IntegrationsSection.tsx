import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const IntegrationsSection = () => {
  const navigate = useNavigate();
  
  const integrations = [
    { name: "OpenAI", logo: "🤖" },
    { name: "Anthropic", logo: "🧠" },
    { name: "Google AI", logo: "🔍" },
    { name: "Microsoft Azure", logo: "☁️" },
    { name: "HuggingFace", logo: "🤗" },
    { name: "Stability AI", logo: "🎨" },
    { name: "Midjourney", logo: "🖼️" },
    { name: "Replicate", logo: "⚡" }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
            Seamless Integrations
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            All Your AI Tools in One Place
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect and manage your entire AI stack from a single dashboard
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{integration.logo}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {integration.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate("/features")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl group animate-fade-in"
          >
            View All Integrations
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection;