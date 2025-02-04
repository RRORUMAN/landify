import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Clock, TrendingUp } from "lucide-react";

const ROICalculatorSection = () => {
  const [toolCount, setToolCount] = useState(5);
  const monthlySavings = toolCount * 200;
  const yearlySavings = monthlySavings * 12;
  const timesSaved = toolCount * 5;

  return (
    <div className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
            ROI Calculator
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            See Your Potential Savings
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate how much time and money you could save with our AI tool management platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of AI tools you use
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={toolCount}
                onChange={(e) => setToolCount(parseInt(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer dark:bg-blue-900"
              />
              <div className="text-center mt-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
                {toolCount} tools
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: DollarSign,
                  title: "Monthly Savings",
                  value: `$${monthlySavings.toLocaleString()}`,
                },
                {
                  icon: Clock,
                  title: "Hours Saved Monthly",
                  value: `${timesSaved} hours`,
                },
                {
                  icon: TrendingUp,
                  title: "Yearly Savings",
                  value: `$${yearlySavings.toLocaleString()}`,
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 text-center"
                >
                  <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mb-4">
                    <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculatorSection;