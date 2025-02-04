import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity font-mono tracking-tight"
    >
      Relevence
    </Link>
  );
};

export default Logo;