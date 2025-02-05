
import { useNavigate } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-800 text-primary relative">
      <div className="fixed inset-0 z-0 opacity-[0.02]">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[40rem] w-[40rem] border border-black/5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `scale(${Math.random() * 3 + 1})`,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6">
            Welcome to Relevence
          </h1>
          <p className="text-xl mb-8">
            Your AI Tool Management Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
