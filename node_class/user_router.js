var express = require("express");
var router = express.Router();
var User = require("./user");

router.get("/", function (req, res){
    res.json({message: "User home"});
});

router.post("/insert", function(req, res){
    console.log(req.query.username);
    var user = new User();
    user.addUser(req.query.username, req.query.password).then(result =>{
        if(result.affectedRows > 0){
            res.json({status: "success"});
        } else {
            res.json({status: "error"});
        }
    })
});

module.exports = router;