var express = require('express');
var router = express.Router();
var fs = require('fs');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var loginSchema = new Schema({
  userName: String,
  userPass: String
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


function getReturnHelper(stat,payload){
    return {"status":stat,"userName":payload};
}

let user="userName";
let pass="userPass";

/* GET users listing. */
router.put('/', function(req, res, next) {
    let name=req.body[user];
    var LoginModel = mongoose.model('LoginModel', loginSchema );
    LoginModel.find({userName:name}).then((arr)=>{
        if (arr.length!==0){
            console.log(arr[0]);
            console.log(req.body[pass]);
            if (arr[0][pass]===req.body[pass]){
                res.send(getReturnHelper(0,name));
            } else{
                res.send(getReturnHelper(2,""));
                return;
            }
        }
        else {
            res.send(getReturnHelper(1,""));
            return;
        }
    })
        return;
});

router.post('/', function(req, res, next) {
    let name=req.body[user];
    var LoginModel = mongoose.model('LoginModel', loginSchema );
    LoginModel.find({userName:name}).then((arr)=>{
        if (arr.length==0){
            const test = new LoginModel({ userName: name,userPass:req.body[pass] });
            test.save().then(stuff=>{
                res.send(getReturnHelper(0,name));
                console.log(stuff);
            })
        }
        else {
            res.send(getReturnHelper(1,""));
        }
    })
    return;
});

module.exports = router;
