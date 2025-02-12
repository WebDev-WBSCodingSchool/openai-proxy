import OpenAI from 'openai';
import asyncHandler from '../utils/asyncHandler.js';

export const createChat = asyncHandler(async (req, res) => {
  const { messages } = req.body;

  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY });

  const completion = await openai.chat.completions.create({
    stream: false,
    ...messages,
  });
  res.json(completion.choices[0]);

  // if (stream) {
  //   res.writeHead(200, {
  //     Connection: 'keep-alive',
  //     'Cache-Control': 'no-cache',
  //     'Content-Type': 'text/event-stream',
  //   });
  //   for await (const chunk of completion) {
  //     res.write(`data: ${JSON.stringify(chunk)}\n\n`);
  //   }
  //   res.end();
  //   res.on('close', () => res.end());
  // } else {
  //   res.json(completion.choices[0]);
  // }
});
