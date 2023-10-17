const userModel = require('../models/user');
const express = require('express');
const session = require("express-session"  );
const MongoDbStore = require('connect-mongodb-session')(session);
const app = express();
const bcryprjs = require('bcryptjs');


const store = new MongoDbStore({
    uri:'mongodb://localhost:27017/fruit',
    collection: 'mySessions',
})

app.use(session(
    {
        secret: 'secret-key-here',
        saveUninitialized: false,
        cookie: { maxAge: 3600 },
        resave: false,
        store:store,

    })
);

const register = async (req, res) => {
    const { username, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        return res.send('User already exists.');
    }
    const passwordHash = await bcryprjs.hash(password, 12);
    user = new userModel({
        username,
        email,
        password: passwordHash,
    });
    await user.save();
    res.send('User created.');
};

const login = async (req, res) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
        return res.send('Invalid email.');
    }
    const isMatch = await bcryprjs.compare(password, user.password);
    if (!isMatch) {
        return res.send('Invalid password.');
    } else {
        req.session.isAuth =true
        return res.send('Login successful.');
    }
};
const  logout= (req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err
        res.send('deco')
    })
};
module.exports = {
    register,
    login,
    logout,
};
