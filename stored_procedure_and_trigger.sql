CREATE PROCEDURE logging(text) 
LANGUAGE 'plpgsql'
AS $$
BEGIN
	INSERT INTO logs (log) VALUES ($1);
END;
$$; 

CREATE FUNCTION log_trigger_dishes() 
   RETURNS TRIGGER 
AS $$
BEGIN
   CALL logging('A new dish got added');
   RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER logger_dish 
AFTER INSERT
ON dishes
FOR EACH ROW
EXECUTE PROCEDURE log_trigger_dishes();

CREATE FUNCTION log_trigger_leader() 
   RETURNS TRIGGER 
AS $$
BEGIN
   CALL logging('A new leader got added');
   RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER logger_leader 
AFTER INSERT
ON leaders
FOR EACH ROW
EXECUTE PROCEDURE log_trigger_leader();

CREATE FUNCTION log_trigger_promotions() 
   RETURNS TRIGGER 
AS $$
BEGIN
   CALL logging('A new promotion got added');
   RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER logger_promotion 
AFTER INSERT
ON promotions
FOR EACH ROW
EXECUTE PROCEDURE log_trigger_promotions();
