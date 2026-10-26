# Imagify — Text-to-Image Generator

Turn a text prompt into an AI-generated image with Imagify, a full-stack web application built with React, Express, and MongoDB. Create an account, describe your idea, and download the result powered by the Clipdrop API.

## App preview

![Imagify home page with its text-to-image introduction and how-it-works section](docs/screenshots/imagify-home.png)

*Imagify's home page in light mode, featuring the prompt-to-image introduction and generation workflow.*

## Features

- **Text-to-image generation:** submit a prompt and generate an image through Clipdrop.
- **Image downloads:** download the generated image or start another generation.
- **User accounts:** register and sign in with JWT authentication and bcrypt password hashing.
- **Generation credits:** new accounts receive 5 credits; each successful generation uses 1 credit.
- **Account management:** update your name and change your password.
- **Light and dark themes:** switch appearance from the interface.
- **Credit plans:** browse pricing, with Razorpay order creation and payment verification endpoints in the backend.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite 7, Tailwind CSS 3, Motion, React Router, Axios, React Toastify |
| Backend | Node.js, Express 5, Mongoose, JWT, bcrypt |
| Database | MongoDB |
| Integrations | Clipdrop text-to-image API, Razorpay |

## Run locally

### Prerequisites

- Node.js 20.19+ or 22.12+ and npm (compatible with Vite 7).
- A running MongoDB instance or MongoDB Atlas connection.
- A Clipdrop API key for image generation.
- Razorpay test credentials for the backend's payment integration.

### 1. Clone and install

```bash
git clone https://github.com/Ignatiostou/Text_to_Image_Genarator.git
cd Text_to_Image_Genarator
```

Install dependencies in each application:

```bash
cd backend
npm install
cd ../frontend
npm install
```

**Dependency note:** the frontend source imports `framer-motion`, while its manifest currently declares `motion`. If a fresh installation reports that `framer-motion` cannot be resolved, run `npm install framer-motion` inside `frontend`.

### 2. Configure the backend

Create `backend/.env`:

```dotenv
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017
JWT_SECRET=replace_with_a_long_random_secret
CLIPDROP_API=replace_with_your_clipdrop_api_key
RAZORPAY_KEY_ID=replace_with_your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=replace_with_your_razorpay_test_key_secret
CURRENCY=USD
```

The database configuration appends `/imagify` to `MONGODB_URI`; supply a base connection URI without a database suffix. Set `CURRENCY` to a currency supported by your Razorpay account. Use your own credentials; `.env` files are ignored by Git.

### 3. Configure the frontend

Create `frontend/.env`:

```dotenv
VITE_BACKEND_URL=http://localhost:4000
```

The frontend defaults to this URL when the variable is omitted. Restart Vite after changing frontend environment variables.

### 4. Start both applications

In one terminal:

```bash
cd backend
npm run dev
```

In another terminal, from the repository root:

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). The backend runs at `http://localhost:4000`; visiting its root returns `API Working` once the database connection succeeds.

The home page can be previewed with only the frontend running. Authentication, account data, and image generation require the configured backend.

## Usage

1. Open the app and create an account or sign in.
2. Select **Generate Images** to open the generator.
3. Enter a descriptive prompt, such as `A watercolor painting of a seaside village at sunset`.
4. Select **Generate** and wait for the image to appear.
5. Select **Download** to save it, or **Generate Another** to enter a new prompt.

## Project structure

```text
Text_to_Image_Genarator/
├── frontend/
│   ├── src/
│   │   ├── assets/        # Icons and sample artwork
│   │   ├── components/    # Navigation, login, and home-page sections
│   │   ├── context/       # Authentication, credits, API calls, and theme
│   │   ├── pages/         # Home, generator, pricing, profile, and settings
│   │   └── App.jsx        # Application routes
│   └── package.json
├── backend/
│   ├── config/            # MongoDB connection
│   ├── controllers/       # User, payment, and image-generation logic
│   ├── middleware/        # JWT authentication
│   ├── models/            # Users and transactions
│   ├── routes/            # Express API routes
│   └── server.js          # API entry point
└── docs/screenshots/      # README images
```

## Available commands

Run these from the relevant application folder:

| Folder | Command | Purpose |
| --- | --- | --- |
| `frontend` | `npm run dev` | Start Vite development server |
| `frontend` | `npm run build` | Create production assets in `dist` |
| `frontend` | `npm run preview` | Preview the frontend production build |
| `frontend` | `npm run lint` | Run ESLint |
| `backend` | `npm run dev` | Start API with Nodemon |
| `backend` | `npm start` | Start API with Node.js |

## Current limitations

- The pricing page displays plans, but its purchase buttons are not yet connected to Razorpay checkout.
- Email notification and auto-save switches currently update interface state only; account deletion is not implemented.
- Image generation depends on a valid Clipdrop key, available API quota, and a positive credit balance.

For backend endpoint details, see [the backend README](backend/README.md). The source is the authority for current behavior.
