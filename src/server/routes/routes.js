const { getDirectionsResults } = require("../MapsClientService");
var express = require("express");
var router = express.Router();

/* GET routes listing. */
router.get("/", async function (req, res, next) {
  let routeParams = req.query;

  let orig = routeParams.orig;
  let dest = routeParams.dest;
  try {
    let results = await getDirectionsResults(orig, dest, []);
    res.send({ routes: results.data.routes });
  } catch (e) {
    res.send({ error: e.response.data.error_message });
  }
});

module.exports = router;
