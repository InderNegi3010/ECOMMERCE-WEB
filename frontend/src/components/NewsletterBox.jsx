import React from "react";

function NewsletterBox() {
  const onSubmithandler = (e) => e.preventDefault();

  return (
    <div className="text-center">
      <p className="text-2xl text-gray-800 font-medium">
        Subscribe now to get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, unde.
      </p>

      <form
        onSubmit={onSubmithandler}
        className="w-full w-1/2 flex items-center gap-3 mx-auto my-6 pl-3  border-gray-500"
      >
        <input
          className="outline-none border-none w-full py-4 sm:flex-1"
          type="email"
          placeholder="Enter your email"
          required
        />

      </form>
        <button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-base px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out tracking-wide backdrop-blur-md"
        >
          Subscibe
        </button>
    </div>
  );
}

export default NewsletterBox;
