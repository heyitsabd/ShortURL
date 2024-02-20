const shortid = require('shortid')
const URL = require('../models/url')
const express = require('express')

async function generateShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'})
    const shortID = shortid(8)
    await URL.create({
        shortID:shortID,
        redirectURL: body.url,
        visitHistory:[]
    })

    return res.json({id:shortID})
}

// async function redirectToPage(req,res){
//     const shortID = req.params.shortID;
//     const entry =  await URL.findOneAndUpdate({
//         shortID,
//     },
//     {
//         $push:{
//             visitHistory:{
//                 timestamp: Date.now(),
//             }
//         }
//     }
//     )
//     return res.json(entry.redirectURL)
// }


module.exports = {generateShortUrl}