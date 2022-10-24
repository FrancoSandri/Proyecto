 require("dotenv").config()
 const {Router} = require('express');
 const router = Router();
 const mysql = require('mysql')
 const jwt = require("jsonwebtoken");
 const express = require("express");
 const app = express();
 const bcrypt = require("bcrypt");

 app.use(express.urlencoded({ extended: false }))

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

 router.get('/get-all', (req, res) => {
         let sql = 'select * from usuarios'
         db.query(sql, (err, result) => {
             if (err) throw err
             res.send(result)
         })
     })

router.post('/user', (req, res) => {
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
router.post('/user/login', async (req, res) =>{
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

router.post('/register', async (req,res =>{
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
}))