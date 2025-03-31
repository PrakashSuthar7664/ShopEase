import React from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";

const Users = () => {
  return (
    <Layout title={"Dashboard - Users"}>
      <div className="flex gap-32 justify-start items-baseline">
        <Adminmenu />
        <div className="border p-3 text-xl rounded-md">Users</div>
      </div>
    </Layout>
  );
};

export default Users;
