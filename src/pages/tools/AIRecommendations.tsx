
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";

const AIRecommendations = () => {
  const [userNeeds, setUserNeeds] = useState("");
  const [recommendations, setRecommendations] = useState<typeof tools>([]);

  const handleGetRecommendations = () => {
    // TODO: Implement AI recommendation logic
    // For now, just show some random tools as recommendations
    const randomTools = tools
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setRecommendations(randomTools);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Tool Recommendations</h1>
        <p className="text-gray-600">Get personalized AI tool suggestions based on your needs</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your needs
          </label>
          <Textarea
            value={userNeeds}
            onChange={(e) => setUserNeeds(e.target.value)}
            placeholder="What kind of AI tool are you looking for? Describe your use case..."
            className="h-32"
          />
        </div>

        <Button
          onClick={handleGetRecommendations}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Get Recommendations
        </Button>

        {recommendations.length > 0 && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Recommended Tools</h2>
            {recommendations.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendations;
