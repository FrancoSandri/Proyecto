if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
 require("dotenv").config()
 const {Router, application} = require('express');
 const router = Router();
 const mysql = require('mysql')
 const jwt = require("jsonwebtoken");
 const express = require("express");
 const app = express();
 const bcrypt = require("bcrypt");
const passport = require('passport')
const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const methodOverride = requiere('method-override');


 const initializePassport = require('./passport-config.js')
 initializePassport(passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    ) 

 app.use(express.urlencoded({ extended: false }))
 app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

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

 //Routes

 router.get('/get-all', checkAuthenticated, (req, res) => {
         let sql = 'select * from usuarios'
         db.query(sql, (err, result) => {
             if (err) throw err
             res.send(result)
         })
     })

router.post('/user',  async (req, res) => {
    //Auth User
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
    user.push(user)
    res.status(201).send()
    } catch{
        res.status(500).send()
    }
})
router.post('/user/login', checknotAuthenticated,  passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}))
router.post('/user/login', checknotAuthenticated, async (req, res) =>{
    const user = users.find(user => user.name = req.body.name)
    if (user == null){
        return res.status(400).send('Cannot find User')
    }
    try{
       if (awaitbcrypt.compare(req.body.password, user.password )){
       res.send('Success')
       } else{
        res.send('Not Allowed')
       }
    } catch{
        res.status(500).send()
    }
})

router.post('/register', checknotAuthenticated, async (req,res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        user.push({
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch{
        res.redirect('/register')
    }
})

app.delete('/logout'), (req, res) => {
    req.logOut()
    res.redirect('/user/login')
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/user/login')
}

function checknotAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

app.listen(3000)