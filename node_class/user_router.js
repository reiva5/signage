var express = require("express");
var router = express.Router();
var User = require("./user");

router.get("/", function (req, res){
    res.json({message: "User home"});
});

router.post("/insert", function(req, res){
    var user = new User();
    user.addUser(req.query.username, req.query.password).then(result =>{
        if(result.affectedRows > 0){
            res.json({status: "success"});
        } else {
            res.json({status: "error"});
        }
        user.destroy();
    });
});

router.get("/get", function(req, res){
    var user = new User();
    user.getUser(req.query.username).then( result => {
        if (result) {
            res.json({
                username : result.username,
                password : result.password
            });
        } else {
            res.json({});
        }
        user.destroy();
    });
});

router.post("/edit", function(req, res){
    var user = new User();
    var old_user = req.query.old_user;
    var new_user = req.query.new_user;
    var password = req.query.password;
    user.editUser(old_user, new_user, password).then(result => {
        if (result.affectedRows > 0){
            res.json({status : "success"});
        } else {
            res.json({status : "failed"});
        }
        user.destroy();
    })
});

module.exports = router;