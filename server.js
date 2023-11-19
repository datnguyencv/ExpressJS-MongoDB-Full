require('dotenv').config();
const { createSampleData } = require('./models/productModel');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const errorMiddleware = require("./middleware/errorMiddleware");
const ejs = require('ejs');
const path = require('path');
var cors = require('cors')

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND

app.use(express.json());
var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Middleware
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.set("strictQuery", false)
mongoose.
connect(MONGO_URL)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port ${PORT}`)
    });
}).catch((error) => {
    console.log(error)
})