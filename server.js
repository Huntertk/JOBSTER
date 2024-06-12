import express from 'express';


//Express App Initialization
const app = express();


//Middlewares
app.use(express.json())

//Routes
app.post('/', (req, res) => {
    console.log(req.body);
    res.json({messgae:"Body Recieved", data: req.body})
})

app.listen(3000, () => {
    console.log("Server is running...");
})