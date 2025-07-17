import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  const handleSearchClick = () => {
    // Add a small scale animation to the search icon
    const searchIcon = document.querySelector(".search-icon");
    searchIcon.style.transform = "scale(0.9)";
    setTimeout(() => {
      searchIcon.style.transform = "scale(1)";
    }, 150);

    setShowSearch(true);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium cursor-pointer ">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="w-34 transition-transform duration-200 hover:scale-105"
        alt=""
      />

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1 group">
          <p className="transition-colors duration-200 group-hover:text-black">
            HOME
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block transition-all duration-300" />
        </NavLink>

        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 group"
        >
          <p className="transition-colors duration-200 group-hover:text-black">
            COLLECTION
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block transition-all duration-300" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1 group">
          <p className="transition-colors duration-200 group-hover:text-black">
            ABOUT
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block transition-all duration-300" />
        </NavLink>

        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 group"
        >
          <p className="transition-colors duration-200 group-hover:text-black">
            CONTACT
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block transition-all duration-300" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={handleSearchClick}
          src={assets.search_icon}
          className="search-icon w-5 cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-70 active:scale-95"
          alt=""
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-70"
            alt=""
          />

          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg shadow-lg transform scale-95 group-hover:scale-100 transition-all duration-200">
                <p className="cursor-pointer hover:text-black transition-colors duration-150">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black transition-colors duration-150"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black transition-colors duration-150"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative group">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 transition-all duration-200 group-hover:scale-110 group-hover:opacity-70"
            alt=""
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] transition-all duration-200 group-hover:scale-110">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden transition-all duration-200 hover:scale-110 hover:opacity-70"
          alt=""
        />

        {/* Sidebar menu for small screen */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ease-in-out ${
            visible ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        >
          <div
            className={`flex flex-col text-gray-600 transition-all duration-300 delay-100 ${
              visible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180 transition-transform duration-200 hover:scale-110"
                alt=""
              />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 hover:bg-gray-50 hover:text-black transition-all duration-200"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 hover:bg-gray-50 hover:text-black transition-all duration-200"
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 hover:bg-gray-50 hover:text-black transition-all duration-200"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 hover:bg-gray-50 hover:text-black transition-all duration-200"
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
