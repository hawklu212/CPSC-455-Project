const {
  getDirectionsResults,
  getElevationResults,
} = require("../MapsClientService");
const { calculateTotalElevation } = require("../RouteProcessingService");
const express = require("express");
const {
  elevation,
} = require("@googlemaps/google-maps-services-js/dist/elevation");
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET routes listing. */
router.get("/", async function (req, res, next) {
  const routeParams = req.query;

  const orig = routeParams.orig;
  const dest = routeParams.dest;
  const userPref = routeParams.userPref;

  try {
    const directions = await getDirectionsResults(orig, dest);

    const routeResultsArray = [];
    for (const [index, route] of directions.data.routes.entries()) {
      const leg = route.legs[0];

      let routeSummary = {
        mapBoundsData: route.bounds, // need this for maps Viewport
        totalDistance: leg.distance.value,
        totalDuration: leg.duration.value, // in seconds
        endAddress: leg.end_address,
        endLocation: leg.end_location,
        startAddress: leg.start_address,
        startLocation: leg.start_location,
        totalElevation: null,
        steepestIncline: null,
        score: null,
        rating: "neutral", // replace with "happy" or "sad" somehow
        routeIndex: index,
      };

      // getElevationResults will return array of elevations, the route score, as well as the steepest incline
      const elevationResults = await getElevationResults(route, userPref);

      // Set the values in route summary from the elevation and incline calculations
      routeSummary.steepestIncline = elevationResults.steepestIncline;

      if (routeSummary.steepestIncline > userPref.maxIncline) {
        routeSummary.score = Number.MAX_SAFE_INTEGER;
      } else {
        routeSummary.score = elevationResults.routeScore;
      }

      calculateTotalElevation(
        routeSummary,
        elevationResults.elevationDataArray
      );

      routeResultsArray.push(routeSummary);
    }

    // Assign ranking - done with 1-based indexing i.e. the best route will have ranking = 1
    routeResultsArray.forEach((route, index) => route.ranking = index+1);

    res.send({ routes: routeResultsArray });
  } catch (e) {
    res.send({ error: e });
  }
});

module.exports = router;
