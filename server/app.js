
require('dotenv').config();
const cookieParser = require("cookie-parser");


const routes = require('./routes/index');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://my-pov-client.vercel.app/'],
  credentials: true
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Welcome to MyPOV API!');
});


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
app.use('/mypov/api/v1', routes)
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() =>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

