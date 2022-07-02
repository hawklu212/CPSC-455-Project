var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
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
        if (cookies.session_id===""){
        res.status(403).send({"msg":"no session present"});
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
  });
});

/*persistent login verification*/
router.get('/cookie',valCookie ,function(req, res) {
  const {cookies}=req;
  LoginModel.find({accessToken:cookies.session_id}).then(ref=>{
    if (ref.length!==0){
        res.status(200).send({[user]:ref[0][user]});
    }else{
        res.status(403).send({"msg":"cookie not valid"});
    }
  })
});



function getReturnHelper(stat,payload,token){
    return {"status":stat,"userName":payload,"accessToken":token};
}

/* GET users listing. first new login login.js*/
router.put('/', function(req, res, next) {
    let name=req.body[user];
    LoginModel.find({userName:name}).then((arr)=>{
        if (arr.length!==0){
            if (arr[0][pass]===req.body[pass]){
                let uuid=uuidv4();
                LoginModel.findOneAndUpdate({[user]:name},{"accessToken":`${uuid}`},{new: true}).then((newStuff)=>{
                console.log(`this is newStuff: ${newStuff}`);
                res.cookie("session_id", `${newStuff["accessToken"]}`).send(getReturnHelper(0,name,newStuff["accessToken"]));
            });
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

/* initial signup.js*/
router.post('/', function(req, res, next) {
    let name=req.body[user];
    var LoginModel = mongoose.model('LoginModel', loginSchema );
    LoginModel.find({userName:name}).then((arr)=>{
        if (arr.length==0){
            let uuid=uuidv4();
            const test = new LoginModel({ userName: name,userPass:req.body[pass],accessToken:`${uuid}`});
            test.save().then(stuff=>{
                res.send(getReturnHelper(0,name,`${uuid}`));
                console.log(`signup ${stuff}`);
            })
        }
        else {
            res.send(getReturnHelper(1,""));
        }
    })
    return;
});

module.exports = router;
