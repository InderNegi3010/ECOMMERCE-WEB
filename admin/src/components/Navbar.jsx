import React from "react";
import { assets } from "../assets/assets";

function Navbar({setToken}) {
  return (
    <div className="flex items-center justify-between py-2 px-[4%]">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      <button onClick={() => setToken("")} className="bg-blue-600 hover:bg-blue-700 text-white  px-6 py-2 rounded text-sm font-medium shadow-sm transition-colors cursor-pointer">
        Logout
      </button>
    </div>
  );
}

export default Navbar;
