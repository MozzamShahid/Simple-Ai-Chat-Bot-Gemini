import React, { useState, useEffect } from 'react';
import { databases, storage, ID } from '../../lib/appwrite'; // Ensure the correct path to Appwrite lib
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa'; // Added FaEye for "Live View"
import { useNavigate } from 'react-router-dom';

const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [currentPage, setCurrentPage] = useState(1); // Pagination: current page
  const [itemsPerPage] = useState(10); // Number of items per page

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from Appwrite
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(
          'DataMehb_', // Database ID
          '66d8541f00396da8ee79' // Collection ID
        );
        const updatedProducts = await Promise.all(
          response.documents.map(async (product) => {
            const imageUrl = await getImageUrl(product.product_image);
            return { ...product, imageUrl };
          })
        );
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch image URL from storage
  const getImageUrl = async (fileId) => {
    try {
      const result = await storage.getFileView('66d864280006f50f934b', fileId);
      return result.href;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  // Handle delete confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await databases.deleteDocument('DataMehb_', '66d8541f00396da8ee79', id);
        setProducts(products.filter((product) => product.$id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filtered Products based on Search
  const filteredProducts = currentProducts.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold text-center mb-8">Product List</h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="custom-input border border-gray-300 rounded p-2"
        />
      </div>

      {/* Product Table */}
      <table className="min-w-full bg-white border rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.$id} className="border-b">
              <td className="py-2 px-4">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.product_name}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td className="py-2 px-4">{product.product_name}</td>
              <td className="py-2 px-4">{product.price || 'N/A'}</td>
              <td className="py-2 px-4 flex space-x-4">
                <button
                  onClick={() => navigate(`/live-product/${product.$id}`)}  // Correctly passing the product ID
                  className="text-green-500 hover:text-green-700"
                >
                  <FaEye /> View
                </button>
                <button
                  onClick={() => navigate(`/edit-product/${product.$id}`)} // For editing product
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product.$id)} // For deleting product
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-8">
        {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`${
              currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            } px-4 py-2 rounded`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
