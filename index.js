require('dotenv').config()
const express = require('express')
const session = require("express-session"  );

const mongoose = require('mongoose')
const app = express()
const fruits_routes = require('./routes/fruit.js')
const session_routes = require('./routes/session')
app.use(session(
    {
        secret: 'secret-key-here',
        resave: false,
        saveUninitialized: false,
    })
);

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
app.use('/api',session_routes)

/*
*         app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
* */


/**
 * show all fruit
 * GET localhost:3000/api/fruits
 *
 * show fruit id
 * GET localhost:3000/api/fruits/<id>
 *
 * new fruit
 * POST localhost:3000/api/fruits/new
 *
 * update fruit
 * PATCH localhost:3000/api/fruits/<id>
 *
 * delete fruit
 * DELETE localhost:3000/api/fruits/<id>
 */
