import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

function Orders() {
  const { currency, token, backendUrl } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Flatten the orders to show individual items
        const flattenedOrders = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            flattenedOrders.push({
              ...item,
              paymentMethod: order.paymentMethod,
              orderDate: order.date,
              orderStatus: order.status || "Ready to Ship",
              orderAmount: order.amount,
              address: order.address,
            });
          });
        });
        setOrderData(flattenedOrders.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "order placed":
        return "bg-blue-500";
      case "packing":
        return "bg-yellow-500";
      case "shipped":
        return "bg-purple-500";
      case "out of delivery":
        return "bg-orange-500";
      case "delivered":
        return "bg-green-500";
      case "ready to ship":
        return "bg-indigo-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "order placed":
        return "Order Placed";
      case "packing":
        return "Packing";
      case "shipped":
        return "Shipped";
      case "out of delivery":
        return "Out for Delivery";
      case "delivered":
        return "Delivered";
      case "ready to ship":
        return "Ready to Ship";
      default:
        return status || "Processing";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Title text1={"MY"} text2={"ORDERS"} />
          </div>
          
          {/* Loading Animation */}
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-center text-lg">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Title text1={"MY"} text2={"ORDERS"} />
          <p className="text-gray-600 mt-4 text-lg">Track and manage your orders</p>
        </div>

        {orderData.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No orders yet</h3>
            <p className="text-gray-500 text-lg mb-8">When you place your first order, it will appear here.</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
              Start Shopping
            </button>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orderData.map((item, id) => (
              <div
                key={id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Product Info */}
                    <div className="flex items-start gap-6 flex-1">
                      <div className="relative">
                        <img
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border-2 border-gray-100"
                          src={
                            item.image && item.image[0]
                              ? item.image[0]
                              : "/placeholder-image.jpg"
                          }
                          alt={item.name}
                        />
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {item.quantity || 1}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                          {item.name}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                              {currency}{item.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                            <span className="text-sm text-gray-600">Size:</span>
                            <span className="text-sm font-medium text-gray-900">{item.size || "M"}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="text-gray-600">
                              Ordered: {" "}
                              <span className="font-medium text-gray-900">
                                {item.orderDate ? new Date(item.orderDate).toLocaleDateString() : "N/A"}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-gray-600">
                              Payment: {" "}
                              <span className="font-medium text-gray-900">{item.paymentMethod}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 lg:min-w-[200px]">
                      {/* Status */}
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(item.orderStatus)} animate-pulse`}></div>
                        <span className="font-medium text-gray-900">
                          {getStatusText(item.orderStatus)}
                        </span>
                      </div>

                      {/* Track Button */}
                      <button 
                        onClick={loadOrderData}
                        className="w-full sm:w-auto lg:w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          Track Order
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="bg-gray-50 px-6 lg:px-8 py-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Order Progress</span>
                    <span className="font-medium">{getStatusText(item.orderStatus)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getStatusColor(item.orderStatus)}`}
                      style={{
                        width: item.orderStatus?.toLowerCase() === 'delivered' ? '100%' : 
                               item.orderStatus?.toLowerCase() === 'out of delivery' ? '80%' :
                               item.orderStatus?.toLowerCase() === 'shipped' ? '60%' :
                               item.orderStatus?.toLowerCase() === 'packing' ? '40%' : '20%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;