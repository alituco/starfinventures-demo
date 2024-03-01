const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const PropertyListing = require('./models/PropertyListing');

const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {  
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
dotenv.config();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());



mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to db successfully")
  }).catch((err) => {
    console.log("Connection to db failed. Error: ", err)
  });
  
  app.get('/', (req, res) => {
      res.send('Hello, Express!')
  });




app.post('/api/listProperty', async (req, res) => {
    try {
      const newListing = new PropertyListing(req.body);
      const savedListing = await newListing.save();
      res.status(201).json(savedListing);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


app.get('/api/getListingsWithEmail', async (req, res) => {
    const email = req.query.email;
    try {
        const listingsWithEmail = await PropertyListing.find({email: email});
        res.json(listingsWithEmail);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });