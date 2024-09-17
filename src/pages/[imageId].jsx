import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client, storage } from '../lib/appwrite'; // Appwrite setup

const ImagePage = () => {
  const { imageId } = useParams();  // Extract the imageId from the URL
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Construct the URL to fetch the image from Appwrite
    const url = `https://cloud.appwrite.io/v1/storage/buckets/66e973c7003947ebd191/files/${imageId}/view`;
    setImageUrl(url);
  }, [imageId]);

  return (
    <div style={styles.container}>
      {imageUrl ? (
        <div style={styles.imageContainer}>
          <img src={imageUrl} alt="Image" style={styles.uploadedImg} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
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
};

export default ImagePage;
