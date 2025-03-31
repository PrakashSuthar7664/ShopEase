import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Select, Spin, Tag } from "antd";
import { 
  ShopOutlined, 
  UserOutlined, 
  ClockCircleOutlined, 
  DollarCircleOutlined, 
  CheckCircleOutlined 
} from "@ant-design/icons";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import Adminmenu from "../../components/layout/Adminmenu";
const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "green";
      case "Shipped": return "blue";
      case "Processing": return "orange";
      case "Cancelled": return "red";
      default: return "gray";
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/5">
          <Adminmenu />
        </div>
        
        <div className="md:w-4/5">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShopOutlined />
              Order Management
            </h1>

            {loading ? (
              <div className="text-center py-8">
                <Spin size="large" />
                <p className="mt-4 text-gray-500">Loading orders...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((o, i) => (
                  <div key={o._id} className="border rounded-lg hover:shadow-lg transition-shadow">
                    <div className="p-4 bg-gray-50 border-b flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">#{i + 1}</span>
                        <Tag color={getStatusColor(o.status)} className="rounded-full">
                          {o.status}
                        </Tag>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <UserOutlined />
                          <span>{o?.buyer?.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockCircleOutlined />
                          <span>{moment(o?.createAt).format("MMM Do YYYY")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarCircleOutlined />
                          <Tag color={o?.payment.success ? "green" : "red"}>
                            {o?.payment.success ? "Paid" : "Unpaid"}
                          </Tag>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Update Status
                        </label>
                        <Select
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                          className="w-full"
                          suffixIcon={<CheckCircleOutlined />}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              <Tag color={getStatusColor(s)}>{s}</Tag>
                            </Option>
                          ))}
                        </Select>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {o?.products?.map((p) => (
                          <div key={p._id} className="flex items-start gap-4 p-3 border rounded-md">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              className="w-20 h-20 object-cover rounded-md"
                              alt={p.name}
                              onError={(e) => {
                                e.target.src = '/placeholder-product.jpg';
                              }}
                            />
                            <div>
                              <h3 className="font-medium mb-1">{p.name}</h3>
                              <p className="text-sm text-gray-600 mb-1">
                                {p.description.substring(0, 40)}...
                              </p>
                              <p className="text-sm font-semibold text-green-600">
                                ${p.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;