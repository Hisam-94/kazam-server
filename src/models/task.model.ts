import mongoose from 'mongoose';

export interface ITask extends mongoose.Document {
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  user: mongoose.Types.ObjectId;
}

const taskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  description: String,
  status: { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending' 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model<ITask>('Task', taskSchema);