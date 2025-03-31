import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [success, setSuccess] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
      console.log(res)
      if (res.data.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return success ? <Outlet/> : <Spinner/>;
}