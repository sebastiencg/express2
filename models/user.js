const mongoose = require("mongoose");

const User = mongoose.model("User",
    new mongoose.Schema({
        username:{
            type:String,
            require:true
        },

        email: {
            type:String,
            require: true,
            unique:true
        },
        password: {
            type:String,
            require:true
        },
    })
);

module.exports = User;