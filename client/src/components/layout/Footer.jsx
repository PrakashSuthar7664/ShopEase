import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div >
      <footer className="w-full bg-white px-6 py-4">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
          <ul className="flex flex-wrap  items-center gap-y-2 gap-x-8">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold tracking-wider text-sm"
                  : "text-black/80 hover:text-emerald-600 transition-colors tracking-wider text-sm"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold tracking-wider text-sm"
                  : "text-black/80 hover:text-emerald-600 transition-colors tracking-wider text-sm"
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/policy"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold tracking-wider text-sm"
                  : "text-black/80 hover:text-emerald-600 transition-colors tracking-wider text-sm"
              }
            >
              Privacy Policy
            </NavLink>
          </ul>
        </div>
        <p className="block mb-4 text-xs text-center text-slate-500 md:mb-0 border-t border-slate-200 mt-4 pt-4">
          All Right Reserved &copy; Sprakash
        </p>
      </footer>
    </div>
  );
};

export default Footer;
