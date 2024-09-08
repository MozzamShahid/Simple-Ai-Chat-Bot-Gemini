import React, { useState, useEffect } from 'react';
import { databases, storage, ID } from '../lib/appwrite'; // Ensure the correct path to Appwrite lib
import { useParams, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const EditProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({
    product_name: '',
    price: '',
    product_image: '',
    product_other_images: [],
    description: '',
    additional_description: '',
    tags: [],
    variant_prices: [],
  });
  const [mainImage, setMainImage] = useState(null); // For main image preview
  const [newOtherImages, setNewOtherImages] = useState([]); // For uploading new other images
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details from Appwrite
    const fetchProduct = async () => {
      try {
        const response = await databases.getDocument('DataMehb_', '66d8541f00396da8ee79', id);
        setProductData(response);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle form submission for editing
  const handleEdit = async (e) => {
    e.preventDefault();

    // Handle main image upload
    if (mainImage) {
      try {
        const mainImageFile = await storage.createFile('66d864280006f50f934b', ID.unique(), mainImage);
        productData.product_image = mainImageFile.$id;
      } catch (error) {
        console.error('Error uploading main image:', error);
      }
    }

    // Handle other images upload
    if (newOtherImages.length > 0) {
      const uploadedImages = [];
      for (const image of newOtherImages) {
        try {
          const response = await storage.createFile('66d864280006f50f934b', ID.unique(), image);
          uploadedImages.push(response.$id);
        } catch (error) {
          console.error('Error uploading other image:', error);
        }
      }
      productData.product_other_images = [...productData.product_other_images, ...uploadedImages];
    }

    // Update product in Appwrite database
    try {
      await databases.updateDocument('DataMehb_', '66d8541f00396da8ee79', id, productData);
      navigate('/show-product'); // Redirect to product list after editing
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Handle reordering of other images
  const moveImage = (index, direction) => {
    const updatedImages = [...productData.product_other_images];
    const [movedImage] = updatedImages.splice(index, 1);
    updatedImages.splice(index + direction, 0, movedImage);
    setProductData({ ...productData, product_other_images: updatedImages });
  };

  // Handle removing an image
  const removeImage = (index) => {
    const updatedImages = [...productData.product_other_images];
    updatedImages.splice(index, 1);
    setProductData({ ...productData, product_other_images: updatedImages });
  };

  // Handle new other images
  const handleNewOtherImages = (e) => {
    const files = Array.from(e.target.files).filter(file => file.size <= 2 * 1024 * 1024); // Only allow files <= 2MB
    setNewOtherImages([...newOtherImages, ...files]);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-8">Edit Product</h1>
      <form onSubmit={handleEdit}>
        {/* Product Name */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Product Name</label>
          <input
            type="text"
            value={productData.product_name}
            onChange={(e) => setProductData({ ...productData, product_name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Price (PKR)</label>
          <input
            type="number"
            value={productData.price}
            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Description</label>
          <textarea
            value={productData.product_description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Additional Description */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Additional Description</label>
          <textarea
            value={productData.additional_description}
            onChange={(e) => setProductData({ ...productData, additional_description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Main Image */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Main Image</label>
          <input
            type="file"
            onChange={(e) => setMainImage(e.target.files[0])}
            accept="image/*"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {productData.product_image && (
            <div className="mt-4">
              <img src={`https://cloud.appwrite.io/v1/storage/buckets/66d864280006f50f934b/files/${productData.product_image}/view?project=66d832a9001deb659a9e`} alt="Main" className="w-32 h-32 object-cover" />
            </div>
          )}
        </div>

        {/* Other Images */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Other Images</label>
          <input
            type="file"
            onChange={handleNewOtherImages}
            accept="image/*"
            multiple
            className="w-full px-4 py-2 border rounded-lg"
          />
          {productData.product_other_images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {productData.product_other_images.map((image, index) => (
                <div key={index} className="relative">
                 <img src={`https://cloud.appwrite.io/v1/storage/buckets/66d864280006f50f934b/files/${image}/view?project=66d832a9001deb659a9e`} alt={`Other ${index}`} className="w-32 h-32 object-cover" />
                  <div className="absolute inset-x-0 top-0 flex justify-center space-x-2 mt-1">
                    {index > 0 && (
                      <button type="button" onClick={() => moveImage(index, -1)} className="text-blue-500">
                        <FaArrowUp />
                      </button>
                    )}
                    {index < productData.product_other_images.length - 1 && (
                      <button type="button" onClick={() => moveImage(index, 1)} className="text-blue-500">
                        <FaArrowDown />
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-2 shadow"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mb-4">
  <label className="block mb-2 text-sm font-semibold">Tags</label>
  <input
    type="text"
    value={productData.tags.join(', ')} // Convert the tags array to a string for display
    onChange={(e) => setProductData({ ...productData, tags: e.target.value.split(',').map(tag => tag.trim()) })} // Update tags as an array
    className="w-full px-4 py-2 border rounded-lg"
    placeholder="Enter tags, separated by commas"
  />
</div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
