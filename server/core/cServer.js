import express from 'express';
import cMiddleware from './cMiddleware';
import cRoutes from './cRoutes';
import cError from './cError';
import path from 'path';
import fallback from 'express-history-api-fallback';

const app = express();

// Middlewares
cMiddleware(app);

// Api Router
app.use(cRoutes);

export const publicPath = path.join(__dirname, '../../build');
export const staticPath = path.join(__dirname, '../../static');
// Public Folder
app.use('/', express.static(publicPath));
app.use('/static', express.static(staticPath));
app.use(fallback('index.html', { root: publicPath }));

// Error Handling
cError(app);

export default app;