import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [success, setSuccess] = useState(null); // null indicates loading
  const [auth] = useAuth();

  useEffect(() => {
    let isMounted = true;

    const authCheck = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
        );
        if (isMounted) setSuccess(data.success);
      } catch (error) {
        if (isMounted) setSuccess(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setSuccess(false);
    }

    return () => {
      isMounted = false;
    };
  }, [auth?.token]);

  if (success === null) return <Spinner path="" />; // Show spinner while loading
  return success ? <Outlet /> : <Navigate to="/login" />;
}
