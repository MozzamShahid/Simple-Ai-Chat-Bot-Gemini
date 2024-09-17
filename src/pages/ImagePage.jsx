import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ImagePage = () => {
  const { id } = useParams();  // Get the image ID from the URL
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch the image from Appwrite using the image ID
    const url = `https://cloud.appwrite.io/v1/storage/buckets/66e973c7003947ebd191/files/${id}/view`;
    setImageUrl(url);
  }, [id]);

  return (
    <div style={styles.container}>
      {imageUrl ? (
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
