const express = require('express')
const router = express.Router()
const {generateShortUrl} = require('../controllers/url')
const URL = require('../models/url')

router.post('/',generateShortUrl)

// router.get('/:shortID',redirectToPage)

module.exports= router;
