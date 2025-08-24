import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';
import { createContext } from './trpc/context';
import { appRouter } from './trpc/routers/_app';
import env from './env';

const app = express();
app.use(cors());

app.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter, createContext }));

// 404 handler for unmatched routes
app.use('/*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `No route found for ${req.method} ${req.originalUrl}`,
  });
});

const startServer = async () => {
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
