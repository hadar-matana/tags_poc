import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { createContext } from './trpc/context';
import { appRouter } from './trpc/routers/_app';
import env from './env';


// cr - you should create a bootstrap file
const app = express();
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use('/trpc', trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
  onError: ({ error }) => {
    console.error('tRPC Error:', error);
  },
}));

// Image serving endpoint
app.get('/api/image/:tableId/:entityId', async ({ params: { tableId, entityId } }, res) => {
  try {

    // Mock image service - return placeholder images
    const imageUrls = [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3',
      'https://picsum.photos/400/300?random=4',
      'https://picsum.photos/400/300?random=5',
    ];

    // Generate a consistent image URL based on the entity ID
    const hash = tableId.charCodeAt(0) + tableId.length + (entityId || '').length;
    const imageIndex = hash % imageUrls.length;
    const imageUrl = imageUrls[imageIndex];


    // Fetch and proxy the image
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    // Set proper headers for image - use the actual content type from response
    const contentType = response.headers['content-type'] || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');

    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error('Image serving error:', error);
    res.status(500).json({ error: 'Failed to serve image' });
  }
});

// 404 handler for unmatched routes
app.use('/*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `No route found for ${req.method} ${req.originalUrl}`,
  });
});


const startServer = () => {
  try {
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
