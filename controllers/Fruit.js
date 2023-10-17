const Fruit = require('../models/fruit');
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.send('you need be connected')
    }
};

const getFruits = (req, res) => {
    Fruit.find({})
        .then((result) => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }));
};

const getFruit = (req, res) => {
    Fruit.findOne({ _id: req.params.fruitID })
        .then((result) => res.status(200).json({ result }))
        .catch(() => res.status(404).json({ msg: 'Fruit not found' }));
};

const createFruit = (req, res) => {
    Fruit.create(req.body)
        .then((result) => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }));
};

const updateFruit = (req, res) => {
    Fruit.findOneAndUpdate(
        { _id: req.params.fruitID },
        req.body,
        { new: true, runValidators: true }
    )
        .then((result) => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({ msg: 'Fruit not found' }));
};

const deleteFruit = (req, res) => {
    Fruit.findOneAndDelete({ _id: req.params.fruitID })
        .then((result) => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({ msg: 'Fruit not found' }));
};

module.exports = {
    getFruits: [isAuth, getFruits], // Protégez la route getFruits en utilisant isAuth comme middleware
    getFruit: [isAuth, getFruit], // Protégez la route getFruit en utilisant isAuth comme middleware
    createFruit: [isAuth, createFruit], // Protégez la route createFruit en utilisant isAuth comme middleware
    updateFruit: [isAuth, updateFruit], // Protégez la route updateFruit en utilisant isAuth comme middleware
    deleteFruit: [isAuth, deleteFruit], // Protégez la route deleteFruit en utilisant isAuth comme middleware
};
