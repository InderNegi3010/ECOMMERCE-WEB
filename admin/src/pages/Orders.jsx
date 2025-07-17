import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../assets/assets";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Packing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Out of delivery":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentStatusColor = (isPaid) => {
    return isPaid
      ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      : "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Orders Container */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Order Icon */}
                    <div className="lg:col-span-1 flex justify-center lg:justify-start">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                        <img className="w-8 h-8" src={assets.parcel_icon} alt="Package" />
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="lg:col-span-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h3>
                      <div className="space-y-2">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">Size: {item.size}</p>
                            </div>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="lg:col-span-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Address</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-900 mb-2">
                          {order.address.firstName} {order.address.lastName}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">{order.address.street}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          {order.address.city}, {order.address.state}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          {order.address.country}, {order.address.zipcode}
                        </p>
                        <p className="text-sm text-gray-600 font-medium">📞 {order.address.phone}</p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Items:</span>
                          <span className="text-sm font-medium text-gray-900">{order.items.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Method:</span>
                          <span className="text-sm font-medium text-gray-900">{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Payment:</span>
                          <span className={getPaymentStatusColor(order.payment)}>
                            {order.payment ? "Paid" : "Pending"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Date:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Total & Status */}
                    <div className="lg:col-span-2">
                      <div className="text-center lg:text-right">
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {currency}{order.amount}
                          </p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Order Status</p>
                          <select 
                            onChange={(event) => statusHandler(event, order._id)} 
                            value={order.status}
                            className={`w-full px-3 py-2 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer ${getStatusColor(order.status)}`}
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Packing">Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out of delivery">Out of Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;