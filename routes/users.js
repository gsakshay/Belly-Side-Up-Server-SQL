const express = require("express");
const uuid = require('uuid');
const user  = require("../models/users")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();
userRouter.use(express.json());

userRouter
  .get("/", (req, res, next) => {
    user.findAll()
      .then(users=> {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      })
      .catch(err=> {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ error: true, err });
      })
  })
  userRouter
    .post("/register", (req, res, next)=>{
      const {firstName, lastName, username, password} = req.body;
      try{
        bcrypt.hash(password, 10).then(hash=>{
          user.create({
          guid: uuid.v4(), firstName, lastName, username, hash
          })
          .then(user=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful!" });
        }).catch(err=>res.json({error: err}))
        }
        ).catch(err=>res.json({error: err}))
      }catch(err){
        next(err)
      }
    })
  userRouter  
    .post("/signin", (req, res, next)=>{
      const { username, password } = req.body;
      try{
        user.findOne({
        where:{
          username
        }
      }).then(user=>{
        bcrypt.compare(password, user.hash).then(match=>{
          if(match){
            jwt.sign({ user: user }, process.env.TOKEN_SECRET, (err, token) => {
              if(err){
                res.json({error: true, err})
              }else{
                res.json({
                  token
                })
              }
            });
        }else{
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: false, status: 'Please enter vaid details'});
        }
        }).catch(err=>{
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err});
      })
      }).catch(err=>{
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err});
      })
      }catch(err){
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err});
      }
    })
  userRouter  
    .post("logout", (req, res, next)=>{
      
    })  

module.exports = userRouter;
