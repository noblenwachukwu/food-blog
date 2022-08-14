const express = require('express')
const articleRouter = require('./routes/articles')
const Article = require('./models/article');
const app = express()
const PORT = 3000;
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()


mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser:true,useUnifiedTopology: true}, 
   () => {console.log('Connected to db!')})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false }))
app.use(methodOverride('_method'))



app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({
     createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))