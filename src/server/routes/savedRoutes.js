const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { valCookie } = require("./users");
const savedRouteSchema = require("../database/savedRouteSchema");

const savedRouteModel=savedRouteSchema;
router.get('/', valCookie,async function(req, res) {
    try{
      let individual = await LoginModel.find({ accessToken: cookies.session_id });
      let savedRoutes= await savedRouteModel.find({email: individual[0]["email"]});
      let arr=[];
      for (let i=0;i<savedRoutes.length;i++){
        arr.push(savedRoutes[i]);
      }
      res.send(arr);
      } catch(error){
        res.send({"error":error});
        return;
      }
  });

module.exports = router;