import React, { useState } from 'react';
import axios from 'axios';

const DebrisForm = ({ location }) => {
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Set in Cloudinary

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dtw42iaa6/image/upload', data);
      return res.data.secure_url;
    } catch (err) {
      console.error('Image upload failed:', err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading...');

    const imageUrl = await handleImageUpload();
    if (!imageUrl) {
      setStatus('Image upload failed');
      return;
    }

    const report = {
      type,
      imageUrl,
      lat: location?.lat,
      lng: location?.lng,
    };

    try {
      await axios.post('http://localhost:5000/api/reports', report);
      setStatus('Report submitted successfully!');
    } catch (err) {
      console.error(err);
      setStatus('Submission failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Type of Debris:</label>
      <input value={type} onChange={(e) => setType(e.target.value)} required />

      <label>Upload Image:</label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />

      <button type="submit">Submit Report</button>

      <p>{status}</p>
    </form>
  );
};

export default DebrisForm;
