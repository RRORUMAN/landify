import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialsSection = () => {
  return (
    <div className="py-32 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4 text-primary dark:text-white">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See what tech visionaries and business leaders say about our platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Bill Gates",
              role: "Co-founder of Microsoft",
              image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg",
              content: "Relevence is revolutionizing how businesses discover and implement AI tools. It's the kind of innovation that drives the next wave of digital transformation.",
            },
            {
              name: "Jeff Bezos",
              role: "Founder of Amazon",
              image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Jeff_Bezos%27_iconic_laugh.jpg",
              content: "The ROI calculator and analytics dashboard are game-changers. This platform is exactly what companies need to navigate the complex landscape of AI tools.",
            },
            {
              name: "Alex Hormozi",
              role: "Founder of Acquisition.com",
              image: "https://pbs.twimg.com/profile_images/1592600303924563968/0qsxE2-z_400x400.jpg",
              content: "If you're not using Relevence to manage your AI stack, you're literally burning money. The platform paid for itself in the first week. It's that good.",
            },
          ].map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <Avatar className="h-14 w-14 border-2 border-blue-500">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
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