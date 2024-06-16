import { type } from 'express/lib/response';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    lastName: {
      type: String,
      default: 'lastName',
    },
    location: {
      type: String,
      default: 'my city',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
});
  
const User = mongoose.model('User', UserSchema);
export default User;