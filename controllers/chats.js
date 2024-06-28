import OpenAI from 'openai';
import OpenAIMock from '../utils/OpenAIMock.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const createChat = asyncHandler(async (req, res) => {
  const {
    body: { stream, ...request },
    headers: { mode, provider }
  } = req;

  let openai;
  switch (provider) {
    case 'open-ai': {
      switch (mode) {
        case 'production':
          openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY });
          break;
        case 'development':
          openai = new OpenAIMock();
          break;
        default:
          throw new ErrorResponse(
            'Only valid values for mode are "production" or "development"',
            400
          );
      }
      break;
    }
    default:
      throw new ErrorResponse('Unsupported provider', 400);
  }

  if (mode === 'development') {
    if (!request.model) {
      throw new ErrorResponse('400 you must provide a model parameter', 400);
    }
    if (!request.messages) {
      throw new ErrorResponse("400 Missing required parameter: 'messages'", 400);
    }
  }

  const completion = await openai.chat.completions.create({
    stream,
    ...request
  });

  if (stream) {
    res.writeHead(200, {
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream'
    });
    for await (const chunk of completion) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    res.end();
    res.on('close', () => res.end());
  } else {
    res.json(completion.choices[0]);
  }
});
