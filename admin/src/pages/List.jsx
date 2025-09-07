import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function List({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!token) return toast.error("Admin token missing");
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/list`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.log("Fetch error:", error.response || error);
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Product deleted successfully");
        setProducts(products.filter((p) => p._id !== id));
      } else {
        toast.error(response.data.message || "Failed to delete product");
      }
    } catch (error) {
      console.log("Delete error:", error.response || error);
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Bestseller</th>
                <th className="py-2 px-4 border">Sizes</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{i + 1}</td>
                  <td className="py-2 px-4 border">{p.name}</td>
                  <td className="py-2 px-4 border">{p.category}</td>
                  <td className="py-2 px-4 border">${p.price}</td>
                  <td className="py-2 px-4 border">
                    {p.bestseller ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border">{p.sizes.join(", ")}</td>
                  <td className="py-2 px-4 border flex gap-2">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default List;
