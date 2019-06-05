const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const router = require('./routes');
const {cloudinaryConfig} = require('./utils/cloudinaryConfig');


const app = express();

const PORT = process.env.PORT || 8002;


mongoose.connect('mongodb+srv://LuisPatricioG:GZojHBf3vecQwRmc@cluster0-nimtw.mongodb.net/blog',{ useNewUrlParser: true });


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('*',cloudinaryConfig);

app.use('/api/v1',router);

app.listen(PORT,() => {
  console.log(`Works in port ${PORT}`)
});

module.exports = app;