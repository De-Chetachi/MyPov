require('dotenv').config();
const cookieSession = require('cookie-session');
const cookieParser = require("cookie-parser");


const routes = require('./routes/index');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(cors());

// app.use(cookieSession({
//   name: 'session',
//   keys: ['token'],
//   maxAge: 7 * 24 * 60 * 60 * 1000 // 24 hours
// }))


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
app.use('/mypov/api/v1', routes)
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() =>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

