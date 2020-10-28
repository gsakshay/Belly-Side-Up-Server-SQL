const express = require("express");
const uuid = require('uuid');
const leader  = require("../models/leaders");
const authentication = require("../helpers/authHelper")
const upload = require("../helpers/imageUplaod")

const leaderRouter = express.Router();
leaderRouter.use(express.json());

leaderRouter
  .route("/")
  .get((req, res, next) => {
    leader.findAll()
    .then(leaders => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leaders);
    })
    .catch(err => res.render('error', {error: err}))
  })
  .post(authentication.validateUser, authentication.validateAdmin, upload.single('image'),  (req, res, next) => {
    const { name, designation, abbr, description , featured } = req.body;
    let image = req.file.path;
    const host = process.env.PORT || 'localhost:3000'
    image = host + image.replace("public", "")
    leader.create({
        id: uuid.v4(), name, image, designation, abbr, description , featured
    }).then(leader=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    }).catch(err=>{
        res.json(err);
    })
  })
  .put(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders");
  })
  .delete(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
    leader.destroy({
    truncate: true
    }).then(leaders=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json("All leaders deleted");
    }).catch(err=>{
        res.json(err);
    })
  });

leaderRouter
  .route("/:leaderId")
  .get((req, res, next) => {
    const { leaderId } = req.params;
    leader.findOne({
        where:{
            id: leaderId
        }
    }).then(leader=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    }).catch(err=>{
        res.json(err);
    })
  })
  .post(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/" + req.params.leaderId);
  })
  .put(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
    const { leaderId } = req.params;
    const { name, image, designation, abbr, description , featured } = req.body;
    leader.update({
        name, image, designation, abbr, description , featured
    }, {
        where:{
            id: leaderId
        }
    }).then(leaderUpdated=>{
        if(leaderUpdated){
            leader.findOne({
                where:{
                    id: leaderId
                }
            }).then(leader=>{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(leader);
            }).catch(err=>{
                res.json(err);
            })
        }
    }).catch(err=>{
        res.json(err);
    })
  })
  .delete(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
    const { leaderId } = req.params;
    leader.destroy({
        where: {
            id: leaderId
        }
    }).then(leader=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json("Given leader deleted");
    }).catch(err=>{
        res.json(err);
    })
  });

module.exports = leaderRouter;