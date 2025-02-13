import OpenAI from 'openai';

export const createChat = async (req, res) => {
  try {
    const request = req.body;

    const openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY });

    const completion = await openai.chat.completions.create({
      stream: false,
      model: 'gpt-4o',
      ...request,
    });
    res.json(completion.choices[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
