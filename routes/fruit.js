const express = require('express')
const router = express.Router()

const  {
    getFruits,
    getFruit,
    createFruit,
    updateFruit,
    deleteFruit
} = require('../controllers/Fruit')

router.get('/', getFruits)

router.get('/:fruitID', getFruit)

router.post('/new/', createFruit)

router.put('/:fruitID', updateFruit)

router.delete('/:fruitID', deleteFruit)

module.exports = router