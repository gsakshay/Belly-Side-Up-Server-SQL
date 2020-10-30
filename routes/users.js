const express = require("express");
const uuid = require('uuid');
const user  = require("../models/users")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authentication = require("../helpers/authHelper")
const favorite = require("../models/favorite");
const dish = require("../models/dishes");
const comment = require("../models/comments");

const userRouter = express.Router();
userRouter.use(express.json());

userRouter
  .get("/", authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
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
      const {firstName, lastName, username, password, phno, address} = req.body;
      try{
        bcrypt.hash(password, 10).then(hash=>{
          user.create({
          id: uuid.v4(), firstName, lastName, username, hash, phno, address
          })
          .then(user=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful!" });
        }).catch(err=>{
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.json(err)
        })
        }
        ).catch(err=>{
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.json(err)
        })
      }catch(err){
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json(err)
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
                  token,
                  user
                })
              }
            });
        }else{
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: false, status: 'Please enter vaid details'});
        }
        }).catch(err=>{
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err});
      })
      }).catch(err=>{
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err});
      })
      }catch(err){
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err});
      }
    });

  userRouter
    .route("/:userId")
    .get(authentication.validateUser, (req, res, next)=>{
      const { userId } = req.params;
      user.findOne({
        where: {
          id: userId
        },
        include: comment
      }).then(user=>{
          res.json(user);
      })
      .catch(err=>{
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json(err)
      })
    });

  userRouter
    .route("/user/single")
    .get(authentication.validateUser, (req, res, next)=>{
      if(req.user.user){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(req.user.user)
      }else{
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json("No user with this auth token")
      }
      
    });

  userRouter
    .route("/favorites/all")
    .get(authentication.validateUser, (req, res, next)=>{
      const userId = req.user.user.id
      favorite.findAll({
        where:{
          userId
        },
        include: dish
      })
      .then(favorites=>{
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorites);
      })
      .catch(err=>{
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.json(err)
      })
    });

  userRouter
    .route("/favorites/:dishId")
    .post(authentication.validateUser, (req, res, next)=>{
      const { dishId } = req.params;
      const unique = req.user.user.id.toString() + dishId.toString()
      favorite.create({
        userId: req.user.user.id, dishId, uniqueId: unique.substring(0, 20)
      })
      .then(favorite=>{
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorite);
      }).catch(err=>{
        res.statusCode = 400
        if(err.name === "SequelizeUniqueConstraintError"){
          newError = new Error("Dish is already in your favorites list")
          res.json(newError)
        }else{
          res.json({err, user: req.user});
        }
      })
    })
    .delete(authentication.validateUser, (req, res, next)=>{
      const { dishId } = req.params;
      favorite.destroy({
        where:{
          userId: req.user.user.id,
          dishId
        }
      })
      .then(favorite=>{
          if(favorite){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json("Removed the dish from favorites");
          }
      }).catch(err=>{
          res.statusCode = 400
          res.setHeader("Content-Type", "application/json");
          res.json({err, user: req.user});
      })
    })  

module.exports = userRouter;
