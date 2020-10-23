const express = require("express");
const uuid = require('uuid');
const dish  = require("../models/dishes")

const dishRouter = express.Router();
dishRouter.use(express.json());

dishRouter
    .route("/")
    .get((req, res, next) => {
        dish.findAll()
        .then(dishes => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dishes);
        })
        .catch(err => res.render('error', {error: err}))
    })
    .post((req, res, next) => {
        const {name, description, image, category, label, price, featured} = req.body;
        dish.create({
            guid: uuid.v4(), name, description, image, category, label, price, featured
        }).then(dish=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish);
        }).catch(err=>{
            next(err);
        })
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /dishes");
    })
    .delete((req, res, next) => {
        dish.destroy({
            truncate: true
        }).then(dishes=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json("All dishes deleted");
        }).catch(err=>{
            next(err);
        })
    });


dishRouter
    .route("/:dishId")

    .get((req, res, next) => {
        const  {dishId} = req.params;
        dish.findOne({
            where:{
                guid: dishId
            }
        }).then(dish=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish);
        }).catch(err=>{
            next(err);
        })
    })

    .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
    })

    .put((req, res, next) => {
        const  {dishId} = req.params;
        const {name, description, image, category, label, price, featured} = req.body;
        dish.update({
            name, description, image, category, label, price, featured
        }, {
            where:{
                guid: dishId
            }
        }).then(dishUpdated=>{
            if(dishUpdated){
                dish.findOne({
                    where:{
                        guid: dishId
                    }
                }).then(dish=>{
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish);
                }).catch(err=>{
                    next(err);
                })
            }
        }).catch(err=>{
            next(err);
        })
    })

    .delete((req, res, next) => {
        const  {dishId} = req.params;
        dish.destroy({
            where: {
                guid: dishId
            }
        }).then(dish=>{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json("Dish deleted");
        }).catch(err=>{
                next(err);
        })
    });


module.exports = dishRouter;