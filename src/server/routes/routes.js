import { getDirectionsResults } from "../MapsClientService";
var express = require("express");
var router = express.Router();

/* GET routes listing. */
router.get("/", function (req, res, next) {
  let routeParams = req.query;

  let [orig, dest] = routeParams;
  let result = getDirectionsResults(orig, dest, []);
  console.log(result);
  // res.send('respond with a resource');
});

module.exports = router;
