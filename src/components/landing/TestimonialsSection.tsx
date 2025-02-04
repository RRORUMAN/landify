import { Star } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <div className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-yellow-50 text-yellow-600 px-4 py-1 rounded-full text-sm font-medium">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-primary">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about their experience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "CTO at TechCorp",
              content: "Relevence has transformed how we discover and implement AI tools. The ROI has been incredible.",
            },
            {
              name: "Michael Chen",
              role: "Marketing Director",
              content: "The AI recommendations are spot-on. We've saved countless hours in our tool selection process.",
            },
            {
              name: "Emily Williams",
              role: "Product Manager",
              content: "The analytics dashboard gives us invaluable insights into our AI tool usage and effectiveness.",
            },
          ].map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;