const express = require("express");
const uuid = require('uuid');
const feedback = require("../models/feedback")
const authentication = require("../helpers/authHelper");
const user = require("../models/users");

const feedbackRouter = express.Router();
feedbackRouter.use(express.json());

feedbackRouter
  .route("/")
  .get(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
    feedback.findAll({
      include: user
    })
    .then(feedbacks => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(feedbacks);
    })
    .catch(err => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json(err)
    })
  })
  .post(authentication.validateUser, (req, res, next) => {
    const userId = req.user.user.id; 
    const { userFeedback } = req.body;
    feedback.create({
        id: uuid.v4(), userId, feedback: userFeedback
    }).then(feedback=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(feedback);
    }).catch(err=>{
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.json(err)
    })
  });

module.exports = feedbackRouter;