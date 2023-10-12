require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const fruits_routes = require('./routes/fruit.js')

require('dotenv').config()
const mongoURI = 'mongodb://localhost:27017/fruit';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB:', err);
    });
app.use(express.json())
app.use('/api/fruits', fruits_routes)
/*
*         app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
* */
