import { Router } from 'express';
import { createImage } from '../controllers/images.js';

const imageRouter = Router();

imageRouter.post('/', createImage);

export default imageRouter;
