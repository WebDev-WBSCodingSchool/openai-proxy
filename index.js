import cors from 'cors';
import express from 'express';
import chatRouter from './routers/chatRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 5050;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/v1/chat/completions', chatRouter);
app.use('*', (req, res) => res.sendStatus(404));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
