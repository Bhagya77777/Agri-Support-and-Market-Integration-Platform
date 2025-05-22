import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, X } from 'lucide-react';
import FarmerHeader from './FarmerHeader';
import FarmerFooter from './FarmerFooter';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  productionCost: number;
  fairProfitMargin: number;
  farmer: string;
}

const FarmerViewProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formValues, setFormValues] = useState<Partial<Product>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/get-products');
      setProducts(res.data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/delete-products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormValues(product);
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: ['price', 'quantity', 'productionCost', 'fairProfitMargin'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const updateProduct = async () => {
    if (!editingProduct) return;
    try {
      const updatedRes = await axios.put(
        `http://localhost:5000/api/products/update-products/${editingProduct._id}`,
        formValues
      );
      setProducts(prev =>
        prev.map(p => (p._id === editingProduct._id ? updatedRes.data.data : p))
      );
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen flex flex-col">
      <FarmerHeader />

      <main className="flex-grow max-w-5xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center pb-32">
          My Products
        </h1>

        {loading ? (
          <div className="text-center text-green-700">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
            {products.map(product => (
              <div
                key={product._id}
                className={`border rounded-xl p-5 shadow-lg transition transform hover:scale-[1.01] ${product.quantity === 0 ? 'opacity-60' : 'bg-white'
                  }`}
              >
                <div className="flex justify-between items-start">
                  <h5 className="text-green-700 font-bold text-lg">{product.name}</h5>
                  <div className={`text-xs px-2 py-1 rounded-full text-white ${product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                    {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>

                <div className="bg-yellow-100 p-3 rounded-md my-3">
                  <h3 className="text-green-700 text-xl font-semibold">Rs {product.price.toFixed(2)}</h3>
                  <p className="text-sm text-gray-600">Production Cost: Rs {product.productionCost.toFixed(2)}</p>
                </div>

                <p className="text-gray-700 mb-1">Available: {product.quantity}</p>
                <p className="text-gray-700 mb-3">
                  Category: <span className="text-sm font-medium bg-yellow-300 text-yellow-900 px-2 py-1 rounded">{product.category || 'N/A'}</span>
                </p>

                <div className="flex justify-between items-center gap-2 mt-2">
                  <button className="text-blue-600 hover:text-blue-800" onClick={() => openEditModal(product)}>
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800" onClick={() => deleteProduct(product._id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <FarmerFooter />

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-green-700 mb-4">Edit Product</h2>
            <div className="space-y-4">
              {[
                { name: 'name', placeholder: 'Product Name' },
                { name: 'category', placeholder: 'Category' },
                { name: 'price', placeholder: 'Price (Rs.)' },
                { name: 'quantity', placeholder: 'Quantity' },
                { name: 'productionCost', placeholder: 'Production Cost (Rs.)' },
                { name: 'fairProfitMargin', placeholder: 'Profit Margin (%)' },
              ].map(({ name, placeholder }) => (
                <div key={name}>
                  <input
                    name={name}
                    type={['price', 'quantity', 'productionCost', 'fairProfitMargin'].includes(name) ? 'number' : 'text'}
                    value={(formValues as any)[name] ?? ''}
                    onChange={handleUpdateChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              ))}
              <button
                onClick={updateProduct}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerViewProducts;
