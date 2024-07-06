const {getSearchitem} = require('../controllers/controllers')
const {GetAllProd} = require('../controllers/test')
const express = require('express')
const router = express.Router()

// router.route('/search/api/v1/').get(getSearchitem)
router.route('/search/api/v1/').get(GetAllProd)


module.exports = router