const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { valCookie } = require("./users");
const { LoginModel } = require("./users");
const profileSchema = require("../database/profileSchema");

const Schema = mongoose.Schema;
const ProfileModel = profileSchema;
router.get("/", valCookie, async function (req, res) {
  let { cookies } = req;
  try {
    let individual = await LoginModel.find({ accessToken: cookies.session_id });
    if (individual.length !== 0) {
      let findPref = await ProfileModel.find({ email: individual[0]["email"] });
      if (findPref.length == 0) {
        res.send({ exists: 0 });
      } else {
        res.send({
          exists: 1,
          email: findPref[0]["email"],
          maxIncline: findPref[0]["maxIncline"],
          weight: findPref[0]["weight"],
          distancePreference: findPref[0]["distancePreference"],
        });
      }
    } else {
      console.log("user not logged in");
      res.send({ error: "user not logged in" });
    }
  } catch (err) {
    console.log(err);
    res.send({ error: err });
  }
});

router.put("/", valCookie, async function (req, res) {
  let { cookies } = req;
  try {
    let individual = await LoginModel.find({ accessToken: cookies.session_id });
    if (individual.length !== 0) {
      console.log("found" + individual[0]);
      let findPref = await ProfileModel.find({ email: individual[0]["email"] });
      if (findPref.length === 0) {
        newPref = new ProfileModel({
          email: individual[0]["email"],
          maxIncline: req.body["maxIncline"],
          weight: req.body["weight"],
          distancePreference: req.body["distancePreference"],
        });
        await newPref.save();
        findPref = await ProfileModel.find({ email: individual[0]["email"] });
        findPref = findPref[0];
        res.send({
          email: findPref["email"],
          maxIncline: findPref["maxIncline"],
          weight: findPref["weight"],
          distancePreference: findPref["distancePreference"],
        });
      } else {
        findPref = await ProfileModel.findOneAndUpdate(
          { email: individual[0]["email"] },
          {
            maxIncline: req.body["maxIncline"],
            weight: req.body["weight"],
            distancePreference: req.body["distancePreference"],
          },
          { new: true }
        );
        res.send({
          email: findPref["email"],
          maxIncline: findPref["maxIncline"],
          weight: findPref["weight"],
          distancePreference: findPref["distancePreference"],
        });
      }
    } else {
      console.log("user not logged in");
      res.send({ error: "user not logged in" });
    }
  } catch (err) {
    console.log(err);
    res.send({ error: err });
  }
});

module.exports = router;
