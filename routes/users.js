var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var loginSchema = new Schema({
  userName: String,
  userPass: String,
  accessToken: String
});
var LoginModel = mongoose.model('LoginModel', loginSchema );

let user="userName";
let pass="userPass";


function valCookie(req,res,next){
    const {cookies}=req;
    if ("session_id" in cookies){
        console.log("session_id exists");
        next();
    } else{
        console.log("your mom2");
        res.status(403).send({"msg":"no session present"});
}
}

/* GET users listing. Initial Login */ 
router.put('/cookie', function(req, res, next) {
  let curr=req.body[user];
  LoginModel.find({accessToken:curr}).then(arr=>{
    if (arr.length!==0){
        const test = arr[0][user];
        res.cookie("session_id", "123456");
        res.send(getReturnHelper(0,test,arr[0],"")).status(304);
    }else{
        res.send(getReturnHelper(1,"","")).status(403);
    }
  });
});

router.get('/cookie',valCookie ,function(req, res) {
  const {cookies}=req;
  LoginModel.find({accessToken:cookies.session_id}).then(ref=>{
    if (ref.length!==0){
        console.log(ref[0][user]);
        res.status(200).send({[user]:ref[0][user]});
    }else{
        console.log("your mom1");
        res.status(403).send({"msg":"cookie not valid"});
    }
  })
});



function getReturnHelper(stat,payload,token){
    return {"status":stat,"userName":payload,"accessToken":token};
}

/* GET users listing. */
router.put('/', function(req, res, next) {
    let name=req.body[user];
    LoginModel.find({userName:name}).then((arr)=>{
        if (arr.length!==0){
            console.log(arr[0]);
            console.log(req.body[pass]);
            if (arr[0][pass]===req.body[pass]){
                res.cookie("session_id", "123456").send(getReturnHelper(0,name,arr[0]["accessToken"]));
            } else{
                res.send(getReturnHelper(2,"",""));
                return;
            }
        }
        else {
            res.send(getReturnHelper(1,"",""));
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
            const test = new LoginModel({ userName: name,userPass:req.body[pass],accessToken:"123456" });
            test.save().then(stuff=>{
                res.send(getReturnHelper(0,name,"123456"));
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
