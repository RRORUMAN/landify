import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
    >
      Relevence
    </Link>
  );
};

export default Logo;