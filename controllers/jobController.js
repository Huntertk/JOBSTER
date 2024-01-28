import Job from '../models/jobModels.js';
import {StatusCodes} from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/customError.js';

export const getAllJobs = async (req, res) => {
    console.log(req.user);
    const jobs = await Job.find({createdBy: req.user.userId}).sort({createdAt: -1})
    res.status(StatusCodes.OK).json({jobs})
}


export const createJob = async (req, res) => {
    const {company, position} = req.body

    if(!company || !position){
        throw new BadRequestError("Please Provide All Values")
    } 
        req.body.createdBy = req.user.userId
        const job = await Job.create(req.body)
        res.status(StatusCodes.CREATED).json({message: "Job created successfully"})
}

export const getJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findById(id)
    res.status(StatusCodes.OK).json({job})
}

export const updateJob = async (req, res) => {
    const { id } = req.params
    const {company, position} = req.body
    if(!company || !position){
        throw new BadRequestError("Please Provide All Values")
    }
    
    const job = await Job.findByIdAndUpdate(id, req.body,{
        new: true
    })

    res.status(StatusCodes.OK).json({job})
}


export const deleteJob = async (req, res) => {
    const { id } = req.params

    const job = await Job.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({message: `The Job from this ID: ${id} is Deleted`})
}