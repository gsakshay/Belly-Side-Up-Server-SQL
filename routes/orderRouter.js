const express = require("express");
const uuid = require('uuid');
const dish  = require("../models/dishes")
const authentication = require("../helpers/authHelper")
const upload = require("../helpers/imageUplaod");
const user = require("../models/users");
const comment = require("../models/comments")
const order = require("../models/orders")

const orderRouter = express.Router();
orderRouter.use(express.json());

orderRouter
    .get("/", authentication.validateUser, (req, res, next) => {
        const userId = req.user.user.id
        order.findAll({
            where:{
                userId
            },
            include: dish
        })
        .then(orders => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(orders);
        })
        .catch(err => res.render('error', {error: err}))
    });

orderRouter    
    .post("/:dishId",authentication.validateUser, (req, res, next) => {
        const { dishId } = req.params;
        order.create({
        id: uuid.v4(), userId: req.user.user.id, dishId 
        }).then(order=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(order);
        }).catch(err=>{
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json");
            res.json({err});
        })
    });

orderRouter    
    .put("/:orderId", authentication.validateUser, (req, res, next) => {
        const {orderId} = req.params;
        order.update({
            isDelivered: true
        },{
            where:{
                id: orderId
            }
        }).then(order=>{
            if(order){
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json("Order was successfully delivered");
            }else{
                throw new Error("There was an error in delivery")
            }
        }).catch(err=>{
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json");
            res.json({err});
        })
    })

orderRouter    
    .delete("/:orderId", authentication.validateUser, (req, res, next) => {
        const { orderId } = req.params;
        order.destroy({
            where: {
                id: orderId
            }
        }).then(order=>{
            if(order){
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json("Order deleted");
            }else{
                throw new Error("Could not delete the order")
            }
        }).catch(err=>{
            res.json(err);
        })
    });

module.exports = orderRouter;