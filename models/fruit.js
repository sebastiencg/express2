const mongoose = require('mongoose')

const FruitSchema = new mongoose.Schema({
    name:String,
    price: Number,
})

const fruit = mongoose.model('Fruit', FruitSchema)

module.exports = fruit
