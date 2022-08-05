const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { valCookie } = require("./users");
const savedRouteSchema = require("../database/savedRouteSchema");

const savedRouteModel=savedRouteSchema;
router.get('/', valCookie,async function(req, res) {
    try{
      let { cookies } = req;
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


  router.put('/', valCookie,async function(req, res) {
    try{
      let { cookies } = req;
      let individual = await LoginModel.find({ accessToken: cookies.session_id });
      let newSavedRoutes= new savedRouteModel({email: individual[0]["email"],origin:req.body["origin"],destionation:req.body["destination"]});
      await newSavedRoutes.save();
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


  router.delete('/', valCookie,async function(req, res) {
    try{
      let { cookies } = req;
      let individual = await LoginModel.find({ accessToken: cookies.session_id });
      let savedRoutes= await savedRouteModel.deleteOne({email: individual[0]["email"],origin:req.body["origin"],destionation:req.body["destination"]});
      let newArr=await savedRouteModel.find({email: individual[0]["email"]});

      let arr=[];
      for (let i=0;i<newArr.length;i++){
      arr.push(newArr[i]);
      }
      res.send(arr);
      } catch(error){
        res.send({"error":error});
        return;
      }
  });


module.exports = router;