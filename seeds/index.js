const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

require('dotenv').config();

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB YelpCamp'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));



const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonummy eros, in tincidunt quam. Duis vel orci ac felis dictum tincidunt. Maecenas vel tortor sit amet massa fermentum consectetur. Nulla facilisi. Nulla facilisi. Sed nonummy eros, in tincidunt quam. Duis vel orci ac felis dictum tincidunt. Maecenas vel tortor sit amet massa fermentum consectetur. Nulla facilisi. Nulla facilisi. Sed`,
            price: Math.floor(Math.random() * 20) + 10,
            author: 'Admin User'
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})