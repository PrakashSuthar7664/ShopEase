import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Usermenu from "../../components/layout/Usermenu";
import { useAuth } from "../../context/auth";
import moment from "moment";
import axios from "axios";
import { Spin, Tag, Empty } from "antd";
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  DollarOutlined, 
  ShoppingOutlined 
} from "@ant-design/icons";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "green";
      case "Shipped": return "blue";
      case "Processing": return "orange";
      case "Cancelled": return "red";
      default: return "gray";
    }
  };

  if (loading) {
    return (
      <Layout title="Your Orders">
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Your Orders">
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-6">
        <Usermenu />
        
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShoppingOutlined />
              Order History
            </h2>

            {error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : orders.length === 0 ? (
              <Empty
                description="No orders found"
                imageStyle={{ height: 60 }}
                className="py-8"
              >
                <button 
                  onClick={() => window.location.href = "/"}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Start Shopping
                </button>
              </Empty>
            ) : (
              orders.map((order, index) => (
                <div key={order._id} className="border rounded-lg mb-6 hover:shadow-md transition-shadow">
                  <div className="p-4 bg-gray-50 border-b flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">Order #{index + 1}</span>
                      <Tag color={getStatusColor(order.status)} className="rounded-full">
                        {order.status}
                      </Tag>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <ClockCircleOutlined />
                        <span>{moment(order?.createAt).format("MMM D, YYYY")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarOutlined />
                        <Tag color={order?.payment?.success ? "green" : "red"}>
                          {order?.payment?.success ? "Paid" : "Payment Failed"}
                        </Tag>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {order?.products?.map((product) => (
                        <div key={product._id} className="flex items-start gap-4 p-3 border rounded-md">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                            className="w-20 h-20 object-cover rounded-md"
                            alt={product.name}
                            onError={(e) => {
                              e.target.src = '/placeholder-product.jpg';
                            }}
                          />
                          <div>
                            <h3 className="font-medium mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-1">
                              {product.description?.substring(0, 40)}...
                            </p>
                            <p className="text-sm font-semibold text-green-600">
                              ${product.price?.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t flex justify-end">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">Total Items:</span>
                        <Tag className="text-lg">{order?.products?.length}</Tag>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;