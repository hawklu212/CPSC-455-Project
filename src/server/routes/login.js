var express = require("express");
var router = express.Router();
var fs = require("fs");

function getReturnHelper(stat, payload) {
  return { status: stat, userName: payload };
}
/* GET users listing. */
router.post("/", function (req, res, next) {
  let user = "userName";
  let pass = "userPass";
  var currentFile = JSON.parse(fs.readFileSync("tempcred.json"));
  for (let i = 0; i < currentFile.length; i++) {
    if (req.body[user] === currentFile[i][user]) {
      if (req.body[pass] === currentFile[i][pass]) {
        res.send(getReturnHelper(0, req.body[user]));
        return;
      } else {
        res.send(getReturnHelper(2, ""));
        return;
      }
    }
  }
  res.send(getReturnHelper(1, ""));
  return;
});

module.exports = router;
