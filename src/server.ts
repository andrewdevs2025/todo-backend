// src/server.ts

import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import taskRoutes from './routes/todoRoutes'; // Import routes

const app = express();
const prisma = new PrismaClient();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);  // Define the tasks route

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
