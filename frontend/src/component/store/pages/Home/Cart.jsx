import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaShoppingCart, FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';

function Cart({ cart, setCart }) {
  const handleRemoveFromCart = (item) => {
    setCart(cart.filter((cartItem) => cartItem._id !== item._id));
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      handleRemoveFromCart(item);
    } else if (newQuantity <= item.qty) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    } else {
      alert(`Cannot add more than ${item.qty} of ${item.name} to the cart.`);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-green-300 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-amber-300 rounded-full filter blur-3xl opacity-20"></div>

      <div className="container mx-auto py-10 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/store" 
            className="flex items-center text-green-700 hover:text-green-900 mb-6 group transition-colors"
          >
            <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" /> 
            <span>Continue Shopping</span>
          </Link>

          <div className="glass-card p-6 rounded-2xl mb-8">
            <h2 className="text-3xl text-center font-bold text-green-800 mb-6">
              Your Shopping Cart
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white/30 rounded-full mb-6">
                  <FaShoppingCart className="text-4xl text-green-600 opacity-70" />
                </div>
                <h3 className="text-xl text-gray-700 mb-4">Your cart is empty</h3>
                <Link 
                  to="/store" 
                  className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div>
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div 
                      key={item._id} 
                      className="glass-card-item p-5 rounded-xl flex flex-col md:flex-row items-center justify-between transition-all hover:shadow-md"
                    >
                      <div className="flex items-center mb-4 md:mb-0 md:w-1/3">
                        <div className="w-16 h-16 bg-white/50 rounded-lg flex items-center justify-center mr-4">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-2xl text-gray-500">🌱</span>
                          )}
                        </div>
                        <div>
                          <h5 className="text-lg font-semibold text-gray-800">{item.name}</h5>
                          <div className="flex items-center mt-1">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">
                              {item.category || 'General'}
                            </span>
                            <span className="text-xs text-gray-500">Stock: {item.qty}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 md:w-1/3 justify-center">
                        <button 
                          className="w-8 h-8 flex items-center justify-center bg-white/70 rounded-full text-green-600 hover:bg-green-100 transition-colors"
                          onClick={() => handleQuantityChange(item, -1)}
                        >
                          <FaMinus className="text-sm" />
                        </button>
                        <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center bg-white/70 rounded-full text-green-600 hover:bg-green-100 transition-colors"
                          onClick={() => handleQuantityChange(item, 1)}
                        >
                          <FaPlus className="text-sm" />
                        </button>
                      </div>

                      <div className="flex items-center justify-end md:w-1/3 mt-4 md:mt-0">
                        <div className="text-right mr-4">
                          <p className="text-sm text-gray-500">Unit Price</p>
                          <p className="text-lg font-semibold text-green-700">LKR {item.price.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="text-lg font-bold text-orange-600">LKR {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button 
                          className="ml-4 w-8 h-8 flex items-center justify-center bg-white/70 rounded-full text-red-500 hover:bg-red-100 transition-colors"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          <FaTrashAlt className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-card p-6 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold text-gray-700">Subtotal</h4>
                    <p className="text-xl font-medium text-gray-800">LKR {getTotalPrice()}</p>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-semibold text-gray-700">Delivery</h4>
                    <p className="text-xl font-medium text-gray-800">LKR 0.00</p>
                  </div>
                  <hr className="border-amber-300 my-4" />
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Total Amount</h3>
                    <h3 className="text-2xl font-bold text-orange-600">LKR {getTotalPrice()}</h3>
                  </div>
                  <Link 
                    to="/checkout" 
                    className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add this to your CSS file */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
        }
        .glass-card-item {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

export default Cart;