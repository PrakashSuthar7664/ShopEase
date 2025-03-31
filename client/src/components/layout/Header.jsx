import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({ ...auth, user: null, token: "" });
    toast.success("Logout successful!");
  };

  return (
    <div>
      <nav className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-4 px-6">
            {/* Logo */}
            <div className="flex items-center space-x-12">
              <NavLink
                to="/"
                className="text-lg hover:scale-105 transition-transform duration-300 font-light text-black tracking-[0.3em] flex items-center"
              >
                <svg
                  className="lucide lucide-gem w-6 h-6 mr-2 text-emerald-600"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 3h12l4 6-10 13L2 9Z" />
                  <path d="M11 3 8 9l4 13 4-13-3-6" />
                  <path d="M2 9h20" />
                </svg>
                ShopEase
              </NavLink>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-600 font-semibold tracking-wider text-sm"
                    : "text-black/80 hover:text-emerald-600 transition-colors tracking-wider text-sm"
                }
              >
                Home
              </NavLink>

              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                  className="text-black/80 hover:text-emerald-600 transition-colors tracking-wider text-sm flex items-center"
                >
                  Categories <span className="ml-1">▼</span>
                </button>
                {categoryMenuOpen && (
                  <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                    <NavLink
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      to={"/categories"}
                    >
                      All Categories
                    </NavLink>
                    {categories.map((category) => (
                      <NavLink
                        key={category.id}
                        to={`/category/${category.slug}`}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {category.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {!auth.user ? (
                <>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-emerald-600 font-semibold tracking-wider text-sm"
                        : "text-black/80 hover:text-emerald-600 transition-colors tracking-wider text-sm"
                    }
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-emerald-600 font-semibold tracking-wider text-sm"
                        : "text-black/80 hover:text-emerald-600 transition-colors tracking-wider text-sm"
                    }
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="text-emerald-600 font-semibold tracking-wider text-sm flex items-center"
                  >
                    {auth.user.name}
                    <span className="ml-1">▼</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <SearchInput />
              <button className="text-black/80 transition-transform duration-300 hover:scale-110 hover:text-emerald-600 relative">
                <Link to={"/cart"}>
                  <svg
                    fill="none"
                    height={24}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
                    <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                    <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                  </svg>
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
                    {cart?.length}
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
