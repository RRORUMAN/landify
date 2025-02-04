import { Users, Brain, Star, Infinity } from "lucide-react";

const StatsSection = () => {
  return (
    <div className="border-y border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
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
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
                  <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
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