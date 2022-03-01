import mongoose from 'mongoose';
import { IUser } from '~server/types';
const { Schema } = mongoose;

const schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

const User = mongoose.model<IUser>('User', schema);

export { User };
