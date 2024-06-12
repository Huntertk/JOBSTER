import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';

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

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}....`);
})