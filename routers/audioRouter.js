import { Router } from 'express';
import { createAudio } from '../controllers/audios.js';

const audioRouter = Router();

audioRouter.post('/', createAudio);

export default audioRouter;
