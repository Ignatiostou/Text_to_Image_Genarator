# Frontend-Backend Integration Guide

## ✅ Integration Complete!

The frontend is now fully integrated with the backend API.

## Changes Made

### 1. **AppContext.jsx** - Global State Management
- Added `token`, `credit`, `backendUrl` state
- Added `loadCreditsData()` - Fetches user credits from backend
- Added `generateImage(prompt)` - Calls backend to generate images
- Added `logout()` - Clears token and user data
- Auto-loads user credits when token exists

### 2. **Login.jsx** - Authentication
- Connected to `/api/user/login` and `/api/user/register` endpoints
- Stores JWT token in localStorage
- Handles form submission with axios
- Shows toast notifications for success/error

### 3. **Result.jsx** - Image Generation
- Integrated with `generateImage()` from context
- Sends prompt to backend API
- Handles loading states
- Displays generated images

### 4. **Navbar.jsx** - User Interface
- Shows real user name from context
- Displays actual credit balance
- Logout functionality implemented

### 5. **main.jsx** - Toast Notifications
- Added ToastContainer for global notifications

### 6. **Environment Variables**
- Created `frontend/.env` with `VITE_BACKEND_URL=http://localhost:4000`

### 7. **Dependencies Installed**
- `axios` - HTTP client for API requests
- `react-toastify` - Toast notifications

## How to Run

### Start Backend (Terminal 1):
```bash
cd backend
npm run dev
```
Server runs on: `http://localhost:4000`

### Start Frontend (Terminal 2):
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173` (or similar)

## Features Now Working

### ✅ User Authentication
- Register new account
- Login with email/password
- JWT token stored in localStorage
- Auto-login on page refresh

### ✅ User Credits
- View credit balance in navbar
- Credits automatically loaded on login
- Updates after image generation

### ✅ Image Generation
- Generate images from text prompts
- Consumes 1 credit per generation
- Shows loading state
- Displays generated image

### ✅ User Management
- Logout functionality
- User name displayed
- Profile dropdown menu

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/user/register` | POST | Create new account |
| `/api/user/login` | POST | Login user |
| `/api/user/credits` | GET | Get user credits |
| `/api/image/generate-image` | POST | Generate image |

## Token Flow

1. User logs in/registers
2. Backend returns JWT token
3. Frontend stores token in:
   - `localStorage` (persistent)
   - Context state (for current session)
4. All protected API requests include token in headers:
   ```javascript
   headers: { token: 'jwt_token_here' }
   ```

## Testing the Integration

1. **Start both servers** (backend and frontend)
2. **Open frontend** in browser
3. **Click "Login"** button
4. **Create account** or login
5. **Check navbar** - should show your name and credits
6. **Go to Result page** - enter a prompt and generate image
7. **Check credits** - should decrease by 1

## Important Notes

- Backend must be running on port 4000
- Frontend expects backend at `http://localhost:4000`
- Token is stored in localStorage for persistence
- CORS is enabled on backend for frontend access
- All API responses use consistent format: `{ success, message, ...data }`

## Next Steps (Optional Enhancements)

- [ ] Implement payment integration (Razorpay)
- [ ] Add image history
- [ ] Add profile page
- [ ] Add password reset functionality
- [ ] Add loading spinners
- [ ] Add error boundary
- [ ] Add protected routes (redirect if not logged in)

## Troubleshooting

### "Network Error" or "Failed to fetch"
- Make sure backend server is running
- Check backend URL in `.env` file
- Verify CORS is enabled on backend

### Token Not Working
- Clear localStorage: `localStorage.clear()`
- Re-login to get new token
- Check token format in browser DevTools

### Credits Not Updating
- Check browser console for errors
- Verify token is in request headers
- Check backend logs for API responses

## Success! 🎉

Your Text-to-Image Generator is now fully integrated and ready to use!
