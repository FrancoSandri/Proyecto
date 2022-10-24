// require("dotenv").config()
// const {Router} = require('express');
// const router = Router();
// const mysql = require('mysql')
// const jwt = require("jsonwebtoken");
// const express = require("express");
// const app = express();
// const bcrypt = require("bcrypt");

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "rootroot",
//     database: "Satolution"
// }) 

// const syncSql = require('sync-sql')
// var config = {
//     host : "localhost",
//     user: "root",
//     password : "rootroot",
//     database : "Satolution"
// }

// db.connect((err) => {
//     if (err) throw (err)
// })

// const authorization = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) {
//       return res.sendStatus(403);
//     }
//     try {
//       const data = jwt.verify(token, process.env.SECRET_KEY);
//       req.email = data.email;
//       req.password = data.password;
//       return next();
//     } catch {
//       return res.sendStatus(403);
//     }
//   };

// //Routes

// router.get('/get-all', (req, res) => {
//     let sql = 'select * from usuarios'
//     db.query(sql, (err, result) => {
//         if (err) throw err
//         res.send(result)
//     })
// })
// router.get('/:id', (req, res) => {
//     const { id } = req.params
//     let sql = `select * from usuarios where id = ${id}`
//     db.query(sql, (err, result) => {
//         if (err) throw err

//         if (result.length != 0) res.send(result)
//         else res.status(404).send('User not found')
//     })
// })

// router.put('/name-reset/:id', (req, res) => {
//     const { id } = req.params
//     const { name } = req.body

//     let sql = `update usuarios set name = '${name}' where id = ${id}`
//     db.query(sql, (err, result) => {
//         if (err) throw err

//         if (result.affectedRows != 0) res.send('User updated successfully')
//         else res.status(404).send('User not found')

//     })
// })

// router.put('/password-reset', async (req, res) => {
//     const {email, password} = req.body

//     if(email && password)
//     {
//         const IsUser = checkUserExistance(email)

//         if(IsUser)
//         {
//             const Password = password;
//             let sql = `update usuario set password = '${Password}'`

//             db.query(sql, (err, result) => {
//                 if(err) throw err

//                 res.send('User updated successfully')
//             })
//         }
//         else res.status(404).send('User not found')
//     }
//     else res.status(400).send('You must complete all the fields')
    
// })

// router.delete('/:id', (req, res) => {
//     const { id } = req.params

//     let sql = `delete from usuarios where id = ${id}`
//     db.query(sql, (err, result) => {
//         if (err) throw err

//         if (result.affectedRows != 0) res.send('The user has been deleted successfully')
//         else res.status(404).send('User not found')

//     })
// })

// router.post('/register', async (req, res) => {
//     const {email, password } = req.body
//     const token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.SECRET_KEY, { expiresIn: "300s" });

//     if(email && password)
//     {
//         const isEmailValid = validateEmail(email)

//         if(isEmailValid)
//         {
//             try 
//             {
//                 const Password = password;

//                 let sql = `insert into usuarios (email, password) values ('${email}','${Password}')`
//                 db.query(sql, (err, result) => {
//                     if (err) throw err
//                     res.status(201).send('User created correctly')
//                 })
//             }
//             catch { res.status(500).send() }

//             return res
//             .cookie("access_token", token, {
//               httpOnly: true,
//               secure: process.env.NODE_ENV === "production",
//             })
//             .status(200)
//             .json(user);
//         }
//         else res.send('An account already exists with that email address')
//     }   
//     else res.status(400).send('You must complete all the fields') 
// })

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body
//     const token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.SECRET_KEY, { expiresIn: "5m" });

//     let sql = `select password from user where email = '${email}'`
//     db.query(sql, async (err, result) => {
        
//         if(err) throw err

//         let Password

//         if(result.length != 0) Password = result[0].password
//         else return res.status(404).send('User not found')
        
//         try 
//         {
//             if (await compare(password, Password)) {
//                 return res
//                 .cookie("access_token", token, {
//                   httpOnly: true,
//                   secure: process.env.NODE_ENV === "production",
//                 })
//                 .status(200)
//                 .json({ message: "Logged in successfully 😊 👌" });
//             }
//             else {
//                 res.send('Incorrect password')
//             }
//         }
//         catch { res.status(500).send() }
//     })
// })

// router.post("/logout", async (req, res) => {
//     return res
//     .clearCookie("access_token")
//     .status(200)
//     .json({ message: "Successfully logged out 😏 🍀" });
// });

// function validateEmail(email)
// {
//     let sql = `select * from usuarios where email = '${email}'`
//     var output = syncSql.mysql(config, sql)

//     db.query(sql, (err, result) => {
//         if (err) throw err
//     })

//     return output.data
// }

// function checkUserExistance(email)
// {
//     let sql = `select * from usuario where email = '${email}'`
//     var output = syncSql.mysql(config, sql)

//     return output.data.rows.length != 0
// }

// module.exports = router;    