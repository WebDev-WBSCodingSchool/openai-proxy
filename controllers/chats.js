import OpenAI from 'openai';
import asyncHandler from '../utils/asyncHandler.js';

export const createChat = asyncHandler(async (req, res) => {
  const { messages } = req.body;
  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY });
  const completion = await openai.chat.completions.create({
    stream: false,
    model: 'gpt-4o',
    messages: [...messages],
  });
  console.log(completion.choices[0]);
  res.json(completion.choices[0]);
});
