const shortid = require('shortid')
const URL = require('../models/url')

async function generateShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'})
    
    const shortID = shortid(8)

    await URL.create({
        shortID:shortID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy: req.user._id,
    })

    return res.render('home',{
        id:shortID,
    })
    return res.json({id:shortID})
}

module.exports = {generateShortUrl}