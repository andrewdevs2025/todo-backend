// src/routes/todoRoutes.ts

import express, { Request, Response } from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/todoController';

const router = express.Router();

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    await getTasks(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// Get a task by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    await getTask(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Create a new task
router.post('/', async (req: Request, res: Response) => {
  try {
    await createTask(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task (mark as completed or modify)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    await updateTask(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteTask(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
