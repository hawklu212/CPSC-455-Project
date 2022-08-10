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
  const userPref = JSON.parse(routeParams.userPref);

  try {
    const directions = await getDirectionsResults(orig, dest);

    const routeResultsArray = [];
    for (const [index, route] of directions.data.routes.entries()) {
      const leg = route.legs[0];

      let routeSummary = {
        mapBoundsData: route.bounds,
        totalDistance: leg.distance.value,
        totalDuration: leg.duration.value,
        endAddress: leg.end_address,
        endLocation: leg.end_location,
        startAddress: leg.start_address,
        startLocation: leg.start_location,
        totalElevation: null,
        steepestIncline: null,
        score: null,
        rating: 0,
        routeIndex: index,
      };

      const elevationResults = await getElevationResults(route, userPref);

      routeSummary.steepestIncline = elevationResults.steepestIncline;

      if (routeSummary.steepestIncline > (userPref.maxIncline + 1)) {
        routeSummary.score = Number.MAX_SAFE_INTEGER;
        routeSummary.rating = 2;
      } else if (routeSummary.steepestIncline > userPref.maxIncline) {
        routeSummary.score = elevationResults.routeScore;
        routeSummary.rating = 1;
      } else {
        routeSummary.score = elevationResults.routeScore;
        routeSummary.rating = 0;
      }

      calculateTotalElevation(
        routeSummary,
        elevationResults.elevationDataArray
      );

      routeResultsArray.push(routeSummary);
    }

    routeResultsArray.forEach((route, index) => route.ranking = index+1);

    res.send({ routes: routeResultsArray });
  } catch (e) {
    res.send({ error: e });
  }
});

module.exports = router;
