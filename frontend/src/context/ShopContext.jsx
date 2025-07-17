import { createContext, useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

// Create context
export const ShopContext = createContext();

// Reusable toast function
const showToast = (text, type = "info") => {
  let backgroundColor;
  switch (type) {
    case "success":
      backgroundColor = "#28a745";
      break;
    case "error":
      backgroundColor = "#dc3545";
      break;
    case "warning":
      backgroundColor = "#ffc107";
      break;
    default:
      backgroundColor = "#007bff";
  }

  Toastify({
    text,
    duration: 2000,
    gravity: "top",
    position: "right",
    style: { background: backgroundColor },
    stopOnFocus: true,
  }).showToast();
};

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  console.log("Environment check:");
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
  console.log("All env vars:", import.meta.env);
  console.log("Final backendUrl:", backendUrl);

  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // ✅ Load cartItems from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : {};
  });

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      showToast("Select Product Size", "error");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

    showToast("Added to cart!", "success");
  };

  const getCartCount = () => {
    let count = 0;
    Object.values(cartItems).forEach((item) => {
      Object.values(item).forEach((quantity) => {
        count += quantity;
      });
    });
    return count;
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [productId, sizes]) => {
      const product = products.find((p) => p._id === productId);
      if (!product) return total;

      const productTotal = Object.values(sizes).reduce((sum, quantity) => {
        return sum + (quantity > 0 ? product.price * quantity : 0);
      }, 0);

      return total + productTotal;
    }, 0);
  };

  
const getProductsData = async () => {
  try {
    console.log('Making request to:', backendUrl + "/api/product/list");
    const response = await axios.get(backendUrl + "/api/product/list");
    if (response.data.success) {
      setProducts(response.data.products);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.userId; // change this based on your token payload
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          {
            userId: getUserIdFromToken(token),
            itemId,
            size,
            quantity,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ✅ Save cartItems to localStorage when they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    navigate,
    getCartAmount,
    updateQuantity,
    backendUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
