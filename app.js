import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js'
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

  // Method to connect to MongoDB
  connectToDatabase() {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log('MongoDB connected');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
      });
  }

  // Method to initialize middleware
  initializeMiddleware() {
    this.app.use(cors())
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  // Method to initialize routes
  initializeRoutes() {
    this.app.use('/user', userRouter);
  }

  // Method to initialize error handling
  initializeErrorHandling() {
    this.app.use((req, res, next) => {
      next(createError(404));
    });

    this.app.use((err, req, res, next) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }

  // Method to start the server
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

// Create an instance of the App class and listen on the specified port
const appInstance = new App();
appInstance.listen();

export default appInstance.app; // Exporting the app instance for use in other modules
