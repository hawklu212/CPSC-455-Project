var express = require("express");
var router = express.Router();

/* GET routes listing. */
router.get("/", function (req, res, next) {
  let routeParams = req.query;
  let orig = routeParams;
  let locations = [routeParams.orig];
  // console.log(`orig == ${orig}`);
  console.log(routeParams);
  // res.send('respond with a resource');
});

module.exports = router;
