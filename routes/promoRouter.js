const express = require("express");
const uuid = require('uuid');
const promotion  = require("../models/promotions")
const authentication = require("../helpers/authHelper")
const upload = require("../helpers/imageUplaod")

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
  .post(authentication.validateUser, authentication.validateAdmin, upload.single('image'), (req, res, next) => {
    const {name, description, price, label, featured} = req.body;
    let image = req.file.path;
    const host = process.env.PORT || 'localhost:3000'
    image = host + image.replace("public", "")
    promotion.create({
      guid: uuid.v4(), name, image, description, price, label, featured
    }).then(promotion=>{
      res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
    }).catch(err => res.render('error', {error: err}))
  })
  .put(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
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
  .get(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
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
        res.json(err);
    })
  })
  .post(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /promotions/" + req.params.promoId);
  })
  .put(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
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
                res.json(err);
            })
        }
    }).catch(err=>{
        res.json(err);
    })
  })
  .delete(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
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
      res.json(err);
    })
  });

module.exports = promoRouter;