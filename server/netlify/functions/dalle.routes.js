import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const router = express.Router();
const jsonParser = bodyParser.json(); // Create JSON parser middleware

router.route('/generate-image').post(jsonParser, async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Please provide a prompt' });
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
      res.status(200).json({ base64ImageData });
    }
  } catch (error) {
    res.status(500).json({ error: 'Image generation failed' });
  }
});

export default router;
