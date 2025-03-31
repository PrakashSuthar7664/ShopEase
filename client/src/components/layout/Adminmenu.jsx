import React from "react";
import { NavLink } from "react-router-dom";

const Adminmenu = () => {
  return (
    <div>
      <div className="max-w-sm mx-auto mt-20 p-4 shadow-md rounded-lg border-t-2 border-teal-400 dark:bg-gray-900 dark:text-white">
        <div className="flex justify-between pb-4">
          <p className="font-bold text-xl">Admin Panel</p>
        </div>
        <ul className="flex flex-col pl-1">
          <li className="border-b py-2 dark:border-gray-600">
            <NavLink
              to="/dashboard/admin/create-category"
              className="dark:text-gray-300"
            >
              Create Category
            </NavLink>
          </li>
          <li className="border-b py-2 dark:border-gray-600">
            <NavLink
              to="/dashboard/admin/create-product"
              className="dark:text-gray-300"
            >
              Create Product
            </NavLink>
          </li>
          <li className="border-b py-2 dark:border-gray-600">
            <NavLink
              to="/dashboard/admin/products"
              className="dark:text-gray-300"
            >
              Products
            </NavLink>
          </li>
          <li className="border-b py-2 dark:border-gray-600">
            <NavLink to="/dashboard/admin/users" className="dark:text-gray-300">
              Users
            </NavLink>
          </li>
          <li className="border-b py-2 dark:border-gray-600">
            <NavLink to="/dashboard/admin/orders" className="dark:text-gray-300">
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Adminmenu;
