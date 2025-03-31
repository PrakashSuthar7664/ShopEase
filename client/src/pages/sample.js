import React, { useState } from "react";
import { FaTrash, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const ShoppingCart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Velvet Sneaker", size: "MD", price: 20, quantity: 2, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Smart Watch Timex", size: "SM", price: 60, quantity: 1, image: "https://via.placeholder.com/100" },
    { id: 3, name: "French Connection", size: "LG", price: 40, quantity: 1, image: "https://via.placeholder.com/100" },
    { id: 4, name: "Smart Watch", size: "LG", price: 60, quantity: 1, image: "https://via.placeholder.com/100" },
  ]);

  const updateQuantity = (id, change) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 2.0;
  const tax = 4.0;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Shopping Cart</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">Size: {item.size}</p>
                <p className="text-lg font-semibold">${item.price * item.quantity}.00</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 border rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 border rounded">+</button>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-500 ml-4"><FaTrash /></button>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex flex-col gap-2">
              <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
              <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
              <input type="tel" placeholder="Phone No." className="w-full p-2 border rounded" />
            </div>
            <div className="flex justify-between text-lg font-semibold mt-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-2 mt-4 rounded">Checkout</button>
            <button className="w-full bg-gray-300 py-2 mt-2 rounded">Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
