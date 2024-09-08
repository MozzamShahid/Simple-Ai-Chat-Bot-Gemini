import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { databases, storage } from '../lib/appwrite'; // Correct path to Appwrite

const ProductPage = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    // Fetch product by ID from Appwrite
    const fetchProduct = async () => {
      try {
        const response = await databases.getDocument('DataMehb_', '66d8541f00396da8ee79', id);
        setProduct(response);
        setSelectedImage(response.product_image); // Set the selected image initially
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div className="flex flex-col items-center">
          <div className="w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={`https://cloud.appwrite.io/v1/storage/buckets/66d864280006f50f934b/files/${selectedImage}/view?project=66d832a9001deb659a9e`}
              alt={product.product_name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Image Thumbnails */}
          <div className="flex mt-4 space-x-4">
            {[product.product_image, ...product.product_other_images].map((image, index) => (
              <img
                key={index}
                src={`https://cloud.appwrite.io/v1/storage/buckets/66d864280006f50f934b/files/${image}/view?project=66d832a9001deb659a9e`}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover cursor-pointer rounded-lg ${selectedImage === image ? 'border-2 border-blue-500' : 'border'}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
            <p className="text-2xl font-semibold text-blue-600 mb-4">PKR {product.price || 'N/A'}</p>
            <p className="text-gray-700 mb-4">{product.product_description}</p>

            {/* Product Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Tags:</h3>
                <div className="flex flex-wrap space-x-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div>
            <button className="w-full px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-500 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
