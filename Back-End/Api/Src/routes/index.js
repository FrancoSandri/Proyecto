require("dotenv").config()
const cors = require("cors")
const {Router} = require('express');
const router = Router();
const mysql = require('mysql')
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const ee = require('@google/earthengine');
var privateKey = require('../privateKey.json');

//const registroIa= require("../../../../Front-End/map")
 const db = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "",
     database: "Satolution"
 }) 
 const syncSql = require('sync-sql')
 var config = {
     host : "localhost",
     user: "root",
     password : "",
     database : "Satolution"
 }
 db.connect((err) => {
     if (err) throw (err)
 })
router.use(cookieParser())
 router.use(cors({
    origin: "http://localhost:5500",
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
}));
 const authorization = (req, res, next) => {
    console.log(req.cookies)
     const token = req.cookies.access_token;
     const refreshToken = req.cookies.refresh_token;
     if (!token && !refreshToken) {
       return res.sendStatus(403);
     }
     try {
       const data = jwt.verify(token, process.env.SECRET_KEY);
       req.email = data.email;
       req.password = data.password;
       console.log(data)
       req.id = data.id
       const dataRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
       req.email = dataRefresh.email;
       req.password = dataRefresh.password;
       console.log(dataRefresh)
       req.id = dataRefresh.id
       return next();
     } catch {
       return res.sendStatus(403);
     }
   };
   router.get("/check-user", authorization, (req,res)=> {
    res.json({email: req.email, id: req.id})
   })
 //Routes
 router.get('/get-all', authorization, (req, res) => {
     let sql = 'select * from usuarios'
     db.query(sql, (err, result) => {
         if (err) throw err
         res.send(result)
     })
 })
 router.get('/get-campos', authorization, (req, res) => {
    let sql = 'SELECT * from registrosplantas WHERE id = "' + req.id + '"'
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})
 router.get('/:id', (req, res) => {
     const { id } = req.params
     let sql = `select * from usuarios where id = ${id}`
     db.query(sql, (err, result) => {
         if (err) throw err
         if (result.length != 0) res.send(result)
         else res.status(404).send('User not found')
     })
 })
 router.post('/name-cheacked', (req, res) => {
     let sql = `SELECT * FROM usuario WHERE email = '?'`
     db.query(sql, req.body, (err, result) => {
         if (err) throw err
         if (result.affectedRows != 0) res.send('User cheacked successfully')
         else res.status(404).send('User not cheaked')
     })
 })
 router.put('/password-reset',  async (req, res) => {
     const {password, email} = req.body
     let sql = `UPDATE usuarios SET password = ${password} WHERE email = "${email}"`
             db.query(sql, (err, result) => {
                 if(err) res.status(500).send({err})
                 
                 res.status(200).send({message:"User updated successfully", result})
             })
 })
 router.delete('/:id', (req, res) => {
     const { id } = req.params
     let sql = `DELETE from usuarios WHERE id = ${id}`
     db.query(sql, (err, result) => {
         if (err) throw err
         if (result.affectedRows != 0) res.send('The user has been deleted successfully')
         else res.status(404).send('User not found')
     })
 })
 router.post('/register', async (req, res) => {
     const {email, password } = req.body
     const token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.SECRET_KEY, { expiresIn: "5m" });
     const refreshToken = jwt.sign(
        {
        expiresIn: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
        email: req.body.email, password: req.body.password, id: result[0].Id
        },
        process.env.REFRESH_TOKEN
        )
     if(email && password)
     {
         const isEmailValid = validateEmail(email)
         if(isEmailValid)
         {
             try 
             {
                 const Password = password;
                 let sql = `INSERT into usuarios (email, password) values ('${email}','${Password}')`
                 db.query(sql, (err, result) => {
                     if (err) throw err
                     res.status(201).send('User created correctly')
                 })
                 return
             }
             catch { res.status(500).send() }
             return res
             .cookie("access_token", token, {
               httpOnly: true,
               expires: new Date(Date.now() + 1000 * 60 * 30),
               withCredentials: true,
               secure: process.env.NODE_ENV === "production",
             })
             .cookie("refresh_token", refreshToken, {
                httpOnly: true,
               withCredentials: true,
               secure: process.env.NODE_ENV === "production",
             }
             )
             .status(200)
             .json(user);
         }
         else res.send('An account already exists with that email address')
     }   
     else res.status(400).send('You must complete all the fields') 
 })

 router.post('/login', async (req, res) => {
     const { email, password } = req.body
     let sql = `SELECT password, Id from usuarios WHERE email = '${email}'`
     db.query(sql, async (err, result) => {
         
         if(err) throw err
         let Password
         if(result.length != 0) Password = result[0].password
         else return res.status(404).send('User not found')
         const token = jwt.sign({ email: req.body.email, password: req.body.password, id: result[0].Id }, process.env.SECRET_KEY, { expiresIn: "5m" });
         const refreshToken = jwt.sign(
            {
            expiresIn: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
            email: req.body.email, password: req.body.password, id: result[0].Id
            },
            process.env.REFRESH_TOKEN
            )
         try 
         {
             if (password == Password) {
                 return res
                 .cookie("access_token", token, {
                   httpOnly: true,
                   expires: new Date(Date.now() + 1000 * 60 * 30),
                   withCredentials: true,
                   secure: process.env.NODE_ENV === "production",
                   //sameSite: "None"
                 })
                 .cookie("refresh_token", refreshToken, {
                    httpOnly: true,
                   withCredentials: true,
                   secure: process.env.NODE_ENV === "production",
                 }
                 )
                 .status(200)
                 .json({ message: "Logged in successfully 😊 👌", jwtToken: token });
             }
             else {
                 res.send('Incorrect password')
                 
             }
         }
         catch { res.status(500).send() }
     })
 })

 router.get("/getUser", authorization, async (req, res) => {
    const userInfo = req.body
    userInfo.email = req.email
    
    try {
        const user = await User_Controller.getUser(userInfo);
        return res.json(user);
    }
    catch (err) {
        console.error(err.message);
        return res.status(400).json({ message: 'Could not get user'});
    }
});

 router.post("/logout", async (req, res) => {
     return res
     .clearCookie("access_token")
     .status(200)
     .json({ message: "Successfully logged out 😏 🍀" });
 });
 
 router.post('/registro-plantas', authorization, async (req, res) => {
    const {NombreCampo, NombreCultivo, Cordenadas : coords, CantidadAgua} = req.body
        try 
            {
                let sql = `INSERT INTO registrosplantas(NombreCultivo, NombreCampo, Cordenadas, CantidadAgua) VALUES ('${NombreCampo}','${NombreCultivo}','${coords}','${CantidadAgua}')`
                db.query(sql, (err, result) => {
                    if (err) throw err
                    res.status(201).json({message: 'Field registred correctly'})
                })
                var runAnalysis = function() {
                    ee.initialize(null, null, function() {
                        let countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
                        let roi = countries.filter(ee.Filter.eq("country_na", "Argentina"));
                  
                        let landsat = ee.ImageCollection("LANDSAT/LC08/C01/T1")
                        .filterDate('2021-01-01', '2022-11-11')
                        .filterBounds(roi)
                        .filter(ee.Filter.eq('CLOUD_COVER', 0));
                        let clip = ee.Image(landsat.first().clipToCollection(ee.Geometry.LinearRing(coords)));
                        let ndmi = clip.normalizedDifference(['B5', 'B6']);        
                        var url = ndmi.visualize({min:-1,max:1,palette:['#FFFFFF','#9FA3F3','#5157CB','#1500FF']}).getThumbURL({dimensions:'1024x1024',format:'jpg'});
                        console.log(url);
                       
                      }, function(e) {
                          console.error('Initialization error: ' + e);
                        });
                  };
                  ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function(e) {
                    console.error('Authentication error: ' + e);
                    });
                return 
            }
            catch { res.status(500).send() }   
            

 router.delete('/:id-plantas', (req, res) => {
    const { id } = req.params
        let sql = `DELETE from registrosplantas WHERE id = ${id}`
        db.query(sql, (err, result) => {
            if (err) throw err
            if (result.affectedRows != 0) res.send('The field has been deleted successfully')
            else res.status(404).send('Field not found')
        })
    })
})
 function validateEmail(email)
 {
     let sql = `SELECT * FROM usuarios WHERE email = '${email}'`
     var output = syncSql.mysql(config, sql)
     db.query(sql, (err, result) => {
         if (err) throw err
     })
     return output.data
 }



 module.exports = router;