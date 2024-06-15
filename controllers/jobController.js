import Job from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes';

//Get All Jobs
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.status(StatusCodes.OK).json({ jobs });
  } catch (error) {
    next(error)
  }
}

//Create Job
export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({msg:"Job Created", job});
    
    } catch (error) {
      next(error)
  }
}

// GET SINGLE JOB
export const getJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id)
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: `no job with id ${id}` });
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    next(error)
  }
}

// EDIT JOB
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(id,req.body,{new:true})
  
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: `no job with id ${id}` });
    }

    res.status(StatusCodes.OK).json({ msg: 'job modified', job });
}

// DELETE JOB
export const deleteJob = async (req, res, next) => {
  try {
      const { id } = req.params;
      const job = await Job.findByIdAndDelete(id)
      if (!job) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `no job with id ${id}` });
      }
      res.status(StatusCodes.OK).json({ msg: 'job deleted' });
      
    } catch (error) {
      next(error)
    }
}