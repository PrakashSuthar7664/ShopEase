import React from "react";
import Layout from "../../components/layout/Layout";
import Usermenu from "../../components/layout/Usermenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Admin Dashboard"}>
    <div className="flex gap-32 justify-start items-baseline">
      <Usermenu />
      <div className="border p-3 text-xl rounded-md">
        <h3 className=" border-b"> User Name : {auth?.user?.name}</h3>
        <h3 className=" border-b"> User Email : {auth?.user?.email}</h3>
        <h3 className=" border-b"> User Address : {auth?.user?.address}</h3>
        <h3> User Contact : {auth?.user?.phone}</h3>
      </div>
    </div>
  </Layout>
  );
};

export default Dashboard;
