import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDb from './connectDb/mongodb.js';
import { startCleanUp } from './cronJobs/startCleanUp.js';

// Routes
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import uploadFileRouter from './routes/uploadFileRouter.js';
import otpRouter from './routes/otpRoutes.js';
import allApis from './routes/allApis.js';

dotenv.config();

connectDb();

const app = express();

startCleanUp();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//API routes
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', uploadFileRouter);
app.use('/api/otp', otpRouter);
app.use('/', allApis);

// Default route
app.get('/', (req, res) => {
  
  res.status(200).json({ message: 'E-commerce API is running' });
});

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Server
const port = process.env.PORT;
app.listen(port, () => console.log (`Server listening on port ${port}`));
