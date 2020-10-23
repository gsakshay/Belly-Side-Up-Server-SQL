const express = require("express");
const uuid = require('uuid');
const leader  = require("../models/leaders")

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
  .post((req, res, next) => {
    const { name, image, designation, abbr, description , featured } = req.body;
    leader.create({
        guid: uuid.v4(), name, image, designation, abbr, description , featured
    }).then(leader=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    }).catch(err=>{
        next(err);
    })
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders");
  })
  .delete((req, res, next) => {
    leader.destroy({
    truncate: true
    }).then(leaders=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json("All leaders deleted");
    }).catch(err=>{
        next(err);
    })
  });

leaderRouter
  .route("/:leaderId")
  .get((req, res, next) => {
    const { leaderId } = req.params;
    leader.findOne({
        where:{
            guid: leaderId
        }
    }).then(leader=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    }).catch(err=>{
        next(err);
    })
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/" + req.params.leaderId);
  })
  .put((req, res, next) => {
    const { leaderId } = req.params;
    const { name, image, designation, abbr, description , featured } = req.body;
    leader.update({
        name, image, designation, abbr, description , featured
    }, {
        where:{
            guid: leaderId
        }
    }).then(leaderUpdated=>{
        if(leaderUpdated){
            leader.findOne({
                where:{
                    guid: leaderId
                }
            }).then(leader=>{
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(leader);
            }).catch(err=>{
                next(err);
            })
        }
    }).catch(err=>{
        next(err);
    })
  })
  .delete((req, res, next) => {
    const { leaderId } = req.params;
    leader.destroy({
        where: {
            guid: leaderId
        }
    }).then(leader=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json("Given leader deleted");
    }).catch(err=>{
        next(err);
    })
  });

module.exports = leaderRouter;