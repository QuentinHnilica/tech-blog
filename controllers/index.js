const router = require('express').Router();



router.get('/login', async(req, res) => {
    res.render('login');
});

router.get('/signup', async(req, res) => {
    res.render('signUp');
});

module.exports = router;
