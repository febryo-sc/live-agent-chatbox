This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). For technical information visit nextjs website.

## Getting Started

Prepare environment first, for this project must installed `nodejs` and `npm` in your mechine

Create a `.env` file in the root project directory and fill with following data:

```env
# FIREBASE CREDENTIALS, SAME AS BACKEND USED
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# BACKEND API CREDENTIAL
API_BASE_URL=https://n8n.navasoft.id
API_AUTH_USERNAME=febryo
API_AUTH_PASSWORD=dine123
API_MERCHANT_NAME=
API_TOKEN=

# RANDOM SCRET FOR APP AUTH
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:300
NEXT_PUBLIC_APP_DOMAIN=http://localhost:300
```

Mmake sure the following endpoint services are running on the backend service:

```js
- {{API_BASE_URL}}/chat_history
- {{API_BASE_URL}}/chat_send
- {{API_BASE_URL}}/activate_session
- {{API_BASE_URL}}/deactivate_session
- {{API_BASE_URL}}/list_member
- {{API_BASE_URL}}/register_number
```

Install package dependencies (just for run first time)

```bash
npm install
```

Run app

```bash
npm run dev
```

## Using the app

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Login credential same with `AUTH_API_` environment

To embed the application into another service you can use this url format:

```js
http://localhost:3000/login?token={{API_TOKEN}}&callbackUrl=/box/chats?phone={{customer_phone_number}}
```

example: http://localhost:3000/login?token=xxx-xxx-xxx&callbackUrl=/box/chats?phone=6285222338644

NOTE: `localhost` only work in your local device

## Production deployment

This app include with Dockerfile.

- clone the project into your server
- make sure your server installed docker
- then run following command:

```bash
docker build -t sunbox-chat-app .
docker run --env-file .env -p 3000:3000 sunbox-chat-app
```

NOTE: change env `NEXT_PUBLIC_APP_DOMAIN` value with your domain

## Learn more

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Tailwindcss](https://tailwindcss.com/docs/installation/using-postcss) - learn how to use Tailwindcss styling.
- [Headlessui](https://headlessui.com) - learn how to use some UI component from Headlesui.
