const {getRoot,getSearch,getViewcart} = require('../controllers/controllers')
const express = require('express')
const router = express.Router()

router.route('/').get(getRoot)
router.route('/search').get(getSearch)
router.route('/viewcart').get(getViewcart)


module.exports = router