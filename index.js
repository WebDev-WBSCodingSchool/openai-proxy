import cors from 'cors';
import express from 'express';
import errorHandler from './middlewares/errorHandler.js';

import chatRouter from './routers/chatRouter.js';
import imageRouter from './routers/imageRouter.js';

const app = express();
const port = process.env.PORT;
app.use(cors({ origin: '*' }), express.json());

app.use('/api/v1/chat/completions', chatRouter);
app.use('/api/v1/images/generations', imageRouter);

app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
