
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavLinks = () => {
  const location = useLocation();

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/#features';
    } else {
      const featuresSection = document.getElementById('features');
      featuresSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center space-x-8">
      <Link 
        to="/" 
        className="text-black font-medium hover:text-blue-600 transition-colors relative group"
      >
        <span className="relative z-10">Home</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
      </Link>
      <a 
        href="#features" 
        onClick={scrollToFeatures}
        className="text-black font-medium hover:text-blue-600 transition-colors relative group cursor-pointer"
      >
        <span className="relative z-10">Features</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
      </a>
      <Link 
        to="/pricing" 
        className="text-black font-medium hover:text-blue-600 transition-colors relative group"
      >
        <span className="relative z-10">Pricing</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
      </Link>
    </div>
  );
};

export default NavLinks;
