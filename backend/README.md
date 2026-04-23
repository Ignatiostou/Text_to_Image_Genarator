# Text-to-Image Generator Backend

A robust Node.js backend for a Text-to-Image generation application with user authentication, credit system, and payment integration.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Image Generation**: Integration with Clipdrop API for AI-powered text-to-image generation
- **Credit System**: User credit management for image generation
- **Payment Integration**: Razorpay payment gateway for purchasing credits
- **MongoDB Database**: Data persistence with MongoDB
- **RESTful API**: Clean and organized API endpoints

## Tech Stack

- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Razorpay** - Payment gateway
- **Clipdrop API** - AI image generation
- **Axios** - HTTP client
- **Form-Data** - Multipart form data handling

## Project Structure

```
backend/
├── config/
│   └── mongodb.js          # Database configuration
├── controllers/
│   ├── userController.js   # User-related logic
│   └── imageController.js  # Image generation logic
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   ├── userModel.js        # User schema
│   └── transactionModel.js # Transaction schema
├── routes/
│   ├── userRoutes.js       # User routes
│   └── imageRoutes.js      # Image routes
├── .env                    # Environment variables
├── package.json
└── server.js              # Main server file
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret_key_here
CLIPDROP_API=your_clipdrop_api_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=USD
```

## API Keys Setup

### Clipdrop API
1. Visit [Clipdrop APIs](https://clipdrop.co/apis)
2. Sign up for an account
3. Generate API key
4. Add to `.env` as `CLIPDROP_API`

### Razorpay
1. Visit [Razorpay](https://razorpay.com)
2. Create an account
3. Get your Key ID and Key Secret from Dashboard
4. Add to `.env` as `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`

### MongoDB
- **Local**: Use `mongodb://localhost:27017`
- **MongoDB Atlas**: 
  1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Get connection string
  3. Replace in `.env`

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:4000`

## API Endpoints

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| GET | `/credits` | Get user credits | Yes |
| POST | `/pay-razor` | Initiate payment | Yes |
| POST | `/verify-razor` | Verify payment | No |

### Image Routes (`/api/image`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/generate-image` | Generate image from text | Yes |

## Request/Response Examples

### Register User
```javascript
POST /api/user/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": { "name": "John Doe" }
}
```

### Login User
```javascript
POST /api/user/login
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": { "name": "John Doe" }
}
```

### Generate Image
```javascript
POST /api/image/generate-image
Headers: { "token": "jwt_token_here" }
{
  "prompt": "A beautiful sunset over mountains"
}

Response:
{
  "success": true,
  "message": "Image Generated",
  "creditBalance": 4,
  "resultImage": "data:image/png;base64,..."
}
```

### Get User Credits
```javascript
GET /api/user/credits
Headers: { "token": "jwt_token_here" }

Response:
{
  "success": true,
  "credits": 5,
  "user": { "name": "John Doe" }
}
```

## Credit Plans

| Plan | Credits | Price |
|------|---------|-------|
| Basic | 100 | $10 |
| Advanced | 500 | $50 |
| Business | 5000 | $250 |

New users start with 5 free credits.

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  creditBalance: Number (default: 5)
}
```

### Transaction Model
```javascript
{
  userId: String,
  plan: String,
  amount: Number,
  credits: Number,
  payment: Boolean (default: false),
  date: Number
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the request headers:

```javascript
headers: {
  'token': 'your_jwt_token_here'
}
```

## Error Handling

All endpoints return a consistent response format:

```javascript
{
  "success": true/false,
  "message": "Description of result or error",
  // ... additional data
}
```

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected routes with authentication middleware
- Input validation
- CORS enabled for cross-origin requests

## Development Notes

- Default credit balance for new users: 5 credits
- Each image generation costs 1 credit
- MongoDB database name: `imagify`
- Server automatically reconnects to MongoDB on connection loss

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or connection string is correct
- Check firewall settings for MongoDB Atlas
- Verify network access in MongoDB Atlas

### API Key Issues
- Verify all API keys are correctly added to `.env`
- Check API key quotas and limits
- Ensure API keys are active and not expired

### Payment Issues
- Test with Razorpay test mode first
- Verify webhook configuration if using webhooks
- Check currency settings match your Razorpay account

## License

ISC
