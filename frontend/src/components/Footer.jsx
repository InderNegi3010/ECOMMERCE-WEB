import React from "react";
import { assets } from "../assets/assets.js";

function Footer() {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="w-32 mb-5" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
            voluptatibus maiores at dolorum assumenda tempore, optio obcaecati
            ipsam incidunt neque autem recusandae harum itaque odio eos officia
            commodi nisi quasi placeat quibusdam aperiam magni! Facere.
          </p>
        </div>

        <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Pravicy Policy</li>
            </ul>
        </div>

        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>+91-913-354-9849</li>
                <li>forwar@gmail.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className="text-sm text-center py-5">Copyright 2025@  forward.com - All Right Reserved.</p>
        </div>

    </div>
  );
}

export default Footer;
