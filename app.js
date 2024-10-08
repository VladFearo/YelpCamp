const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');


const Campground = require('./models/campground.js');

const mongoUri = process.env.MONGO_URI;


mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB YelpCamp'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);


app.get('/', (req, res) => {
    res.render("home");
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${id}`);
});

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});


app.listen(3000, ()=>{
    console.log('Server started on port 3000');
})