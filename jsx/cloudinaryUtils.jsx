// cloudinaryUtils.js
import axios from 'axios';

export const uploadImageToCloudinary = async (base64Image) => {
  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dnuebwq2e/image/upload';
  const unsignedUploadPreset = 'qrgijwbz';

  try {
    const response = await axios.post(cloudinaryUrl, {
      file: base64Image,
      upload_preset: unsignedUploadPreset,
    });
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};
