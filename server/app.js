require('dotenv').config();
var cookieSession = require('cookie-session');


const routes = require('./routes/index');
const mongoose = require('mongoose');

const express = require('express');
const app = express();
app.use(express.json());

app.use(cookieSession({
  name: 'session',
  keys: ['token'],
  maxAge: 7 * 24 * 60 * 60 * 1000 // 24 hours
}))


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
app.use('/api/v1', routes)
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

