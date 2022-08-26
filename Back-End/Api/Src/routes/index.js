const {Router} = require('express');
const router = Router();
//Routes
router.get('/', (req, res) =>{
     {
      console.log(req, res);
      res.send(`Iñaki bobo`)  
    };
    res.json(data);
});
router.post('/', (req, res) => {
    console.log(req.body);
    res.send('recibido');
})
router.delete(`/`, (req, res) => {
    console.log(req.body);
    res.send(`Holaaa`)
})

module.exports = router;    