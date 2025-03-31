import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
  

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  // Create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Update Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Failed to create the product");
      }
    } catch (error) {
      console.log(error);
      // Check if error.response exists before accessing its properties
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong while Update the product"
      );
    }
  };

   //delete a product
   const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
  
      if (data?.success) {
        toast.success(data.message || "Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Failed to delete the product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error?.response?.data?.message || "Something went wrong while deleting the product");
    }
  };
  
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="flex gap-16 justify-start items-baseline">
        <Adminmenu />
        <div className="flex flex-col w-[70%] gap-3">
          <div className="border p-3 text-xl rounded-md">Update Product</div>
          <form>
            <div className="relative flex flex-col gap-3 items-center w-full max-w-[24rem]">
              <label
                htmlFor="categories"
                className="block mb-2 text-sm font-medium text-emerald-900 dark:text-black"
              >
                Select your Category
              </label>

              <select
                placeholder="Select a category"
                className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-zinc-500 dark:border-zinc-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-50 rounded-lg cursor-pointer bg-gray-500 dark:text-emerald-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div>
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                    />
                  </div>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Write a Name
                </label>
              </div>

              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
              >
                Description
              </label>
              <textarea
                value={description}
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                placeholder="write a description..."
              ></textarea>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Write a Price
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Write a Quantity
                </label>
              </div>

              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-grey">
                Select Shipping
              </label>
              <select
                className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                onChange={(e) => setShipping(e.target.value)}
                value={shipping ? "1" : "0"}
              >
                <option value={"0"}>No</option>
                <option value={"1"}>Yes</option>
              </select>

              <button
                onClick={handleUpdate}
                className="px-2 py-2 ml-3 bg-gray-900 text-emerald-400 font-mono rounded-lg border border-emerald-400 relative group"
              >
                <span className="absolute inset-0 bg-emerald-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
                  UPDATE PRODUCT
                </span>
              </button>
              <button
                onClick={handleDelete}
                className="px-2 py-2 ml-3 bg-gray-900 text-emerald-400 font-mono rounded-lg border border-emerald-400 relative group"
              >
                <span className="absolute inset-0 bg-emerald-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
                  DELETE PRODUCT
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
