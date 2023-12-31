import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ShortUrls from './models/ShortUrls.js';


const app = express()
app.use(express.json());

dotenv.config();

async function connectDB() {
    const connection = await mongoose.connect(process.env.MONGO_DB_URL)
    if (connection) {
        console.log('connected to mongoDB');
    }
}
connectDB();

app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', async(req,res) => {
   const shortUrls = await ShortUrls.find()
 res.render('index', {shortUrls: shortUrls})   
})

app.post('/shortUrls',async (req,res)=>{
 await ShortUrls.create({ full: req.body.fullUrl})

 res.redirect('/')
})

app.get('/:shortUrl',async (req,res)=>{

  const shortUrl = await ShortUrls.findOne({ short: req.params.shortUrl })
  if(shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()
  
  res.redirect(shortUrl.full)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`);
})