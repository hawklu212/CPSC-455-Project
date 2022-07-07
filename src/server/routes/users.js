var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var {validate} = require("email-validator");
const { v4: uuidv4 } = require('uuid');
var Schema = mongoose.Schema;
var loginSchema = new Schema({
  email:String,
  userName: String,
  userPass: String,
  accessToken: String,
  verified: Boolean
});
var LoginModel = mongoose.model('LoginModel', loginSchema );

let user="userName";
let pass="userPass";
let email="email";
let verificationCode="verificationCode";


function valCookie(req,res,next){
    const {cookies}=req;
    if ("session_id" in cookies){
        console.log("session_id exists");
        if (cookies.session_id===""){
        res.status(403).send({"msg":"no session present"});
        return
        }else{
        next();
        }
    } else{
        res.status(403).send({"msg":"no session present"});
}
}

/* GET users listing. First New Login/signup Verification MainContainer.js */ 
router.put('/cookie', function(req, res, next) {
  let curr=req.body[user];
  LoginModel.find({accessToken:curr}).then(arr=>{
    if (arr.length!==0){
        const test = arr[0][user];
        console.log(`first login ${arr[0]}`);
        res.cookie("session_id", `${curr}`);
        res.send(getReturnHelper(0,test,arr[0],"")).status(304);
    }else{
        res.send(getReturnHelper(1,"","")).status(403);
    }
  }).catch((error)=>{
    res.send({"error":error});
    return;
  });
});

/*persistent login verification*/
router.get('/cookie',valCookie ,function(req, res) {
  const {cookies}=req;
  LoginModel.find({accessToken:cookies.session_id}).then(ref=>{
    if (ref.length!==0){
        res.status(200).send({[user]:ref[0][user]});
    }else{
        res.cookie("session_id", "").status(403).send({"msg":"cookie not valid"});
    }
  }).catch((error)=>{
    res.send({"error":error});
    return;
  })
});

/*logout verification*/
router.put('/cookie/logout',valCookie , async function(req, res) {
    const {cookies}=req;
    let newLog;
    try{
    newLog=await LoginModel.findOneAndUpdate({"accessToken":cookies.session_id},{"accessToken":""},{new: true});
    } catch (error){
    res.send({"error":error});
    return;
    }
    console.log("made it here");
    res.cookie("session_id","").send({});
});



function getReturnHelper(stat,payload,token){
    return {"status":stat,"userName":payload,"accessToken":token};
}

/* PUT users listing. first new loginCurl login.js , error 1 is bad user, error 2 is bad password, error 3 is not verified*/
router.put('/', function(req, res, next) {
    let email=req.body["email"];
    LoginModel.find({email:email}).then((arr)=>{
        if (arr.length!==0){
            if (arr[0][pass]===req.body[pass]){
                if (arr[0]["verified"]===false){
                    res.send(getReturnHelper(3,"",""));
                    return;
                }
                console.log("inside verified");
                let uuid=uuidv4();
                LoginModel.findOneAndUpdate({email:email},{"accessToken":`${uuid}`},{new: true}).then((newStuff)=>{
                res.cookie("session_id", `${newStuff["accessToken"]}`).send(getReturnHelper(0,newStuff[user],newStuff["accessToken"]));
            }).catch((error)=>{
            res.send({"error":error})});
            return;
            
        } else{
                res.send(getReturnHelper(2,"",""));
                return;
            }
        }
        else {
            res.send(getReturnHelper(1,"",""));
            return;
        }
    }).catch((error)=>{
    res.send({"error":error})});
        return;
      }) 

/* initial signup.js signupCurl error 1:email aready exists, error 2:email is not valid*/
router.post('/', function(req, res, next) {
    let email=req.body["email"];
    var LoginModel = mongoose.model('LoginModel', loginSchema );
    LoginModel.find({email:email}).then((arr)=>{
        if(!validate(email)){
            res.send(getReturnHelper(1,email,"",""));
            return;
        }
        if (arr.length==0){
            let uuid=uuidv4();
            const test = new LoginModel({ email:email,userName: req.body[user],userPass:req.body[pass],accessToken:`${uuid}`,verified:false});
            test.save().then(stuff=>{
                res.send(getReturnHelper(0,email,""));
            }).catch((error)=>{
            res.send({"error":error})});
            return;
        }
        else {
            res.send(getReturnHelper(2,"",""));
        }
    }).catch((error)=>{
    res.send({"error":error})});
    return;
});


/* PUT users listing. first new verification , error 1 is bad user, error 2 is bad password, error 3 is not verified*/
router.put('/verify', function(req, res, next) {
    let ver=req.body[verificationCode];
    let mail=req.body[email];
    LoginModel.find({email:mail}).then((arr)=>{
        if (arr.length!==0){
            if (arr[0]["accessToken"]===ver){
                LoginModel.findOneAndUpdate({email:mail},{verified:true},{new: true}).then((newStuff)=>{
                res.cookie("session_id", `${newStuff["accessToken"]}`).send(getReturnHelper(0,mail,newStuff["accessToken"]));
            }).catch((error)=>{
            res.send({"error":error})});
            return;
            
        } else{
                res.send(getReturnHelper(2,"",""));
                return;
            }
        }
        else {
            res.send(getReturnHelper(1,"",""));
            return;
        }
    }).catch((error)=>{
    res.send({"error":error})});
        return;
      })

module.exports = router;
