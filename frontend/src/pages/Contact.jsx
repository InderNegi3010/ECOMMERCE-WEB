import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col gap-6 justify-center items-start">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            {" "}
            56 Haldwani <br /> Nanital, Uttrakhand , India
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br /> Email: indernegi@342gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about teams and jobs opening.
          </p>
          <button className="
            relative overflow-hidden group
            px-8 py-3 bg-transparent text-gray-900 font-semibold rounded-lg
            border-2 border-gray-900
            transition-all duration-300 ease-in-out
            hover:text-white hover:-translate-y-1 hover:shadow-xl
            shadow-md hover:shadow-gray-900/25
            active:scale-95 active:translate-y-0
            w-full sm:w-auto
            focus:outline-none focus:ring-4 focus:ring-gray-300
            before:absolute before:inset-0 before:bg-gray-900
            before:translate-y-full before:transition-transform before:duration-300
            hover:before:translate-y-0
          ">
            <span className="relative z-10">Explore Jobs</span>
          </button>
        </div>
      </div>
       <NewsletterBox />
    </div>
  );
}

export default Contact;
