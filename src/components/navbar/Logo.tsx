import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="text-left md:mt-0 mt-[-2px]">
      <span className="text-2xl font-geologica font-extrabold">
        cropio<span className="text-primary">.app</span>
      </span>
    </Link>
  );
};