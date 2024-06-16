const {getRoot,getSearch,getViewcart,getSearchitem} = require('../controllers/controllers')
const express = require('express')
const router = express.Router()

router.route('/').get(getRoot)

router.route('/search/:name').get(getSearch)
router.route('/search/item').get(getSearchitem)
router.route('/viewcart').get(getViewcart)


module.exports = router