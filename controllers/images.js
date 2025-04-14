import OpenAI from 'openai';
import OpenAIMock from '../utils/OpenAIMock.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createImage = asyncHandler(async (req, res) => {
  const {
    body: { ...request },
    headers: { mode },
  } = req;

  let openai;

  mode === 'production'
    ? (openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY }))
    : (openai = new OpenAIMock());
  const image = await openai.images.generate({
    ...request,
  });
  console.log(image.data);
  res.json(image.data);
});
