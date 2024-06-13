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

//Server Listining...
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}....`);
})