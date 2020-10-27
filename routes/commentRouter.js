const express = require("express");
const uuid = require('uuid');
const comment  = require("../models/comments")
const validateUser = require("../authenticate")

const commentRouter = express.Router();
commentRouter.use(express.json());

commentRouter
    .route("/:dishId")
    .get((req, res, next) => {
        const  {dishId} = req.params;
        comment.findAll({
            where:{
                dishId
            }
        }).then(comments=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(comments);
        }).catch(err=>{
            next(err);
        })
    })
    .post(validateUser, (req, res, next) => {
        const {dishId} = req.params;
        const {rating, comment: newComment} = req.body;
        comment.create({
        guid: uuid.v4(), rating, comment: newComment, dishId, userId: req.user.user.guid
        }).then(comment=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(comment);
        }).catch(err=>{
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json");
            res.json({err, user: req.user});
        })
    });
commentRouter
    .delete("/delete/:commentId",validateUser, (req, res, next) => {
        const  { commentId } = req.params;
        comment.destroy({
            where: {
                guid: commentId
            }
        }).then(comment=>{
            if(comment){
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json("Comment deleted");
            }
        }).catch(err=>{
            next(err);
        })
    });


module.exports = commentRouter;