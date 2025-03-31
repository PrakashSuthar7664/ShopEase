import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconLoader } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../components/layout/Layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
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
      <div className="flex items-center justify-center p-4">
        <motion.div
          className="relative w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="dark:bg-zinc-800 dark:text-gray-200 bg-white text-gray-800 p-8 rounded-lg shadow-2xl border dark:border-gray-700 border-gray-200">
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
            
            <motion.h2 className="text-3xl font-bold text-center mb-2" variants={itemVariants}>
              Reset Password
            </motion.h2>
            <motion.p className="text-center text-gray-600 mb-8" variants={itemVariants}>
              Enter your details to reset your password
            </motion.p>

            <form onSubmit={handleSubmit}>
              <motion.div className="space-y-6" variants={itemVariants}>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Email Address:</label>
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border bg-white border-gray-300 text-gray-900 focus:ring-emerald-500 transition duration-300"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Security Answer:</label>
                  <motion.input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border bg-white border-gray-300 text-gray-900 focus:ring-emerald-500 transition duration-300"
                    placeholder="Your favorite sport"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">New Password:</label>
                  <motion.input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border bg-white border-gray-300 text-gray-900 focus:ring-emerald-500 transition duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 px-4 rounded-md bg-emerald-500 text-white font-bold transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      className="inline-block"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <IconLoader className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    "Reset Password"
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;