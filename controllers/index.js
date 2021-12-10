const router = require('express').Router();
const postRoutes = require('./postRoutes')

const {posts, Users} = require('../models')

router.use('/post', postRoutes)

router.get('/', async(req, res) =>{
    res.render('home',{
        logged_in: req.session.logged_in,
        username: req.session.username
    })
})

router.get('/login', async(req, res) => {
    res.render('login');
});


router.post('/login/atmpt', async(req, res) =>{

    try{
        const userData = await Users.findOne({
            where: {email: req.body.email}
        })
    
        if (!userData){
            res.status(400).json({message: 'Invalid login, please try again'})
            return
        }
    
        const checkPass = await userData.checkPassword(req.body.pass)
    
        if (!checkPass){
            res.status(400).json({message: 'Invalid login, please try again'})
            return
        }
    
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.username = userData.username
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        })
    }
    catch(err){
        res.status(404).json(err)
    }
    
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/signup', async(req, res) => {
    res.render('signup',{
        logged_in: req.session.logged_in,
        username: req.session.username,
    })
});

router.post('/subSignUp', async(req, res) => {
    try{

        const userData = await Users.create(req.body);
    
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.username = userData.username

        res.status(200).json(userData);
    })
    }
    catch(err) {
        res.status(400).json(err);
    }
})

router.get('/homeposts', async(req,res) =>{
    try{
        const postData = await posts.findAll()
        res.status(200).json(postData)
    }
    catch(err){
        res.status(err)
    }
})

router.get('/dashboard', async(req, res) => {
    res.render('dashboard',{
        logged_in: req.session.logged_in,
        username: req.session.username
    })
})

router.get('/myPosts', async(req, res) => {
    try{
        console.log(req.session.username)
        const myPosts = await posts.findAll({
            where: {username: req.session.username}
        })
        res.status(200).json(myPosts)
    }
    catch(err){
        res.status(err)
    }
})

router.post('/newPost', async(req, res) =>{
    try{
        const newPost = await posts.create(req.body)
        res.status(200).json(newPost)
    }
    catch(err){
        res.status(err)
    }
})



module.exports = router;
