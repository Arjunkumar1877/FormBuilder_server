import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import cors from 'cors';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  connectToDatabase() {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log('MongoDB connected');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
      });
  }

  initializeMiddleware() {
    const allowedOrigins = ['https://form-builder-olive-nine.vercel.app/'];

    this.app.use(cors({
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }));

    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  initializeRoutes() {
    this.app.use('/user', userRouter);
  }

  initializeErrorHandling() {
    // Handle 404
    this.app.use((req, res, next) => {
      next(createError(404));
    });

    // Error handler
    this.app.use((err, req, res, next) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // Respond with JSON instead of rendering a view
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {},
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

const appInstance = new App();
appInstance.listen();

export default appInstance.app;
