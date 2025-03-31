import React from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Admin Dashboard"}>
      <div className="flex gap-32 justify-start items-center">
        <Adminmenu />
        <div className="border p-3 text-xl rounded-md">
          <h3 className=" border-b"> Admin Name : {auth?.user?.name}</h3>
          <h3 className=" border-b"> Admin Email : {auth?.user?.email}</h3>
          <h3> Admin Contact : {auth?.user?.phone}</h3>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
