# OpenAI Proxy API

This project provides a proxy for OpenAI API requests, allowing you to manage API requests and responses in development and production modes.

## Installation

- Clone this project

```bash
git clone https://github.com/WebDev-WBSCodingSchool/openai-proxy.git
```

- Install dependencies:

```bash
npm install
```

- Create `.env` file at the root of the project with a variable `OPEN_AI_APIKEY` with the value of your Open AI secret key
- Run

```bash
npm run dev
```

## Supported APIs

Currently, thi proxy supports

- Chat Completions API: `POST` `/api/v1/chat/completions`

## Sample request

### Headers

- `provider` (required)
  - `open-ai`
- `mode` (required)
  - `development`: Request to Open AI is mocked
  - `production`: Request to Open AI is proxied

### Body

```javascript
const myHeaders = new Headers();
myHeaders.append('provider', 'open-ai');
myHeaders.append('mode', 'production');
myHeaders.append('Content-Type', 'application/json');

const raw = JSON.stringify({
  model: 'gpt-4o',
  messages: [
    {
      role: 'system',
      content: 'You are a helpful assistant.'
    },
    {
      role: 'user',
      content: 'Who won the world series in 2020?'
    },
    {
      role: 'assistant',
      content: 'The Los Angeles Dodgers won the World Series in 2020.'
    },
    {
      role: 'user',
      content: 'Where was it played?'
    }
  ]
});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch('http://localhost:5050/api/v1/chat/completions', requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.error(error));
```
