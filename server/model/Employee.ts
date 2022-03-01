import mongoose from 'mongoose';
import { IEmployee } from './../types/index';
const { Schema } = mongoose;

const schema = new Schema<IEmployee>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model<IEmployee>('Employee', schema);

export { Employee };
