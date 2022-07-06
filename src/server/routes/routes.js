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

    // this will be a 2D array, where each entry represents
    // an array of elevation results for each route
    let elevationResultsArray = [];
    directions.data.routes.forEach((route) => {
      elevationResultsArray.push(getElevationResults(route));
    });

    // maybe we create a custom object containing the details we want to display
    // on the card, just for ease of use?

    // let elevations = await getElevationResults(locations);
    res.send({ routes: directions.data.routes });
  } catch (e) {
    res.send({ error: e });
  }
});

module.exports = router;
