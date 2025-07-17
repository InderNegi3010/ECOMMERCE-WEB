import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";

function Cart() {
const { cartItems, products, currency, delivery_fee, navigate, updateQuantity } =
    useContext(ShopContext);

  const cartList = [];

  for (const productId in cartItems) {
  const product = products.find((p) => p._id === productId);
  if (!product) continue;

  for (const size in cartItems[productId]) {
    const quantity = cartItems[productId][size];
    if (quantity <= 0) continue; // ✅ Skip 0 quantity items

    cartList.push({
      ...product,
      size,
      quantity,
      totalPrice: (quantity || 0) * (product.price || 0)

    });
  }
}


  const totalCartValue =
    cartList.reduce((sum, item) => sum + item.totalPrice, 0) + delivery_fee;

  return (
    <div className="p-4">
      <div className="text-xl font-bold mb-4">
        <Title text1={"YOUR"} text2={"CART"} />
        {cartList.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartList.map((item, index) => (
              <div
                key={`${item._id}-${item.size}`}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="object-cover w-16 h-16 rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Shipping Fee: {currency} {delivery_fee}{" "}
                    </p>
                  </div>
                </div>
                <div className="text-right font-semibold">
                  {currency}
                  {item.totalPrice.toFixed(2)}
                  <img
                  onClick={() => updateQuantity(item._id, item.size, 0 )}
                    src={assets.bin_icon}
                    className="w-4 sm:w-5 cursur-pointer pt-4"
                    alt=""
                  />
                </div>
              </div>
            ))}

            <div className="text-right font-bold text-lg mt-4">
              Total: {currency}
              {totalCartValue.toFixed(2)}
            </div>
          </div>
        )}
      </div>
      <div className="text-right">
        <button
          onClick={() => navigate("/place-order")}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out tracking-wide uppercase backdrop-blur-md"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default Cart;
