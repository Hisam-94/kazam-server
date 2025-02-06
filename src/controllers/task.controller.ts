import { Request, Response } from 'express';
import Task from '../models/task.model';
import { taskSchema } from '../middlewares/validate';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) return res.status(400).send({ message: error.message });

    const task = await Task.create({ 
      ...req.body,
      user: req.user.id
    });
    
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!task) return res.status(404).send({ message: 'Task not found' });
    res.send(task);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });
    
    if (!task) return res.status(404).send({ message: 'Task not found' });
    res.send({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};