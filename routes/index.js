var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog');  //  Response.render() is used to render a specified template along with the values of named variables passed in an object, and then send the result as a response. title: Express
});

module.exports = router;
