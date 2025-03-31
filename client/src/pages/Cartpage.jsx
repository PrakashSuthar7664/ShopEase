import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/Cart";
import Layout from "../components/layout/Layout";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import braintree from "braintree-web";

const Cartpage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState(null);
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  // Remove item from cart
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  // Fetch client token
  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
        setClientToken(data?.clientToken);
      } catch (error) {
        console.error("Failed to get payment token:", error);
        toast.error("Failed to initialize payment");
      }
    };
    getToken();
  }, []);

  // Initialize Braintree Hosted Fields
  useEffect(() => {
    if (clientToken) {
      braintree.client.create({ authorization: clientToken }, (err, clientInstance) => {
        if (err) {
          console.error("Braintree client error:", err);
          return;
        }
        braintree.hostedFields.create(
          {
            client: clientInstance,
            styles: { input: { "font-size": "16px", "font-family": "Arial" } },
            fields: {
              number: { selector: "#card-number", placeholder: "Card Number" },
              cvv: { selector: "#cvv", placeholder: "CVV" },
              expirationDate: { selector: "#expiration-date", placeholder: "MM/YY" },
            },
          },
          (err, hostedFieldsInstance) => {
            if (err) {
              console.error("Hosted Fields error:", err);
              return;
            }
            setBraintreeInstance(hostedFieldsInstance);
          }
        );
      });
    }
  }, [clientToken]);

  // Handle payment
  const handlePayment = async () => {
    if (!auth?.user?.address) {
      toast.error("Please update your shipping address");
      return navigate("/dashboard/user/profile");
    }

    if (!braintreeInstance) {
      toast.error("Payment instance not initialized. Try again.");
      return;
    }

    try {
      setLoading(true);
      braintreeInstance.tokenize((err, payload) => {
        if (err) {
          console.error("Tokenization error:", err);
          toast.error("Payment failed. Please try again.");
          setLoading(false);
          return;
        }

        axios.post(
          `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
          { nonce: payload.nonce, cart }
        )
        .then(() => {
          localStorage.removeItem("cart");
          setCart([]);
          toast.success("Payment Completed Successfully");
          navigate("/dashboard/user/orders");
        })
        .catch((error) => {
          console.error("Payment failed:", error);
          toast.error("Payment failed. Please try again.");
        })
        .finally(() => setLoading(false));
      });
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Shopping Cart</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center border-b py-4">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => { e.target.src = '/placeholder-product-image.jpg'; }}
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">{item.description.substring(0, 30)}...</p>
                  <p className="text-lg font-semibold">${item.price}</p>
                </div>
                <button
                  onClick={() => removeCartItem(item._id)}
                  className="text-red-500 ml-4 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-lg font-semibold mt-4">
                <span>Total</span>
                <span>${totalPrice()}</span>
              </div>
              <hr className="my-2" />

              {auth?.user?.address ? (
                <div className="mb-3">
                  <div className="bg-zinc-200 mb-2 p-3 rounded-md">
                    <h4 className="font-semibold">Current Address</h4>
                    <p className="text-sm">{auth.user.address}</p>
                  </div>
                  <button
                    className="bg-zinc-300 p-2 rounded-md hover:bg-zinc-400 w-full"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  <button
                    className="bg-red-200 p-2 rounded-md hover:bg-red-300 w-full"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login to Checkout
                  </button>
                </div>
              )}

              {clientToken && (
                <div className="mt-4">
                 <div className="p-4 bg-white rounded-md shadow space-y-3">
  <div>
    <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
    <div id="card-number" className="p-2 border border-gray-300 rounded bg-gray-50 hover:border-blue-400 focus-within:border-blue-500 transition duration-200 text-sm"></div>
  </div>

  <div className="grid grid-cols-2 gap-2">
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">Expiration Date</label>
      <div id="expiration-date" className="p-2 border border-gray-300 rounded bg-gray-50 hover:border-blue-400 focus-within:border-blue-500 transition duration-200 text-sm"></div>
    </div>

    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">CVV</label>
      <div id="cvv" className="p-2 border border-gray-300 rounded bg-gray-50 hover:border-blue-400 focus-within:border-blue-500 transition duration-200 text-sm"></div>
    </div>
  </div>
</div>


                  <button
                    className={`w-full p-3 rounded-md mt-4 ${
                      loading || !braintreeInstance
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-400 hover:bg-green-500"
                    }`}
                    onClick={handlePayment}
                    disabled={loading || !braintreeInstance}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cartpage;
