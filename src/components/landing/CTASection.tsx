import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-primary dark:text-white">
          Ready to Transform Your Business with AI?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Join thousands of businesses already using Relevence to find and implement
          the perfect AI tools. Start your journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl group"
            onClick={() => navigate("/auth")}
          >
            Get Started Now{" "}
            <Zap className="ml-2 group-hover:scale-110 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-200 dark:border-gray-700 text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-6 text-lg rounded-xl group"
            onClick={() => navigate("/pricing")}
          >
            View Pricing{" "}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;