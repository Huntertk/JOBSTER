import Job from '../models/jobModel.js';


import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'back-end' },
];

//Get All Jobs
export const getAllJobs = async (req, res) => {
    res.status(200).json({ jobs });
}

//Create Job
export const createJob = async (req, res) => {
    const job = await Job.create(req.body);
    res.status(201).json({msg:"Job Created", job});
}

// GET SINGLE JOB
export const getJob = async (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
    res.status(200).json({ job });
}

// EDIT JOB
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const {company, position} = req.body;
  
    if(!company || !position){
      return res.status(400).json({messgae:"Please Provide value"})
    }
  
    const job = jobs.find((job) => job.id === id);
    if (!job) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
    job.company = company
    job.position = position
    res.status(200).json({ msg: 'job modified', job });
}

// DELETE JOB
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
    const newJobs = jobs.filter((job) => job.id !== id);
    jobs = newJobs;
  
    res.status(200).json({ msg: 'job deleted' });
}