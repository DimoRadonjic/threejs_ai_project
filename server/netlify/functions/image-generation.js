import axios from 'axios';

exports.handler = async (event, context) => {
  const prompt = event?.body;

  if (!prompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Please provide a prompt' }),
    };
  }

  try {
    const formData = new FormData();
    formData.append('prompt', prompt);

    const axiosConfig = {
      headers: {
        'x-api-key':
          '711bdaf1ae69fbed2fd30d98c2310495459a90b83a82d167a73ad1317a775299fa0d0abcd6117613d6ac0812332c9ad3',
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'arraybuffer', // Set the response type to arraybuffer
    };

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      axiosConfig
    );

    const uint8Array = new Uint8Array(data);
    const base64ImageData = Buffer.from(uint8Array).toString('base64');

    if (base64ImageData) {
      return {
        statusCode: 200,
        body: JSON.stringify({ base64ImageData }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Image generation failed' }),
    };
  }

  // If no valid response is returned within the try block, return a default response
  return {
    statusCode: 500,
    body: JSON.stringify({ error: 'Unexpected error occurred' }),
  };
};

exports.handler.path = '/generate-image';

export { handler };
