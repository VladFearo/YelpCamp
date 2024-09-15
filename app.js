const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;


mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB YelpCamp'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render("home");
});

app.listen(3000, ()=>{
    console.log('Server started on port 3000');
})