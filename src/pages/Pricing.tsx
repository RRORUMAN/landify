import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "€0",
      features: [
        "3 recommended tools per category",
        "Basic search functionality",
        "Access to all categories",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "€19.99",
      features: [
        "10 recommended tools per category",
        "AI-powered recommendations",
        "Advanced search filters",
        "Priority support",
      ],
      buttonText: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Business",
      price: "€49.99",
      features: [
        "20 recommended tools per category",
        "Save and manage your tools",
        "Custom tool collections",
        "Team collaboration features",
        "Premium support",
      ],
      buttonText: "Start Business Trial",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full text-sm font-medium">
            PRICING
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get started for free or upgrade for more powerful features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 relative ${
                plan.popular
                  ? "bg-blue-500/10 border-2 border-blue-500 transform scale-105"
                  : "bg-gray-900"
              } transition-all hover:scale-105`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" /> Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                <span className="text-sm font-normal text-gray-400">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full py-6 text-lg ${
                  plan.popular
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
                onClick={() => navigate("/auth")}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;