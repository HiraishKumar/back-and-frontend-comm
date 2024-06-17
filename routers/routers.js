const {getSearchitem} = require('../controllers/controllers')
const express = require('express')
const router = express.Router()

router.route('/search/api/v1/').get(getSearchitem)

module.exports = router