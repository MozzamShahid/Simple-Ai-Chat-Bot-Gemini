import React, { useState } from 'react';
import { databases, storage, ID } from '../../lib/appwrite'; // Ensure this path is correct
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductAdd = () => {
  // State for form fields
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [additionalDescription, setAdditionalDescription] = useState('');
  const [productLink, setProductLink] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);
  const [simplePrice, setSimplePrice] = useState('');
  const [comparePrice, setcomparePrice] = useState('');
  const [tags, setTags] = useState(['', '', '']); // State for up to 3 tags
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info('Form submitted');

    try {
      // Ensure a main image is selected
      if (!mainImage) {
        setMessage('Main image is required.');
        toast.error('Main image is missing');
        return;
      }

      toast.info('Uploading main image...');
      const mainImageFile = await storage.createFile('66d864280006f50f934b', ID.unique(), mainImage);
      toast.success('Main image uploaded');

      // Prepare product data
      const productData = {
        product_name: productName,
        product_description: description,
        product_link: productLink || productName.toLowerCase().replace(/\s+/g, '-'),
        product_image: mainImageFile.$id, // Store the main image ID
        product_other_images: [],
        tags: tags.filter(tag => tag), // Ensure empty tags are removed
        additional_description: additionalDescription || '', // Optional description
        price: parseFloat(simplePrice), // Handle simple pricing
        compare_price: parseFloat(comparePrice) //
      };

      // Uploading other images
      if (otherImages.length > 0) {
        const uploadedImages = [];
        for (const image of otherImages) {
          const response = await storage.createFile('66d864280006f50f934b', ID.unique(), image);
          uploadedImages.push(response.$id);
          toast.success(`Uploaded other image: ${response.$id}`);
        }
        productData.product_other_images = uploadedImages;
      }

      // Submit product data to Appwrite database
      toast.info('Submitting product data...');
      const response = await databases.createDocument(
        'DataMehb_', // Database ID
        '66d8541f00396da8ee79', // Collection ID
        ID.unique(),
        productData
      );

      toast.success('Product added successfully!');
      setMessage('Product added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

 // Handle tag input changes
 const handleTagChange = (index, value) => {
  const updatedTags = [...tags];
  updatedTags[index] = value;
  setTags(updatedTags);
};

  // Reset form after submission
  const resetForm = () => {
    setProductName('');
    setDescription('');
    setAdditionalDescription('');
    setProductLink('');
    setMainImage(null);
    setOtherImages([]);
    setSimplePrice('');
    setTags(['', '', '']);
    setcomparePrice('');
  };

  return (
    <div className="form-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-container">
      <ToastContainer /> {/* Add ToastContainer to show notifications */}
      {/* Product Text Fields */}
      <div>
        <h1 className='text-3xl font-bold flex justify-center text-blue-500'>Add Your Product</h1>
        <div className="mb-4">
          <label className="form-label">Product Title (*)</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="custom-input"
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Description (*)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="custom-input"
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Product Link (*)</label>
          <input
            type="text"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            className="custom-input"
            placeholder="Enter product link"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Additional Description (Optional)</label>
          <textarea
            value={additionalDescription}
            onChange={(e) => setAdditionalDescription(e.target.value)}
            className="custom-input"
            placeholder="Enter additional description (optional)"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Price (PKR) (*)</label>
          <input
            type="number"
            value={simplePrice}
            onChange={(e) => setSimplePrice(e.target.value)}
            className="custom-input"
            placeholder="Enter price in PKR"
            required
          />
        </div>

      <div className="mb-4">
          <label className="form-label">Compare Price (PKR)</label>
          <input
            type="number"
            value={comparePrice}
            onChange={(e) => setcomparePrice(e.target.value)}
            className="custom-input"
            placeholder="Enter price in PKR"
            required
          />
        </div>
      </div>

      {/* Product Images */}
      <div>
        <div className="mb-4">
          <label className="form-label">Main Image (Max 2MB) (*)</label>
          <input
            type="file"
            onChange={(e) => setMainImage(e.target.files[0])}
            accept="image/*"
            className="custom-input"
            required
          />
          {mainImage && (
            <div className="mt-4 relative">
              <img src={URL.createObjectURL(mainImage)} alt="Main" className="w-full" />
              <button type="button" onClick={() => setMainImage(null)} className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-2 shadow">
                Remove
              </button>
            </div>
          )}
        </div>

        

        <div className="mb-4">
          <label className="form-label">Other Images (Max 2MB each) (*)</label>
          <input
            type="file"
            onChange={(e) => {
              const files = Array.from(e.target.files).filter(file => file.size <= 2 * 1024 * 1024);
              setOtherImages(files);
            }}
            accept="image/*"
            multiple
            className="custom-input"
          />
          {otherImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {otherImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(image)} alt={`Other ${index}`} className="w-full" />
                  <button type="button" onClick={() => {
                    const updatedImages = [...otherImages];
                    updatedImages.splice(index, 1);
                    setOtherImages(updatedImages);
                  }} className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-2 shadow">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Tags Input */}
        <div className="mb-4">
          <label className="form-label">Tags (Up to 3)</label>
          {tags.map((tag, index) => (
            <input
              key={index}
              type="text"
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
              className="custom-input flex mb-2"
              placeholder={`Tag ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="col-span-2 text-center">
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <button type="submit" onClick={handleSubmit} className="custom-button bg-blue-500 text-white">
          Add Product
        </button>
      </div>
    </div>
    
    {/* Secound Columns Button */}
    <div className='form-container-3 m-4 '>
    <section class="bg-blue-500 text-white rounded-md p-6 md:p-8">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Product Registration Form</h2>
        <p class="mb-4 text-lg">
            Welcome to our product registration portal. To ensure your product is registered correctly, please follow these simple tips:
        </p>
        <ul class="list-disc list-inside mb-5 space-y-2">
            <li>Ensure all required fields are filled out—these are marked with an asterisk (*).</li>
            <li>Double-check your product serial number for accuracy to avoid delays in registration.</li>
            <li>Provide a valid email address to receive confirmation and future updates about your product.</li>
        </ul>
        <p class="mb-5 text-lg">
            This application was crafted with care by Mozzam, dedicated to providing free and easy-to-use solutions for everyday tasks. Our commitment is to enhance your experience without any cost.
        </p>
        <p class="text-lg">
            If you have any questions or need assistance, feel free to contact our support team. Enjoy seamless product registration and stay tuned for more updates and features!
        </p>
    </div>
</section>
    </div>
    </div>
  );
};

export default ProductAdd;

//Single Product Page