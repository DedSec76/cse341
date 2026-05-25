const router = require('express').Router();

router.use('/expenses', require('./expenseRoute'));
router.use('/movies' , require('./movieRoute'));

router.use('/', (req, res) => {
    res.send("Hello world")
})

module.exports = router
