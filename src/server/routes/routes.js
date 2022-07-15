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
  try {
    const directions = await getDirectionsResults(orig, dest, []);

    const routeResultsArray = [];
    for (const route of directions.data.routes) {
      const leg = route.legs[0];

      let routeSummary = {
        mapBoundsData: route.bounds, // need this for maps Viewport
        totalDistance: leg.distance.value,
        totalDuration: leg.duration.value, //in seconds
        endAddress: leg.end_address,
        endLocation: leg.end_location,
        startAddress: leg.start_address,
        startLocation: leg.start_location,
        totalElevation: null,
        steepestIncline: null,
        rating: "neutral", // replace with "happy" or "sad" somehow
        ranking: 0,
      };
      const elevationResults = await getElevationResults(route);

      calculateTotalElevation(routeSummary, elevationResults);

      // TODO: calculate steepest incline
      // TODO: assign rating
      // TODO: assign ranking somehow based on some criteria
      // TODO: assign sort route data list

      routeResultsArray.push(routeSummary);
    }
    res.send({ routes: routeResultsArray });
  } catch (e) {
    res.send({ error: e });
  }
});

module.exports = router;
