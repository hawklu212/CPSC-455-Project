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

    let routeResultsArray = [];
    directions.data.routes.forEach((route) => {
      let leg = route.legs[0];

      let routeDataResult = {
        mapBoundsData: route.bounds, // need this for maps Viewport
        totalDistance: leg.distance.value,
        totalDuration: leg.duration.value, //in seconds
        endAddress: leg.end_address,
        endLocation: leg.end_location,
        startAddress: leg.start_address,
        startLocation: leg.start_location,
        maxElevation: null,
        steepestIncline: null,
        rating: "neutral", // replace with "happy" or "sad" somehow
        ranking: 0,
      };
      let elevationResults = getElevationResults(route, routeDataResult);

      // TODO: calculate max elevation increase
      // TODO: calculate steepest incline
      // TODO: assign rating
      // TODO: assign ranking somehow based on some criteria
      // TODO: assign sort route data list

      routeResultsArray.push();
    });

    // maybe we create a custom object containing the details we need in the frontend,
    // e.g. details on the card, just for ease of use?

    res.send({ routes: routeResultsArray });
    // res.send({ routes: directions.data.routes });
  } catch (e) {
    res.send({ error: e });
  }
});

module.exports = router;
