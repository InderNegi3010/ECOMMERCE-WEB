import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0] || "");
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    }
  }, [products, productId]);

  const handleImageClick = (selectedImage) => {
    setImage(selectedImage);
  };

  return productData ? (
    <div className="border-t-2 transition-opacity pt-10 ease-in duration-500 opacity-100">
      {/* ----------Product Data---------- */}
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        {/* ---------------------Product Image-------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:opacity-75"
                onClick={() => handleImageClick(item)}
                alt={`Product view ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              className="w-full h-auto"
              alt="Selected product view"
            />
          </div>
        </div>
        {/* --------------------Product Info-------------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex gap-1 items-center mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_dull_icon} className="w-3.5" alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="pt-5 font-medium text-3xl">
            {productData.price} {currency}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2 ">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 ${
                    item === size ? "bg-orange-500" : ""
                  } bg-gray-100`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-600 hover:bg-gray-800 transition-all duration-200 rounded-lg font-semibold tracking-wider uppercase shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex text-gray-500 mt-5 flex-col gap-1 text-sm ">
            <p>100% Orignal Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* ------------Description & Rewiew System------------- */}
      <div className="mt-20">
        <div className="flex gap-2 ">
          <b className="px-5 py-3  text-sm">Describtion</b>
          <p className="px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6  text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
            expedita officia, neque dicta deserunt voluptate animi doloremque
            quis deleniti labore quasi quas harum vitae odio? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Porro eligendi, illum
            quibusdam nemo explicabo laboriosam excepturi reiciendis est
            incidunt nulla culpa cum quia eveniet placeat! Ratione adipisci
            porro earum sit.
          </p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, nisi
          tenetur reprehenderit veniam accusantium minima modi voluptas esse
          repellat natus.
          <p></p>
        </div>
      </div>
      {/* --------------Display Related  Product------------------ */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
}

export default Product;
