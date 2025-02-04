import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="flex items-center space-x-8">
      <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
        Home
      </Link>
      <Link to="/#features" className="text-primary hover:text-primary/80 transition-colors">
        Features
      </Link>
      <Link to="/pricing" className="text-primary hover:text-primary/80 transition-colors">
        Pricing
      </Link>
      <Link to="/tools" className="text-primary hover:text-primary/80 transition-colors">
        Tools
      </Link>
    </div>
  );
};

export default NavLinks;