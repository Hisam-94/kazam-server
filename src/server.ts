const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const { ApiError } = require('./utils/apiError');
const logger = require('./utils/logger');
import { NextFunction, Request, Response } from 'express';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 404 Handler
app.use((req: Request, res:Response, next: NextFunction) => {
  res.status(404).json({ message: 'Not found' });
});

// Error Handler
app.use((err: typeof ApiError, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  
  logger.error(`Unexpected error: ${err.message}`);
  res.status(500).json({ message: 'Internal server error' });
});

app.get("/", (_req:Request, res:Response) => res.send("Server is up and running!"));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});

