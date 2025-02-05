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
      <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
        Home
      </Link>
      <a 
        href="#features" 
        onClick={scrollToFeatures}
        className="text-primary hover:text-primary/80 transition-colors cursor-pointer"
      >
        Features
      </a>
      <Link to="/pricing" className="text-primary hover:text-primary/80 transition-colors">
        Pricing
      </Link>
    </div>
  );
};

export default NavLinks;