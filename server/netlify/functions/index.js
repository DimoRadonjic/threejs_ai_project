import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http';

import dalleRoutes from './dalle.routes.js';

dotenv.config();

const app = express();
// Create a router to handle routes
const router = express.Router();
app.use(cors());

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use('/.netlify/functions/index/api', router);

// Export the app and the serverless function
export const handler = serverless(app);

// app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from DALL.E' });
});

app.listen(8080, () => console.log('Server has started on port 8080'));
