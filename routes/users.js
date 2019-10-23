var express = require('express');
var router = express.Router();

/* GET users listing. */
//  this route will be used when an URL of /users/ is received. route defines a callback that will be invoked whenever an HTTP GET request with the correct pattern is detected
router.get('/', function(req, res, next) {  //  specifies a route on that object. NEXT -->  callback function has the third argument 'next', and is hence a middleware function rather than a simple route callback.
  res.send('respond with a resource');
});

//  add your own route. this now renders on ../users/cool
router.get("/cool", function(req, res, next) {  
  res.send("You're so cool");
});

module.exports = router;
