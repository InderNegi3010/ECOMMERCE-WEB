import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../assets/assets";

function Add({ token }) {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Admin token missing");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, index) => {
        if (img) formData.append(`image${index + 1}`, img);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
        setImages([null, null, null, null]);
      } else {
        toast.error(response.data.message || "Failed to add product");
      }

      console.log("Upload response:", response.data);
    } catch (error) {
      console.log("Upload error:", error.response || error);
      toast.error("Failed to add product. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-4 w-full items-start"
    >
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-3">
          {images.map((img, i) => (
            <label key={i} htmlFor={`image${i}`}>
              <img
                className="w-30"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt=""
              />
              <input
                type="file"
                id={`image${i}`}
                hidden
                onChange={(e) => handleImageChange(i, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          type="text"
          placeholder="Type Here"
          className="w-full max-w-[500px] px-3 py-2"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          placeholder="Write content here"
          className="w-full max-w-[500px] px-3 py-2"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 w-full">
        <div>
          <p className="mb-2">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">SubCategory</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Price</p>
          <input
            type="number"
            placeholder="25"
            className="w-full px-3 py-2 sm:w-[120px]"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <p>Sizes</p>
        <div className="flex gap-3 mt-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              className={`${
                sizes.includes(size) ? "bg-purple-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

export default Add;
