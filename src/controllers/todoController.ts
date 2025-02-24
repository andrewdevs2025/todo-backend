// src/controllers/todoController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get all tasks
 * @param req 
 * @param res 
 * @returns task list
 */
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

/**
 * Get task by id
 * @param req 
 * @param res 
 * @returns task by id
 */
export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }, // Ensure the ID is treated as an integer
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
};

/**
 * Create a new task
 * @param req 
 * @param res 
 * @returns created new task
 */
export const createTask = async (req: Request, res: Response) => {
  const { title, color } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required and cannot be empty' });
  }
  if (color && typeof color !== 'string') {
    return res.status(400).json({ error: 'Color must be a string' });
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        color: color || null, // Set color to null if not provided
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

/**
 * Update a task
 * @param req 
 * @param res 
 * @returns updated task
 */
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;

  if (title && title.trim().length === 0) {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }
  if (color && typeof color !== 'string') {
    return res.status(400).json({ error: 'Color must be a string' });
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean value' });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, color, completed },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

/**
 * Delete a task
 * @param req 
 * @param res 
 * @returns deleted task
 */
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
