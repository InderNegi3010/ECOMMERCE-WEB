import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets.js";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        showSearch && visible
          ? "max-h-20 opacity-100 transform translate-y-0"
          : "max-h-0 opacity-0 transform -translate-y-4"
      }`}
    >
      <div className="bg-gray-50 text-center py-4">
        <div
          className={`inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-5 rounded-full w-3/4 sm:w-1/2 transition-all duration-300 ${
            showSearch ? "scale-100" : "scale-95"
          }`}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="flex-1 outline-none bg-inherit text-sm"
            placeholder="Search"
            autoFocus={showSearch}
          />
          <img src={assets.search_icon} className="w-4" alt="" />
        </div>
        <img
          src={assets.cross_icon}
          className={`inline w-3 cursor-pointer  transition-all duration-300 hover:scale-110 hover:opacity-70 ${
            showSearch ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setShowSearch(false)}
          alt=""
        />
      </div>
    </div>
  );
}

export default SearchBar;
