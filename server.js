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
app.post('/', (req, res) => {
    console.log(req.body);
    res.json({messgae:"Body Recieved", data: req.body})
})

  
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});


//Server Listining...
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}....`);
})