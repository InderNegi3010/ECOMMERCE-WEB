import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="flex flex-col md:flex-row gap-16 my-10">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, nam
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis,
            expedita?Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugiat, distinctio!.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
            nesciunt itaque aliquid, accusantium amet sunt possimus enim dolore
            dolores quod?Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Corrupti, eius?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            neque modi officia praesentium, ullam velit facere, vitae voluptate
            eveniet aut ut ipsum veniam accusamus amet.
          </p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="r px-10 py-8 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance: </b> 
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet corrupti error eos et repudiandae nam?</p>
        </div>

        <div className="r px-10 py-8 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Convenience: </b> 
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet corrupti error eos et repudiandae nam?</p>
        </div>
        <div className="r px-10 py-8 md:px-16 sm:py-20 flex flex-col gap-5">
          <b>Eceptional Customer Service: </b> 
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet corrupti error eos et repudiandae nam?</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
}

export default About;
