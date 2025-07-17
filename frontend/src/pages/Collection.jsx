import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Productitem from "../components/Productitem";

function Collection() {
  const { products, search , showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [showTypes, setShowTypes] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState([])



  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (search && showSearch) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct()
  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors duration-200"
        >
          FILTERS
          <img
            className={`h-3 transition-transform duration-300 ease-in-out sm:hidden ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Main Filter Container with Animation */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out transform ${
            showFilter
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          } sm:max-h-none sm:opacity-100 sm:translate-y-0`}
        >
          <div className="space-y-4">
            {/* Category Filter with Animation */}
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div
                onClick={() => setShowCategories(!showCategories)}
                className="pl-5 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between pr-4"
              >
                <p className="font-medium text-sm">CATEGORIES</p>
                <img
                  className={`h-3 transition-transform duration-300 ease-in-out ${
                    showCategories ? "rotate-90" : ""
                  }`}
                  src={assets.dropdown_icon}
                  alt=""
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  showCategories ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-5 py-3 bg-white">
                  <div className="flex flex-col gap-3 text-sm font-light text-gray-700">
                    <label className="flex gap-2 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
                      <input
                        type="checkbox"
                        className="w-3 h-3 transition-transform duration-200 group-hover:scale-110"
                        value="Men"
                        onChange={toggleCategory}
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Men
                      </span>
                    </label>
                    <label className="flex gap-2 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
                      <input
                        type="checkbox"
                        className="w-3 h-3 transition-transform duration-200 group-hover:scale-110"
                        value="Women"
                        onChange={toggleCategory}
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Women
                      </span>
                    </label>
                    <label className="flex gap-2 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
                      <input
                        type="checkbox"
                        className="w-3 h-3 transition-transform duration-200 group-hover:scale-110"
                        value="Kids"
                        onChange={toggleCategory}
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Kids
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* SubCategory Filter with Animation */}
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div
                onClick={() => setShowTypes(!showTypes)}
                className="pl-5 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between pr-4"
              >
                <p className="font-medium text-sm">TYPES</p>
                <img
                  className={`h-3 transition-transform duration-300 ease-in-out ${
                    showTypes ? "rotate-90" : ""
                  }`}
                  src={assets.dropdown_icon}
                  alt=""
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  showTypes ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-5 py-3 bg-white">
                  <div className="flex flex-col gap-3 text-sm font-light text-gray-700">
                    <label className="flex gap-2 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
                      <input
                        type="checkbox"
                        className="w-3 h-3 transition-transform duration-200 group-hover:scale-110"
                        value="Topwear"
                        onChange={toggleSubCategory}
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Topwear
                      </span>
                    </label>
                    <label className="flex gap-2 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
                      <input
                        type="checkbox"
                        className="w-3 h-3 transition-transform duration-200 group-hover:scale-110"
                        value="Bottomwear"
                        onChange={toggleSubCategory}
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Bottomwear
                      </span>
                    </label>
                    <label className="flex gap-2 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
                      <input
                        type="checkbox"
                        className="w-3 h-3 transition-transform duration-200 group-hover:scale-110"
                        value="Winterwear"
                        onChange={toggleSubCategory}
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Winterwear
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 ">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            className="
                  border-2 border-gray-300 text-sm mx-2 px-3 py-2
                  transition-all duration-300 ease-in-out
                  hover:border-blue-400 hover:shadow-lg hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  cursor-pointer
                  "
                  onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map the Products */}

        <div className="grid grid-cols-2 md:grid-3 lg:grid-cols-4 gap-4 gap-y-6 ">
          {filterProducts.map((item, id) => (
            <Productitem
              key={id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
