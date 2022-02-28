import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model('Employee', schema);

export { Employee };
