import express from 'express';
import { auth } from '../middlewares/auth';
import { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask 
} from '../controllers/task.controller';

const router = express.Router();

router.use(auth);

router.route('/')
  .post(createTask)
  .get(getTasks);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

export default router;