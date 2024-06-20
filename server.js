import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

//Express App Initialization
const app = express();

//PORT
const PORT = process.env.PORT || 4000


//Middlewares
app.use(express.json())
app.use(cookieParser())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Routes
app.get('/', (req, res) => {
  res.json({messgae:"Hello"})
})

app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', authenticateUser, userRouter);

//Global Not Found Page 
app.use('*', (req, res) => {
  res.status(404).json({msg:"Not Found"})
})


//Global Error Catcher
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