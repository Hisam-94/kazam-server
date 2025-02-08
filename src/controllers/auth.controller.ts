import { Request, Response } from 'express';
import userModel from '../models/user.model';
const { registerSchema, loginSchema } = require('../middlewares/validate');
const jwt = require('jsonwebtoken');

export const register = async (req: Request, res: Response) => {
  console.log("req",req)
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { name, email, password } = req.body;
    console.log("name, email, password",name, email, password)
    
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await userModel.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    });

    res.status(201).json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    console.log("error",error)
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    });

    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};