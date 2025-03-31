import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import {  Checkbox, Radio } from "antd";
import axios from "axios";
import { Prices } from "../components/Routes/Prices";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/Cart";

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
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Filters */}
          <div className="col-span-12 md:col-span-3 bg-gray-100 p-4 rounded-lg shadow">
            <h5 className="font-semibold text-lg mb-3">Filter By Category</h5>
            <div className="space-y-2">
              {categories?.map((c) => (
                <div key={c._id} className="flex items-center">
                  <Checkbox
                    className="mr-2"
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                </div>
              ))}
            </div>

            <h5 className="font-semibold text-lg mt-6 mb-3">Filter By Price</h5>
            <Radio.Group
              className="flex flex-col space-y-2"
              onChange={(e) => setRadio(e.target.value)}
            >
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>

            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
          {/* Product List */}
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-2xl font-semibold text-center mb-6">
              All Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products?.map((p) => (
                // <div
                //   key={p._id}
                //   className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                // >
                //   <img
                //     src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                //     className="w-full h-48 object-cover"
                //     alt={p.name}
                //   />
                //   <div className="p-4">
                //     <h5 className="font-semibold text-lg">{p.name}</h5>
                //     <p className="text-gray-600 text-sm">{p.description.substring(0, 30)}...</p>
                //     <p className="text-green-600 font-bold">$ {p.price}</p>
                //     <div className="mt-4 flex justify-between">
                //       <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                //         More Details
                //       </button>
                //       <button className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
                //         Add to Cart
                //       </button>
                //     </div>
                //   </div>
                // </div>
                <div
                  key={p._id}
                  class="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                >
                  <Link
                    class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                    to="#"
                  >
                    <img
                      class="peer absolute top-0 right-0 h-[100%] w-[100%] object-center mx-3 px-3"
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                  
                    <svg
                      class="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="currentColor"
                        d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                      />
                    </svg>

                    {/* <!-- <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> --> */}
                  </Link>
                  <div class="mt-4 px-5 pb-5">
                    <Link to="#">
                      <h5 class="text-xl tracking-tight text-slate-900">
                        {p.name}
                      </h5>
                      <p className="text-gray-600 text-sm">
                        {p.description.substring(0, 30)}...
                      </p>
                    </Link>
                    <div class="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        <span class="text-3xl font-bold text-slate-900">
                          $ {p.price}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-around ">
                      <button
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to cart");
                        }}
                        to="#"
                        class="flex items-center justify-center rounded-md bg-slate-900 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="mr-2 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Add to cart
                      </button>
                      <Link
                        to={`/product/${p.slug}`}
                        className="bg-emerald-400 justify-center items-center flex rounded-md px-2 text-white"
                      >
                        More Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {products && products.length < total && (
              <div className="text-center mt-6">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                  className="px-2 py-2 ml-3 bg-gray-900 text-emerald-400 font-mono rounded-lg border border-emerald-400 relative group"
                >
                  <span className="absolute inset-0 bg-emerald-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
                    {loading ? "Loading ..." : "Load More"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
