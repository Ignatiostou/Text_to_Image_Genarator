import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

// App Config
const PORT = process.env.PORT || 4000;
const app = express();

// Middlewares (must be before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to Database
await connectDB();

// API Routes
app.get('/', (req, res) => res.send('API Working'));
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));