const router = require('express').Router();

router.get('/', (req, res) => {
});

router.get('/add', (req, res) => {
    console.log("HIHIHIHIHI - in add route");
    res.render('addpage');
});

router.post('/', (req, res) => {});

module.exports=router;