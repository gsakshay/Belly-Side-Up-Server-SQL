const express = require("express");
const uuid = require('uuid');
const comment  = require("../models/comments")
const authentication = require("../helpers/authHelper");
const user = require("../models/users");
const dish = require("../models/dishes")

const commentRouter = express.Router();
commentRouter.use(express.json());

commentRouter
    .route("/:dishId")
    .get((req, res, next) => {
        const  {dishId} = req.params;
        comment.findAll({
            where:{
                dishId
            },
            include: user
        }).then(comments=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(comments);
        }).catch(err=>{
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.json(err)
        })
    })
    .post(authentication.validateUser, (req, res, next) => {
        const {dishId} = req.params;
        const {comment: newComment} = req.body;
        comment.create({
        id: uuid.v4(), comment: newComment, dishId, userId: req.user.user.id
        }).then(comment=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(comment);
        }).catch(err=>{
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json");
            res.json({err});
        })
    });
commentRouter
    .delete("/delete/:commentId",authentication.validateUser, (req, res, next) => {
        const  { commentId } = req.params;
        comment.destroy({
            where: {
                id: commentId,
                userId: req.user.user.id
            }
        }).then(comment=>{
            if(comment){
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json("Comment deleted");
            }
        }).catch(err=>{
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.json(err)
        })
    });


module.exports = commentRouter;