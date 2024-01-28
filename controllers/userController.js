import { StatusCodes } from "http-status-codes";
import User from '../models/userModels.js'
import Job from '../models/jobModels.js'

export const getCurrentUser = async (req, res, next) => {
    const user = await User.findOne({_id: req.user.userId})
    const userWithoutPassword = user.toJSON()
    res.status(StatusCodes.OK).json({user: userWithoutPassword})
}

export const getApplicationStats = async (req, res, next) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({ users, jobs });
}

export const updateUser = async (req, res, next) => {
    const obj = {...req.body}
    delete obj.password
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body)
    res.status(StatusCodes.OK).json({msg:"updateUser"})
}
