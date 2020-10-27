const express = require("express");
const uuid = require('uuid');
const dish  = require("../models/dishes")
const authentication = require("../helpers/authHelper")
const upload = require("../helpers/imageUplaod");
const user = require("../models/users");
const comment = require("../models/comments")

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
    .post(authentication.validateUser, authentication.validateAdmin, upload.single('image'), (req, res, next) => {
        const {name, description, category, label, price, featured} = req.body;
        let image = req.file.path;
        const host = process.env.PORT || 'localhost:3000'
        image = host + image.replace("public", "")
        dish.create({
        guid: uuid.v4(), name, description, image, category, label, price, featured
        }).then(dish=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish);
        }).catch(err=>{
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json");
            res.json({err});
        })
    })
    .put(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /dishes");
    })
    .delete(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
        dish.destroy({
            truncate: true
        }).then(dishes=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json("All dishes deleted");
        }).catch(err=>{
            res.json(err);
        })
    });


dishRouter
    .route("/:dishId")

    .get((req, res, next) => {
        const  {dishId} = req.params;
        dish.findOne({
            where:{
                guid: dishId
            },
            include: { all: true }
        }).then(dish=>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish);
        }).catch(err=>{
            res.json(err);
        })
    })

    .post(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
    })

    .put(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
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
                    res.json(err);
                })
            }
        }).catch(err=>{
            res.json(err);
        })
    })

    .delete(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
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
                res.json(err);
        })
    });


module.exports = dishRouter;