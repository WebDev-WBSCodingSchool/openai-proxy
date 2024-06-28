class StreamMock {
  constructor(words) {
    this.words = words;
    this.iterator = this[Symbol.asyncIterator];
    this.controller = new AbortController();
  }

  async *[Symbol.asyncIterator]() {
    for (let [i, v] of this.words.entries()) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (this.controller.signal.aborted) {
        break;
      }
      if (i === this.words.length - 1) {
        yield {
          id: 'chatcmpl-UNIQUEID',
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: 'gpt-3.5-mock',
          system_fingerprint: 'fp_c2295e73ad',
          choices: [
            { index: 0, delta: { content: `${v} ` }, logprobs: null, finish_reason: 'stop' }
          ]
        };
      } else {
        yield {
          id: 'chatcmpl-UNIQUEID',
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: 'gpt-3.5-mock',
          system_fingerprint: 'fp_c2295e73ad',
          choices: [{ index: 0, delta: { content: `${v} ` }, logprobs: null, finish_reason: null }]
        };
      }
    }
  }
}

class ChatMock {
  completions = {
    create({ messages, model, stream }) {
      const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      if (stream) {
        return new StreamMock(text.split(' '));
      } else {
        return {
          id: 'chatcmpl-9GkKWpvJxL7CCdq3xulB1WIgH4oLT',
          object: 'chat.completion',
          created: 1713778368,
          model: 'gpt-3.5-turbo-0125',
          choices: [
            {
              index: 0,
              message: {
                role: 'assistant',
                content: text
              },
              logprobs: null,
              finish_reason: 'stop'
            }
          ],
          usage: { prompt_tokens: 27, completion_tokens: 29, total_tokens: 56 },
          system_fingerprint: 'fp_c2295e73ad'
        };
      }
    }
  };
}

class OpenAIMock {
  constructor() {}

  chat = new ChatMock();
}

export default OpenAIMock;
