import { useState } from "react";
import { Clock, Brain, TrendingUp } from "lucide-react";

const ROICalculatorSection = () => {
  const [toolCount, setToolCount] = useState(5);
  
  const timePerTool = 4.5;
  const timesSaved = toolCount * timePerTool;
  const monthlyTimeSaved = timesSaved;
  const yearlyTimeSaved = monthlyTimeSaved * 12;
  const productivityGain = Math.min(toolCount * 5, 40);

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
            ROI Calculator
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-black">
            Calculate Your Time & Resource Savings
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how much time and resources you could save by streamlining your AI tool discovery and implementation process
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of AI tools you need to evaluate monthly
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={toolCount}
                onChange={(e) => setToolCount(parseInt(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-2 text-lg font-semibold text-blue-600">
                {toolCount} tools
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Clock,
                  title: "Monthly Time Saved",
                  value: `${monthlyTimeSaved} hours`,
                  description: "Based on research-backed evaluation metrics"
                },
                {
                  icon: Brain,
                  title: "Productivity Gain",
                  value: `${productivityGain}%`,
                  description: "Based on McKinsey's 2023 AI implementation research"
                },
                {
                  icon: TrendingUp,
                  title: "Yearly Time Saved",
                  value: `${yearlyTimeSaved} hours`,
                  description: "Projected annual time savings"
                },
              ].map((stat, index) => (
                <div
                  key={stat.title}
                  className="bg-blue-50 rounded-xl p-6 text-center"
                >
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculatorSection;