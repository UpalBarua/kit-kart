import axios from 'axios';

const uploadImage = async (imageData: File | Blob): Promise<string> => {
  if (!imageData) {
    throw new Error('No imageData provided to the uploadImage() function.');
  }

  const formData = new FormData();
  formData.append('image', imageData);

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_KEY}`,
      formData
    );

    if (data?.data?.display_url) {
      return data.data.display_url;
    }

    throw new Error('Failed to upload image: No display URL returned.');
  } catch (error: any) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

export default uploadImage;
