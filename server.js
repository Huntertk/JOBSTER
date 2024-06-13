import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import { nanoid } from 'nanoid';


let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end' },
    { id: nanoid(), company: 'google', position: 'back-end' },
];

//Express App Initialization
const app = express();

//PORT
const PORT = process.env.PORT || 4000


//Middlewares
app.use(express.json())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Routes
app.get('/', (req, res) => {
  res.json({messgae:"Hello"})
})

//Get All Jobs  
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

//Create Job
app.post('/api/v1/jobs', (req, res) => {
  const {company, position} = req.body;
  if(!company || !position){
    return res.status(400).json({messgae:"Please Provide value"})
  }
  const id = nanoid();
  const job = {id, company, position}
  jobs.push(job)
  res.status(201).json({messgae:"Job Created", data: job})
})


// GET SINGLE JOB

app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
});

// EDIT JOB
app.patch('/api/v1/jobs/:id', (req, res) => {
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
});

// DELETE JOB

app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: 'job deleted' });
});

//Server Listining...
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}....`);
})