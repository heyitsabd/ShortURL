const express = require('express')
const app = express();
const PORT = 8001;
const urlRoute = require('./routes/url')
const {connectMongoDB} = require('./connect')
const URL = require('./models/url')
const userRoute = require('./routes/user')
const path = require('path')
const staticRoute = require('./routes/staticRoute')
const {restrictToLoggedinUserOnly,checkAuth} = require('./middlewares/auth')
const cookieParser = require('cookie-parser')


connectMongoDB('mongodb://127.0.0.1:27017/shortURL')
.then(()=>console.log('Connected to MongoDB'))

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false})) 


app.use('/url', restrictToLoggedinUserOnly, urlRoute)
app.use('/user',userRoute)
app.use('/',checkAuth,staticRoute)



app.get('/url/:shortID', async (req,res)=>{
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

app.listen(PORT,()=>{console.log(`Server sttarted at port : ${PORT}`)})
