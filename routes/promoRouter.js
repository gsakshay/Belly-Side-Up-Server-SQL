const express = require("express");
const uuid = require('uuid');
const promotion  = require("../models/promotions")
const validateUser = require("../authenticate");

const promoRouter = express.Router();
promoRouter.use(express.json());

promoRouter
  .route("/")
  .get((req, res, next) => {
    promotion.findAll()
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotions);
    })
    .catch(err => res.render('error', {error: err}))
  })
  .post(validateUser, (req, res, next) => {
    const {name, image, description, price, label, featured} = req.body;
    promotion.create({
      guid: uuid.v4(), name, image, description, price, label, featured
    }).then(promotion=>{
      res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
    }).catch(err => res.render('error', {error: err}))
  })
  .put(validateUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete(validateUser, (req, res, next) => {
    promotion.destroy({
        truncate: true
    }).then(promotions=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json("All promos deleted");
    })
  });

promoRouter
  .route("/:promoId")
  .get(validateUser, (req, res, next) => {
    const { promoId } = req.params;
    promotion.findOne({
        where:{
            guid: promoId
        }
    }).then(promotion=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
    }).catch(err=>{
        next(err);
    })
  })
  .post(validateUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /promotions/" + req.params.promoId);
  })
  .put((req, res, next) => {
    const { promoId } = req.params;
    const { name, image, description, price, label, featured } = req.body;
    promotion.update({
        name, image, description, price, label, featured
    }, {
        where:{
            guid: promoId
        }
    }).then(promoUpdated=>{
        if(promoUpdated){
            promotion.findOne({
                where:{
                    guid: promoId
                }
            }).then(promotion=>{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(promotion);
            }).catch(err=>{
                next(err);
            })
        }
    }).catch(err=>{
        next(err);
    })
  })
  .delete(validateUser, (req, res, next) => {
    const { promoId } = req.params;
    promotion.destroy({
      where: {
          guid: promoId
      }
    }).then(promotion=>{
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json("Promotion deleted");
    }).catch(err=>{
      next(err);
    })
  });

module.exports = promoRouter;