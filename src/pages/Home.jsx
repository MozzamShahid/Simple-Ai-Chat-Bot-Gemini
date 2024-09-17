import React, { useState } from 'react';
import { ID, Databases } from 'appwrite';
import QRCode from 'react-qr-code';
import { client, storage } from '../lib/appwrite'; // Assuming you have your Appwrite setup

const Home = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [uniquePageUrl, setUniquePageUrl] = useState('');

  const databases = new Databases(client); // Appwrite Databases

  const uploadImage = async (file) => {
    try {
      // Upload image to the storage bucket
      const response = await storage.createFile(
        '66e973c7003947ebd191', // Your storage bucket ID
        ID.unique(),  // Generates a unique ID for the image
        file
      );
      const imageId = response.$id;  // Capture the image ID from the response
      const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/66e973c7003947ebd191/files/${imageId}/view`;

      // Update this to reflect the dynamic route you just created
      const qrUrl = `https://imgtoqr.vercel.app/${imageId}`; // This is the dynamic route

      setImageUrl(imageUrl);
      setUniquePageUrl(qrUrl);

      // Now store the image URL and QR URL in the database
      const document = await databases.createDocument(
        '66e973f1001b10c37a45', // Database ID: imgtoqr
        '66e9740300398104fc67', // Collection ID: imgqr
        ID.unique(), // Document ID (you can use ID.unique() for auto generation)
        {
          image_qr: imageUrl,   // Store the image URL in image_qr
          qr_img: qrUrl         // Store the QR URL in qr_img
        }
      );

      console.log('Document created:', document);

    } catch (error) {
      console.error('Error uploading the image or saving to database:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Upload Your Image</h1>
      <input 
        type="file" 
        accept="image/*" 
        style={styles.fileInput}
        onChange={(e) => uploadImage(e.target.files[0])}
      />
      {imageUrl && (
        <div style={styles.content}>
          {/* Display the uploaded image */}
          <div style={styles.imageContainer}>
            <img 
              src={imageUrl} 
              alt="Uploaded" 
              style={styles.uploadedImg}
            />
          </div>
          
          {/* Generate QR Code for the unique page URL */}
          {uniquePageUrl && (
            <div style={styles.qrContainer}>
              <QRCode value={uniquePageUrl} size={256} />
              <p style={styles.qrText}>Scan this QR code to view your image!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Basic styles for improving the visual appeal
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  header: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  fileInput: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  content: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: '20px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  uploadedImg: {
    maxWidth: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
  },
  qrContainer: {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: 'white',
    border: '2px solid #ddd',
    borderRadius: '8px',
  },
  qrText: {
    marginTop: '10px',
    fontSize: '1.2rem',
    color: '#333',
  },
};

export default Home;
