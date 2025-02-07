
import { Check, X, Lightbulb } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface SentimentProps {
  toolName: string;
  pros?: string[];
  cons?: string[];
  key_insights?: string[];
  category?: string;
}

const SentimentAnalysis = ({ toolName, pros, cons, key_insights, category }: SentimentProps) => {
  // Tool-specific strengths based on their specialization
  const getToolSpecificPros = () => {
    switch (toolName.toLowerCase()) {
      case 'chatgpt':
        return [
          "Advanced language understanding and context awareness",
          "Versatile applications across multiple domains",
          "Regular model updates and improvements",
          "Strong community and ecosystem"
        ];
      case 'github copilot':
        return [
          "Deep code understanding and context awareness",
          "Seamless IDE integration",
          "Supports multiple programming languages",
          "Real-time code suggestions"
        ];
      case 'jasper':
        return [
          "Marketing-focused content generation",
          "Built-in SEO optimization features",
          "Brand voice customization",
          "Extensive template library"
        ];
      case 'copy.ai':
        return [
          "Specialized in marketing copy and headlines",
          "User-friendly interface for non-technical users",
          "Quick content iteration capabilities",
          "Strong social media content focus"
        ];
      default:
        return pros || [];
    }
  };

  // Tool-specific limitations based on real-world usage
  const getToolSpecificCons = () => {
    switch (toolName.toLowerCase()) {
      case 'chatgpt':
        return [
          "May occasionally produce incorrect information",
          "Limited to training data cutoff date",
          "Can be inconsistent in long conversations",
          "High usage costs for GPT-4"
        ];
      case 'github copilot':
        return [
          "Subscription cost may be high for individuals",
          "Code quality varies by context",
          "May suggest deprecated or insecure code",
          "Limited support for newer frameworks"
        ];
      case 'jasper':
        return [
          "Higher pricing compared to competitors",
          "Steep learning curve for advanced features",
          "Limited customization for specific industries",
          "Output quality depends on input quality"
        ];
      case 'copy.ai':
        return [
          "Limited advanced customization options",
          "May require significant prompt refinement",
          "Basic analytics and reporting",
          "Limited multilingual capabilities"
        ];
      default:
        return cons || [];
    }
  };

  // Tool-specific insights based on industry expertise
  const getToolSpecificInsights = () => {
    switch (toolName.toLowerCase()) {
      case 'chatgpt':
        return [
          "Best suited for versatile, general-purpose AI tasks",
          "Strong potential for educational and research applications"
        ];
      case 'github copilot':
        return [
          "Most effective for experienced developers who can verify suggestions",
          "Excellent for boilerplate code and common patterns"
        ];
      case 'jasper':
        return [
          "Optimal for marketing teams with established brand guidelines",
          "Strong ROI for content-heavy organizations"
        ];
      case 'copy.ai':
        return [
          "Ideal for small businesses and solo entrepreneurs",
          "Best value for social media and ad copy generation"
        ];
      default:
        return key_insights || [];
    }
  };

  const toolPros = getToolSpecificPros();
  const toolCons = getToolSpecificCons();
  const toolInsights = getToolSpecificInsights();

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          Key Strengths
          {category && (
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          )}
        </h4>
        <div className="space-y-2">
          {toolPros.map((pro, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-start gap-2 text-sm hover:bg-gray-50 p-2 rounded-md transition-colors">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">Click to learn more about this feature</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Limitations</h4>
        <div className="space-y-2">
          {toolCons.map((con, index) => (
            <div key={index} className="flex items-start gap-2 text-sm hover:bg-gray-50 p-2 rounded-md transition-colors">
              <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">{con}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Key Insights</h4>
        <div className="space-y-3">
          {toolInsights.map((insight, index) => (
            <div key={index} className="flex items-start gap-2 text-sm bg-blue-50 p-3 rounded-md">
              <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-blue-700">{insight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;

