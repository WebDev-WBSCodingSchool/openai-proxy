import { PassThrough } from 'stream';
import OpenAI from 'openai';
import OpenAIMock from '../utils/OpenAIMock.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const createAudio = asyncHandler(async (req, res) => {
  const {
    body: { id, ...request },
    headers: { mode }
  } = req;

  let openai;

  mode === 'production'
    ? (openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY }))
    : (openai = new OpenAIMock());

  const mp3 = await openai.audio.speech.create(request);

  const passThrough = new PassThrough(); // Create a PassThrough stream
  mp3.body.pipe(passThrough); // Pipe the MP3 audio stream to the PassThrough stream
  // Set the response headers to indicate chunked transfer encoding and content type as audio/mpeg
  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Transfer-Encoding': 'chunked'
  });
  // Pipe the PassThrough stream to the response and handle any errors
  passThrough.pipe(res).on('error', error => {
    throw new ErrorResponse(error.message, 500);
  });
});
