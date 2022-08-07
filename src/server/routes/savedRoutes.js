const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { valCookie } = require("./users");
const { LoginModel } = require("./users");
const savedRouteSchema = require("../database/savedRouteSchema");

const savedRouteModel = savedRouteSchema;
router.get("/", valCookie, async function (req, res) {
  try {
    let { cookies } = req;
    let individual = await LoginModel.find({ accessToken: cookies.session_id });
    let savedRoutes = await savedRouteModel.find({
      email: individual[0]["email"],
    });
    let arr = [];
    for (let i = 0; i < savedRoutes.length; i++) {
      arr.push(savedRoutes[i]);
    }
    res.send(arr);
  } catch (error) {
    res.send({ error: error });
    return;
  }
});

router.post("/", valCookie, async function (req, res) {
  try {
    let { cookies } = req;
    let individual = await LoginModel.find({ accessToken: cookies.session_id });
    let duplicateCheck = await savedRouteModel.find({
      email: individual[0]["email"],
      name: req.body["name"],
    });
    if (duplicateCheck.length !== 0) {
      res.send({ exists: 1 });
      return;
    }
    let newSavedRoutes = new savedRouteModel({
      email: individual[0]["email"],
      origin: req.body["origin"],
      destination: req.body["destination"],
      name: req.body["name"],
    });
    await newSavedRoutes.save();
    let savedRoutes = await savedRouteModel.find({
      email: individual[0]["email"],
    });
    let arr = [];
    for (let i = 0; i < savedRoutes.length; i++) {
      arr.push(savedRoutes[i]);
    }
    res.send({ exists: 0, results: arr });
  } catch (error) {
    res.send({ error: error });
    return;
  }
});

router.put("/", valCookie, async function (req, res) {
  try {
    let { cookies } = req;
    let individual = await LoginModel.find({ accessToken: cookies.session_id });
    // let duplicateCheck = await savedRouteModel.find({
    //   email: individual[0]["email"],
    //   name: req.body["name"],
    // });
    // if (duplicateCheck.length !== 0) {
    //   res.send({ exists: 1 });
    //   return;
    // }

    let savedRoutes = await savedRouteModel.deleteMany({
      email: individual[0]["email"],
    });
    let arr = [];
    for (let i = 0; i < savedRoutes.length; i++) {
      arr.push(savedRoutes[i]);
    }
    res.send({ exists: 0, results: arr });
  } catch (error) {
    res.send({ error: error });
    return;
  }
});

router.delete("/", valCookie, async function (req, res) {
  try {
    let { cookies } = req;
    let individual = await LoginModel.find({ accessToken: cookies.session_id });
    let savedRoutes = await savedRouteModel.deleteOne({
      email: individual[0]["email"],
      origin: req.body["origin"],
      destionation: req.body["destination"],
      name: req.body["name"],
    });
    let newArr = await savedRouteModel.find({ email: individual[0]["email"] });

    let arr = [];
    for (let i = 0; i < newArr.length; i++) {
      arr.push(newArr[i]);
    }
    res.send(arr);
  } catch (error) {
    res.send({ error: error });
    return;
  }
});

module.exports = router;
