import { Link } from "react-router-dom";

const NavLinks = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex items-center space-x-8">
      <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
        Home
      </Link>
      <button 
        onClick={scrollToFeatures}
        className="text-primary hover:text-primary/80 transition-colors"
      >
        Features
      </button>
      <Link to="/pricing" className="text-primary hover:text-primary/80 transition-colors">
        Pricing
      </Link>
    </div>
  );
};

export default NavLinks;