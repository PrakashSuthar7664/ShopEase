import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNoteFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./components/Routes/Privateroute";
import Dashboard from "./pages/user/Dashboard";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import CreateCategory from "./pages/Dashboard/CreateCategory";
import CreateProduct from "./pages/Dashboard/CreateProduct";
import Users from "./pages/Dashboard/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Dashboard/Products";
import UpdateProduct from "./pages/Dashboard/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Cartpage from "./pages/Cartpage";
import TestDropIn from "./pages/user/TestDropIn";
import AdminOrders from "./pages/Dashboard/AdminOrders";

const App = () => {
  return (
    <Routes>
      <Route path="/test" element={<TestDropIn />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/user" element={<Dashboard />} />
        <Route path="/dashboard/user/orders" element={<Orders />} />
        <Route path="/dashboard/user/profile" element={<Profile />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route
          path="/dashboard/admin/create-category"
          element={<CreateCategory />}
        />
        <Route path="/dashboard/admin/products" element={<Products />} />
        <Route
          path="/dashboard/admin/product/:slug"
          element={<UpdateProduct />}
        />
        <Route
          path="/dashboard/admin/create-product"
          element={<CreateProduct />}
        />
        <Route path="/dashboard/admin/users" element={<Users />} />
        <Route path="/dashboard/admin/orders" element={<AdminOrders />} />
      </Route>

      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
