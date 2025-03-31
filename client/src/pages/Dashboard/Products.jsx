import React, { useEffect, useState } from "react";
import Adminmenu from "../../components/layout/Adminmenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Dashboard - Users"}>
      <div className="flex  gap-32 justify-start items-baseline">
        <Adminmenu />
        <div className="flex flex-col max-w-[70%] gap-3">
          <div className="border p-3 text-xl rounded-md">All Product List</div>
          <div className="flex flex-wrap gap-3  ">
            {products?.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                <div className="w-36 bg-white border  border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <img
                    className="rounded-t-lg"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />

                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {p.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {p.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
