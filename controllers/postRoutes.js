const router = require("express").Router()

const {posts, Reply} = require('../models')

router.get('/', async(req, res) => {
    res.render('postPage',{
        logged_in: req.session.logged_in,
        username: req.session.username,
        pageNum: req.session.pageNum
    })

})

router.get('/op/:id', async(req, res) => {
    try{
        req.session.pageNum = req.params
        res.status(200).json('success')
        
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.get('/getPosts', async(req, res) => {
    try{
        const mainPost = await posts.findOne({where: {PostId: req.session.pageNum.id}})

        res.status(200).json(mainPost)
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.get('/getReplys', async(req, res) => {
    try{
        const replys = await Reply.findAll({where: {OPid: req.session.pageNum.id}})
        res.status(200).json(replys)
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.get('/getCurrUser', async(req, res) => {
    res.status(200).json(req.session.username)
})

router.post('/newReply', async(req, res) => {
    try{
        const newReply = await Reply.create(req.body)
        res.status(200).json(newReply)
    }
    catch(err){
        res.status(400).json(err)
    }
    
})

router.get('/postInfo/:id', async(req, res) => {
    try{
        const thePost = await posts.findOne({where: {PostId: req.params.id}})
        res.status(200).json(thePost)
    }
    catch(err){
        res.status(400).json(err)
    }
    
})

router.post('/upDate/:id', async(req, res) => {
    try{
        const updated = await posts.update(
            req.body,
            {where: {PostId: req.params.id}}
            

        )
        res.status(200).json(updated)
        
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.delete('/deletePost/:id', async(req, res) => {
    try{
        const deletedReplies = await posts.destroy({
            where:{
                PostId: req.params.id
            }
        })
        res.status(200).json(deletedReplies)
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.delete('/deleteReplies/:id', async(req, res) => {
    try{
        const deletedReplies = await Reply.destroy({
            where:{
                OPid: req.params.id
            }
        })
        res.status(200).json(deletedReplies)
    }
    catch(err){
        res.status(400).json(err)
    }
})




module.exports = router