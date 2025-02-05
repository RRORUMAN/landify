import { Users, Brain, Star, Infinity } from "lucide-react";

const StatsSection = () => {
  return (
    <div className="border-y border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { number: "10,000+", label: "Active Users", icon: Users },
            { number: "500+", label: "AI Tools", icon: Brain },
            { number: "98%", label: "Success Rate", icon: Star },
            { number: "24/7", label: "Support", icon: Infinity },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-blue-50">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-black mb-3">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;