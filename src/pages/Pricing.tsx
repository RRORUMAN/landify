import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

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
    {
      name: "Business Plus",
      price: "€99.99",
      features: [
        "Unlimited tool recommendations",
        "Custom categories",
        "Priority 24/7 support",
        "API access",
        "Custom integration support",
        "Dedicated account manager",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-24">
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 ${
                plan.popular
                  ? "bg-gradient-to-b from-purple-600 to-pink-600 transform scale-105"
                  : "bg-gray-800"
              } transition-all hover:transform hover:scale-105 animate-fade-in`}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal">/month</span></p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-white text-purple-600 hover:bg-gray-100"
                    : "bg-purple-600 hover:bg-purple-700"
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