import React, { useEffect, useState } from "react";
import Adminmenu from "../../components/layout/Adminmenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
// import Loader from "../../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Admin Products">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Admin Sidebar */}
          <div className="lg:col-span-3">
            <Adminmenu />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                  <p className="text-gray-500 mt-1">
                    {products.length} products found
                  </p>
                </div>
                <Link
                  to="/dashboard/admin/create-product"
                  className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FiPlus className="text-lg" />
                  Add Product
                </Link>
              </div>

              {/* Product Grid */}
              {loading ? (
                <div className="flex justify-center py-12">
                  {/* <Loader /> */}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <div
                      key={p._id}
                      className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Link
                        to={`/dashboard/admin/product/${p.slug}`}
                        className="flex justify-center items-center  relative aspect-square overflow-hidden rounded-t-xl"
                      >
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className=" object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {p.name}
                          </h3>
                          <div className="flex gap-2">
                        
                            <Link
                              to={`/dashboard/admin/product/${p.slug}`}
                              className="text-blue-500 hover:text-blue-700 p-2"
                            >
                              <FiEdit className="text-lg" />
                            </Link>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                          {p.description}
                        </p>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            ${p.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            Qty: {p.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && products.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No products found. Start by adding a new product.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;