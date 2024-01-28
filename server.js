import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config()

//<Routes>
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'


//<Middlewares>
import errorHandlerMiddleware from './middleware/errorHandler.js';
import {authenticateUser} from './middleware/authMiddleware.js';




const PORT = process.env.PORT || 3000

const app = express()
app.use(cookieParser());
app.use(express.json()) 

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


app.use("/api/v1/jobs", authenticateUser, jobRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", authenticateUser, userRouter)


app.get("*", (req, res) => {
    res.status(404).json({message: "No Routes Found"})
})

app.use(errorHandlerMiddleware)

const dbConn = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Application is connected to DB");
        app.listen(PORT, () => {
            console.log("Server is Started AT PORT ", PORT);
        })
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}


dbConn()