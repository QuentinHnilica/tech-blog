const router = require('express').Router();

const {posts, Users} = require('../models')

router.get('/', async(req, res) =>{
    console.log(req.session)
    res.render('home',{
        logged_in: req.session.logged_in
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
    res.render('signUp',{
        logged_in: req.session.logged_in
    })
});

router.post('/subSignUp', async(req, res) => {
    try{

        const userData = await Users.create(req.body);
    
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

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

module.exports = router;
