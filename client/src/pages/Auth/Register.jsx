import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { motion } from "framer-motion";
import {
  //   IconBrandGoogle,
  //   IconBrandLinkedin,
  //   IconBrandGithub,
  IconLoader,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer
        }
      );
      console.log("API Response:", res.data);
      if (res.data.success) {
        toast.success(res.data.message || "Registration Successful!");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Registration Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Layout>
      <div className="bg-grid-neutral-200 dark:bg-grid-neutral-900 flex items-center justify-center transition-colors duration-300 p-4">
        <motion.div
          className="relative w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="dark:bg-zinc-800 dark:text-gray-200 bg-white text-gray-800 p-8 rounded-lg shadow-2xl border dark:border-gray-700 border-gray-200">
            {/* Animated Borders */}
            <motion.div
              className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-500"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-500"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />

            {/* Heading */}
            <motion.h2
              className="text-3xl font-bold text-center mb-2"
              variants={itemVariants}
            >
              Register 
            </motion.h2>
            <motion.p
              className="text-center dark:text-gray-400 text-gray-600 mb-8"
              variants={itemVariants}
            >
              Register to continue to ShopEase
            </motion.p>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <motion.div className="space-y-6" variants={itemVariants}>
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2"
                  >
                    Name :
                  </label>
                  <motion.input
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border dark:bg-gray-700/50 dark:border-gray-600 dark:text-white bg-white/50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
                    placeholder="Enter Your Name .."
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2"
                  >
                    Email Address :
                  </label>
                  <motion.input
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border dark:bg-gray-700/50 dark:border-gray-600 dark:text-white bg-white/50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                   
                    className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2"
                  >
                    Enter Your Answe :
                  </label>
                  <motion.input
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border dark:bg-gray-700/50 dark:border-gray-600 dark:text-white bg-white/50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
                    placeholder="what is your Favorite Sport"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2"
                  >
                    Phone Number :
                  </label>
                  <motion.input
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border dark:bg-gray-700/50 dark:border-gray-600 dark:text-white bg-white/50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
                    placeholder="1234567890"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2"
                  >
                    Address :
                  </label>
                  <motion.input
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border dark:bg-gray-700/50 dark:border-gray-600 dark:text-white bg-white/50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
                    placeholder="Enter Address "
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2"
                  >
                    Password :
                  </label>
                  <motion.input
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.01 }}
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border dark:bg-gray-700/50 dark:border-gray-600 dark:text-white bg-white/50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Remember me & Forgot password */}
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border dark:border-gray-600 border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 text-sm dark:text-gray-300 text-gray-700 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-emerald-500 hover:text-emerald-400"
                  >
                    Forgot password?
                  </Link>
                </div> */}

                {/* Submit Button */}
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-3 px-4 rounded-md transition duration-300 ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "bg-gradient-to-b from-neutral-200 dark:from-neutral-900 via-neutral-100 dark:via-neutral-800"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      className="inline-block"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <IconLoader className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    "REGISTER"
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Social Login */}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Register;
