const {
  getDirectionsResults,
  getElevationResults,
} = require("../MapsClientService");
var express = require("express");
var router = express.Router();

/* GET routes listing. */
router.get("/", async function (req, res, next) {
  let routeParams = req.query;

  let orig = routeParams.orig;
  let dest = routeParams.dest;
  try {
    let directions = await getDirectionsResults(orig, dest, []);
    // get elevation
    // // call some functions to calculate stuff
    // TODO: need to figure out how to add paths to this:

    directions.data.routes.forEach((route) => getElevationResults(route));
    // let elevations = await getElevationResults(locations);
    // res.send({ routes: directions.data.routes });
  } catch (e) {
    res.send({ error: e });
  }
});

module.exports = router;
