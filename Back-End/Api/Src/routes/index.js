 require("dotenv").config()
 const cors = require("cors")
 const {Router} = require('express');
 const router = Router();
 const mysql = require('mysql')
 const jwt = require("jsonwebtoken");
 const cookieParser = require("cookie-parser")
 const express = require("express");
 const app = express();
 const bcrypt = require("bcrypt");
 const db = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "rootroot",
     database: "Satolution"
 }) 
 const syncSql = require('sync-sql')
 var config = {
     host : "localhost",
     user: "root",
     password : "rootroot",
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
     if (!token) {
       return res.sendStatus(403);
     }
     try {
       const data = jwt.verify(token, process.env.SECRET_KEY);
       req.email = data.email;
       req.password = data.password;
       return next();
     } catch {
       return res.sendStatus(403);
     }
   };
   router.get("/check-user", authorization, (req,res)=> {
    res.json({email: req.email})
   })
 //Routes
 router.get('/get-all', authorization, (req, res) => {
     let sql = 'select * from usuarios'
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
     let sql = `SELECT * FROM usuario WHERE email = '${email}'`
     db.query(sql, (err, result) => {
         if (err) throw err
         if (result.affectedRows != 0) res.send('User cheacked successfully')
         else res.status(404).send('User not cheaked')
     })
 })
 router.put('/password-reset', checkUserExistance, async (req, res) => {
     const {email, password} = req.body
     if(email && password)
     {
         const IsUser = checkUserExistance(email)
         if(IsUser)
         {
             const Password = password;
             let sql = `UPDATE usuario SET password = '${Password}' WHERE email = ${email}`
             db.query(sql, (err, result) => {
                 if(err) throw err
                 res.send('User updated successfully')
             })
         }
         else res.status(404).send('User not found')
     }
     else res.status(400).send('You must complete all the fields')
  
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
     const token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.SECRET_KEY, { expiresIn: "300s" });
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
             .status(200)
             .json(user);
         }
         else res.send('An account already exists with that email address')
     }   
     else res.status(400).send('You must complete all the fields') 
 })

 router.post('/login', async (req, res) => {
     const { email, password } = req.body
     const token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.SECRET_KEY, { expiresIn: "5m" });
     let sql = `SELECT password from usuarios WHERE email = '${email}'`
     db.query(sql, async (err, result) => {
      
         if(err) throw err
         let Password
         if(result.length != 0) Password = result[0].password
         else return res.status(404).send('User not found')
      
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
 function validateEmail(email)
 {
     let sql = `SELECT * FROM usuarios WHERE email = '${email}'`
     var output = syncSql.mysql(config, sql)
     db.query(sql, (err, result) => {
         if (err) throw err
     })
     return output.data
 }
 function checkUserExistance(email)
 {
     let sql = `SELECT * FROM usuario WHERE email = '${email}'`
     var output = syncSql.mysql(config, sql)
     return output.data.rows.length != 0
 }

 const createError = require('http-errors')

 const verifyToken = (req, res, next) => {
     const token = req.cookies.access_token
     
     if(typeof token !== 'undefined'){
         req.token = token
         
         return next()
     }
     return next({error: createError.Unauthorized('Token not found')})
 }
 

 router.post('/isLoggedIn', verifyToken, (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, err => {
        if(!err) return res.send({
            redirect: {
                destination: './index.html'
            }
        })
        return res.send({})
    })
})

router.post('/isNotLoggedIn', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, err => {
        if(err) return res.send({
            error: createError.Unauthorized(err.message),
            redirect: {
                destination: './Login.html'
            }
        })
        res.send({})
    })
})

 module.exports = router;    