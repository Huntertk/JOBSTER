import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import Job from '../models/jobModel.js';

export const getCurrentUser = async (req, res, next) => {
    try {
        
        const user = await User.findById(req.user.userId)
        user.password = undefined
        res.status(StatusCodes.OK).json({ msg: 'get current user',user });
    } catch (error) {
        next(error)
    }
  };
  
  export const getApplicationStats = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json({ msg: 'application stats' });
    } catch (error) {
        next(error)
    }
  };
  
  export const updateUser = async (req, res, next) => {
    try {
        const obj = {...req.body};
        delete obj.password;
        delete obj.role;
        await User.findByIdAndUpdate(req.user.userId, obj)
        res.status(StatusCodes.OK).json({ msg: 'update user' });
    } catch (error) {
        next(error)
    }
  };