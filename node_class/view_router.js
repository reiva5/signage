var express = require("express");
var router = express.Router();
var Slider = require("./slider");

router.get("/index", function(req, res){
    res.render("index")
});

router.get("/admin_dashboard", function(req, res){
    if(req.session.time_login){
        res.render("admin-table");
    } else {
        res.redirect("/view/admin");
    }
});

router.get("/admin", function(req, res) {
    if(req.session.time_login){
        res.redirect("/view/admin_dashboard");
    } else {
        res.render("admin");
    }
});

module.exports = router;