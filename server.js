import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import jobRouter from './routes/jobRouter.js';
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

import { body, validationResult } from 'express-validator';

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

app.post('/api/v1/test', [
    body('name').notEmpty().withMessage('Please Provide Name')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const errorMessages = errors.array().map((error) => error.msg)
      return res.status(400).json({messgae: errorMessages})
    }
    next()
    console.log(errors.isEmpty());
  },
  (req, res) => {
    const {name} = req.body;
    res.json({messgae:`Hello ${name}`})
})


app.use('/api/v1/jobs', jobRouter)

app.use('*', (req, res) => {
  res.status(404).json({msg:"Not Found"})
})

app.use(errorHandlerMiddleware)

//Server Listining... || Db Connection

const dbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Db Connected");
    app.listen(PORT, () => {
      console.log(`server running on PORT ${PORT}....`);
    })

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

dbConn();