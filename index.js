const express = require('express')
const app = express();
const PORT = 8001;
const urlRoute = require('./routes/url')
const {connectMongoDB} = require('./connect')
const URL = require('./models/url')

app.use(express.json())
 
app.get('/:shortID', async (req,res)=>{
    const shortID = req.params.shortID;
    const entry =  await URL.findOneAndUpdate(
        {
        shortID,
    },
    {
        $push:{
            visitHistory:{
                timestamp: Date.now(),
            },
        },
    }
    );
    res.redirect(entry.redirectURL)
})

app.use('/url',urlRoute)

connectMongoDB('mongodb://127.0.0.1:27017/shortURL')
.then(()=>console.log('Connected to MongoDB'))
app.listen(PORT,()=>{console.log(`Server sttarted at port : ${PORT}`)})
