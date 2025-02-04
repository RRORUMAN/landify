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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 pt-24">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-8 ${
                plan.popular
                  ? "bg-blue-600 text-white ring-4 ring-blue-600 ring-opacity-50 transform scale-105"
                  : "bg-white text-gray-900 border border-gray-200"
              } transition-all hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4" /> Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                <span className={`text-sm font-normal ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                  /month
                </span>
              </p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${plan.popular ? 'text-blue-200' : 'text-blue-600'}`} />
                    <span className={plan.popular ? 'text-blue-50' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
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