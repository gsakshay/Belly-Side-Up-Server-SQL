const express = require("express");
const logs = require("../models/logs")
const authentication = require("../helpers/authHelper");
const sequalize = require("../database/database")

const logRouter = express.Router();
logRouter.use(express.json());


/* sequalize.query('CREATE PROCEDURE logging(text) '
  + 'LANGUAGE "plpgsql" '
  + 'AS $$ '
  + 'BEGIN '
  +	'INSERT INTO logs (log) VALUES ($1); '
  + 'END; '
  + '$$; ').then(res=>console.log(res, 'see here'))

sequalize.query('CREATE FUNCTION log_trigger_dishes() '
  + 'RETURNS TRIGGER '
  +'AS $$ '
  +'BEGIN '
  +'CALL logging("A new dish got added"); '
  +'RETURN NEW; '
  +'END; '
  +'$$ LANGUAGE PLPGSQL; ').then(res=>console.log(res, 'see here'))

sequalize.query('CREATE TRIGGER logger_dish '
+ 'AFTER INSERT '
+ 'ON dishes '
+ 'FOR EACH ROW '
+ 'EXECUTE PROCEDURE log_trigger_dishes(); ').then(res=>console.log(res, 'see here'))

sequalize.query('CREATE FUNCTION log_trigger_leader() '
  + 'RETURNS TRIGGER '
  +'AS $$ '
  +'BEGIN '
  +'CALL logging("A new leader got added"); '
  +'RETURN NEW; '
  +'END; '
  +'$$ LANGUAGE PLPGSQL; ').then(res=>console.log(res, 'see here'))

sequalize.query('CREATE TRIGGER logger_dish '
+ 'AFTER INSERT '
+ 'ON leaders '
+ 'FOR EACH ROW '
+ 'EXECUTE PROCEDURE log_trigger_leader(); ').then(res=>console.log(res, 'see here'))

sequalize.query('CREATE FUNCTION log_trigger_promotions() '
  + 'RETURNS TRIGGER '
  +'AS $$ '
  +'BEGIN '
  +'CALL logging("A new promo got added"); '
  +'RETURN NEW; '
  +'END; '
  +'$$ LANGUAGE PLPGSQL; ').then(res=>console.log(res, 'see here'))

sequalize.query('CREATE TRIGGER logger_dish '
+ 'AFTER INSERT '
+ 'ON promotions '
+ 'FOR EACH ROW '
+ 'EXECUTE PROCEDURE log_trigger_promotions(); ').then(res=>console.log(res, 'see here')) */

logRouter
  .route("/")
  .get(authentication.validateUser, authentication.validateAdmin, (req, res, next) => {
    logs.findAll({
      order: [
            ['id', 'DESC']
        ],
    })
    .then(logs => {
      console.log(logs)
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(logs);
    })
    .catch(err => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json(err)
    })
  });

module.exports = logRouter;