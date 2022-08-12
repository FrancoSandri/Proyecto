const {Router} = require('express');
const router = Router();
//Routes
router.get('/test', (req, res) =>{
    const data = {
        "name": "fuck",
        "website": "satolution.com"
    };
    res.json(data);
});
router.post('/', (req, res) => {
    console.log(req.body);
    res.send('recibido');
})

module.exports = router;    