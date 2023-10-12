const Fruit = require('../models/fruit');

const getFruits = (req, res) => {
    Fruit.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({ msg: error }));
};

const getFruit = (req, res) => {
    Fruit.findOne({ _id: req.params.fruitID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({ msg: 'Fruit not found' }));
};

const createFruit = (req, res) => {
    Fruit.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({ msg: error }));
};

const updateFruit = (req, res) => {
    Fruit.findOneAndUpdate({ _id: req.params.fruitID }, req.body, { new: true, runValidators: true }) // Remplacement de "Product" par "Fruit"
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(404).json({ msg: 'Fruit not found' }));
};

const deleteFruit = (req, res) => {
    Fruit.findOneAndDelete({ _id: req.params.fruitID })
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(404).json({ msg: 'Fruit not found' }));
};

module.exports = {
    getFruits,
    getFruit,
    createFruit,
    updateFruit,
    deleteFruit,
};
