const router = require('express').Router();
const passport = require('passport')

router.use('/expenses', require('./expenseRoute'));
router.use('/movies' , require('./movieRoute'));

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if(err) return next(err);
        
        res.redirect('/')
    })
})

module.exports = router
