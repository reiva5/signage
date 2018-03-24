var express = require("express");
var router = express.Router();
var User = require("./user");

router.get("/", function (req, res){
    res.json({message: "User home"});
});

router.post("/insert", function(req, res){
    var user = new User();
    user.addUser(req.body.username, req.body.password).then(result =>{
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
    user.getUser(req.body.username).then( result => {
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
    var old_user = req.body.old_user;
    var new_user = req.body.new_user;
    var password = req.body.password;
    user.editUser(old_user, new_user, password).then(result => {
        if (result.affectedRows > 0){
            res.json({status : "success"});
        } else {
            res.json({status : "failed"});
        }
        user.destroy();
    })
});

router.post("/delete", function(req, res){
    var user = new User();
    user.deleteUser(req.body.username).then(result =>{
        if (result.affectedRows > 0){
            res.json({status : "success"});
        } else {
            res.json({status : "failed"});
        }
        user.destroy();
    });
});

router.get("/get_all", function(req, res){
    var user = new User();
    user.getAllUser().then(result => {
        var user_array = [];
        result.forEach(element => {
            user_array.push({
                username : element.username,
                password : element.password
            });
        });
        res.json(user_array);
        user.destroy();
    });
});

module.exports = router;