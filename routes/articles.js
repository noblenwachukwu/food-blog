const express = require('express')
const article = require('./../models/article')
const  Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res)=>{
    res.render('articles/new', { article: new Article() })
})


router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article })
})

router.get('/:slug', async (req,res)=> {
    const article = await Article.findOne({ slug: req.params.slug })
    if(article == null) res.redirect('/')
res.render('articles/show', {article: article })
})


// Trying to get information from my form created in my show.ejs file here
router.post('/:slug/comment', async (req,res)=>{
    console.log('now im here in the slug comment')
        try{
            await Article.create({comments: req.body.commentary})
            res.redirect(`/articles/${article.slug}`)
        }catch(err){
            console.log(err)
        }
})

router.put('/:id', async (req,res, next)=>{
    req.article = await Article.findById(req.params.id)
    next()
   },saveArticleAndRedirect('edit'))


router.delete('/:id' , async(req,res)=> {
await Article.findByIdAndDelete(req.params.id)
res.redirect('/')
})

router.post('/', async (req,res, next)=>{
    console.log('im here')
 req.article = new Article()
 next()
},saveArticleAndRedirect('new'))


function saveArticleAndRedirect(path){
    return async (req,res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try{
          article =  await article.save()
          res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            console.log(e)
          res.render(`articles/${path}`, {article: article })
        }
    }
}

module.exports = router