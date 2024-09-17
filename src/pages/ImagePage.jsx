import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ImagePage = () => {
  const { id } = useParams();  // Get the image ID from the URL
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Construct the correct URL to fetch the image from Appwrite
    const url = `https://cloud.appwrite.io/v1/storage/buckets/66e973c7003947ebd191/files/${id}/view`;

    // Set the image URL
    setImageUrl(url);

    // Check if the image loads properly, and set error if it fails
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
      })
      .catch(() => {
        setError('Image could not be loaded');
      });
  }, [id]);

  return (
    <div style={styles.container}>
      {error ? (
        <p>{error}</p>
      ) : imageUrl ? (
        <img src={imageUrl} alt="Image" style={styles.image} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '80vh',
    objectFit: 'contain',
  },
};

export default ImagePage;
