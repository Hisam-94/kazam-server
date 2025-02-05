import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const taskSchema = Joi.object({
  title: Joi.string().required().min(3),
  description: Joi.string().allow(''),
  status: Joi.string().valid('pending', 'completed')
});