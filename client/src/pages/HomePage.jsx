import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import {  Checkbox, Radio , Spin} from "antd";
import axios from "axios";
import { Prices } from "../components/Routes/Prices";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/Cart";
import { FiFilter, FiRefreshCw, FiShoppingCart } from "react-icons/fi";


const HomePage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    await Promise.all([getAllCategory(), getAllProducts(1)]);
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getAllProducts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${pageNumber}`
      );
      setProducts(
        pageNumber === 1 ? data.products : [...products, ...data.products]
      );
      const countRes = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(countRes?.data?.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page > 1) getAllProducts(page);
  }, [page]);

  const handleFilter = (value, id) => {
    setChecked((prev) =>
      value ? [...prev, id] : prev.filter((c) => c !== id)
    );
  };

  useEffect(() => {
    if (!checked.length && !radio) {
      getAllProducts(1);
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products || []);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  return (
    <Layout title="All Products - ShopEase">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FiFilter className="text-blue-500" /> Filters
            </h2>
            <button
              onClick={() => {
                setChecked([]);
                setRadio("");
              }}
              className="text-sm flex items-center gap-1 text-gray-500 hover:text-blue-600"
            >
              <FiRefreshCw /> Reset
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">
                Categories
              </h3>
              <div className="space-y-2">
                {categories?.map((c) => (
                  <div
                    key={c._id}
                    className="flex items-center hover:bg-gray-50 px-2 py-1.5 rounded"
                  >
                    <Checkbox
                      className="mr-2 custom-checkbox"
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      <span className="text-gray-700">{c.name}</span>
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">
                Price Range
              </h3>
              <Radio.Group
                className="flex flex-col gap-3"
                onChange={(e) => setRadio(e.target.value)}
                value={radio}
              >
                {Prices?.map((p) => (
                  <Radio
                    key={p._id}
                    value={p.array}
                    className="custom-radio hover:bg-gray-50 px-2 py-1.5 rounded"
                  >
                    <span className="text-gray-700">{p.name}</span>
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-9">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
            <p className="text-gray-500 mt-2">
              {total} products available
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products?.map((p) => (
              <div
                key={p._id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
              >
                <Link
                  to={`/product/${p.slug}`}
                  className="relative aspect-square overflow-hidden flex justify-center items-center"
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="m-6 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2 h-12">
                    {p.description}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-blue-600">
                        ${p.price}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Added to cart");
                      }}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <FiShoppingCart className="text-lg" />
                      <span className="text-sm">Add to Cart</span>
                    </button>
                  </div>

                  <Link
                    to={`/product/${p.slug}`}
                    className="mt-3 inline-block w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {products?.length < total && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setPage(page + 1)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Spin indicator={<FiRefreshCw className="animate-spin" />} />
                    Loading...
                  </>
                ) : (
                  <>
                    <FiRefreshCw />
                    Load More
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    <style jsx>{`
      .custom-checkbox :global(.ant-checkbox-inner) {
        border-radius: 4px;
        border-color: #d1d5db;
      }
      .custom-radio :global(.ant-radio-inner) {
        border-color: #d1d5db;
      }
      .custom-checkbox :global(.ant-checkbox-checked .ant-checkbox-inner),
      .custom-radio :global(.ant-radio-checked .ant-radio-inner) {
        background-color: #2563eb;
        border-color: #2563eb;
      }
    `}</style>
  </Layout>
  );
};

export default HomePage;
