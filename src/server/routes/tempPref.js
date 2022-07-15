var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var {valCookie} =require('./users');
var {LoginModel} =require('./users');

var Schema = mongoose.Schema;
var profileSchema = new Schema({
email:String,
maxIncline: Number,
weight: Number,
distancePreference: String
  
});
var ProfileModel = mongoose.model('ProfileModel', profileSchema );
router.get('/cookie',valCookie ,async function(req, res){
let {cookies}=req;
try{
let individual= await LoginModel.find({accessToken:cookies.session_id});
let findPref=await ProfileModel.findOne({email:individual[0]["email"]})
res.send({maxIncline:findPref["maxIncline"],weight:findPref["weight"],distancePreference:findPref["distancePreference"]});
} catch(err){
    console.log(err);
    res.send({error:err});
}
})
