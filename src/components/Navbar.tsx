import React from "react";
import { FaUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="max-w-[1300px] mx-auto py-10 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="text-3xl text-foreground cor">
          Lemren <span className="text-[#02f47f] ml-[-5px] text-4xl">.</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <li>
            <NavLink
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse-cars"
              className="text-foreground hover:text-primary transition-colors"
            >
              Popular Listings
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/browse-cars"
              className="text-foreground hover:text-primary transition-colors"
            >
              Browse Cars
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/companies"
              className="text-foreground hover:text-primary transition-colors"
            >
              Companies
            </NavLink>
          </li>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
            <FaUser className="w-4 h-4" />
            <Link to={"/signin"}>
              <span>Sign In</span>
            </Link>
          </button>
          <button className="bg-black  hover:bg-black/70 text-white px-3 py-1 rounded-[30px] hover:bg-foreground/90 transition-colors">
            <Link to="/signup">Create Account</Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
