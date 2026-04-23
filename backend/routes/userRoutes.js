 import express from 'express';
import { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay, updateProfile, changePassword, getUserImages, getUserTransactions } from '../controllers/userController.js';
import userAuth from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', userAuth, userCredits);
userRouter.post('/pay-razor', userAuth, paymentRazorpay);
userRouter.post('/verify-razor', verifyRazorpay);
userRouter.post('/update-profile', userAuth, updateProfile);
userRouter.post('/change-password', userAuth, changePassword);
userRouter.get('/images', userAuth, getUserImages);
userRouter.get('/transactions', userAuth, getUserTransactions);

export default userRouter;
