import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input Form");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="flex gap-16 justify-start items-baseline ">
        <Adminmenu />
        <div className=" flex flex-col w-[70%] gap-3">
          <h1 className="border p-3 text-xl rounded-md">Manage Category</h1>
          <div className="p-3 w-50">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div>
            <div className="relative overflow-y-scroll flex flex-col w-full h-full  text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                      <p className="block text-sm font-normal leading-none text-emerald-500">
                        Name
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                      <p className="block text-sm font-normal leading-none text-emerald-500">
                        Actions
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr className="hover:bg-emerald-50">
                        <td
                          key={c._id}
                          className="p-4 border-b border-emerald-200"
                        >
                          <p className="block text-sm text-emerald-800">
                            {c.name}
                          </p>
                        </td>
                        <td className="p-4 border-b border-emerald-200">
                          <p className="block text-sm text-emerald-800">
                            <button
                              onClick={() => {
                                setOpen(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                              className="px-2 py-2 bg-gray-900 text-emerald-400 font-mono rounded-lg border border-emerald-400 relative group"
                            >
                              <span className="absolute inset-0 bg-emerald-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                              <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
                                Edit
                              </span>
                            </button>

                            <button
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                              className="px-2 py-2 ml-3 bg-gray-900 text-emerald-400 font-mono rounded-lg border border-emerald-400 relative group"
                            >
                              <span className="absolute inset-0 bg-emerald-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                              <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
                                Delete
                              </span>
                            </button>
                          </p>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
