var express = require('express');
var router = express.Router();
var fs = require('fs');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var loginSchema = new Schema({
  name: String,
  password: String
});

function initial(user,pass){
    var LoginModel = mongoose.model('LoginModel', loginSchema );
    const test = new LoginModel({ name: user,password:pass });
    test.save().then(stuff=>{
        console.log(stuff);
    })
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


function getReturnHelper(stat,payload){
    return {"status":stat,"userName":payload};
}
/* GET users listing. */
router.put('/', function(req, res, next) {
    let user="userName";
    let pass="userPass";
    var currentFile=JSON.parse(fs.readFileSync("tempcred.json"));
    for (let i=0;i<currentFile.length;i++){
        if (req.body[user]===currentFile[i][user]){
            if (req.body[pass]===currentFile[i][pass]){
                res.send(getReturnHelper(0,req.body[user]));
                return;
            }else{
                res.send(getReturnHelper(2,""));
                return;
            }
        }
    }
    res.send(getReturnHelper(1,""));
        return;
});

router.post('/', function(req, res, next) {
    let user="userName";
    let pass="userPass";
    let name=req.body[user];
    var currentFile=JSON.parse(fs.readFileSync("tempcred.json"));
    for (let i=0;i<currentFile.length;i++){
        if (name===currentFile[i][user]){
                res.send(getReturnHelper(1,""));
                return;
    }
}   
    // currentFile.push({"userName":name,"userPass":req.body[pass]});
    // fs.writeFileSync("tempcred.json",JSON.stringify(currentFile));
    initial(name,req.body[pass]);
    res.send(getReturnHelper(0,name));
    return;
});

module.exports = router;
