import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Notification from '../../components/Notification';
import BuyerHeader from '../../../Buyer/BuyerHeader';
import BuyerFooter from '../../../Buyer/BuyerFooter';

function Store({ cart, setCart }) {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/store-items/store-items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item) => {
    if (item.quantity > 0) {
      const itemInCart = cart?.find((cartItem) => cartItem._id === item._id);

      if (itemInCart) {
        if (itemInCart.quantity < item.quantity) {
          setCart(
            cart.map((cartItem) =>
              cartItem._id === item._id
                ? { ...itemInCart, quantity: itemInCart.quantity + 1 }
                : cartItem
            )
          );
        } else {
          setNotification(`Cannot add more than ${item.quantity} of ${item.name} to the cart.`);
        }
      } else {
        setCart([...cart, { ...item, quantity: 1, qty: item.quantity }]);
      }
    } else {
      setNotification('This item is out of stock.');
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="bg-yellow-50 min-h-screen">
      <BuyerHeader />
      <div className="container mx-auto py-10 px-4">
        {notification && (
          <Notification message={notification} onClose={handleCloseNotification} />
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">Welcome to Store</h1>
          <div className="flex gap-4">
            <Link to="/cart" state={{ items }} className="btn-primary">Cart</Link>
            <Link to="/my-orders" className="btn-outline">My Orders</Link>
            <Link to="/profile" className="btn-outline">Profile</Link>
          </div>
        </div>

        <div className="mb-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search items by name..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 border-2 border-yellow-400 text-green-950 placeholder:text-green-600 rounded-lg shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className={`border rounded-lg p-4 shadow-lg ${item.quantity === 0 ? 'opacity-60' : ''}`}
            >
              <h5 className="text-green-700 font-bold text-lg">{item.name}</h5>
              <div className={`badge ${item.quantity > 0 ? 'bg-green-500' : 'bg-red-500'} text-white`}> 
                {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </div>

              <div className="bg-yellow-100 p-3 rounded-md my-3">
                <h3 className="text-green-700 text-xl">RS {item.price.toFixed(2)}</h3>
                <p className="text-sm text-gray-600">Production Cost: RS {item.productionCost.toFixed(2)}</p>
              </div>

              <p className="text-gray-700">Available: {item.quantity}</p>
              <p className="text-gray-700">Category: <span className="badge bg-yellow-400 text-brown-500">{item.category || 'N/A'}</span></p>

              <button
                className={`w-full mt-3 p-3 rounded-lg ${item.quantity === 0 ? 'bg-gray-400' : 'bg-green-500 text-white'}`}
                onClick={() => handleAddToCart(item)}
                disabled={item.quantity === 0}
              >
                {item.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-gray-600">No items found</h3>
          </div>
        )}
      </div>
      <BuyerFooter />
    </div>
  );
}

export default Store;