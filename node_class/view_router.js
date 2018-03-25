var express = require("express");
var router = express.Router();
var Slider = require("./slider");

router.get("/index", function(req, res){
    res.render("index")
});

router.get("/admin_dashboard", function(req, res){
    if (req.session.time_login){
        var slider = new Slider();
        slider.getAllSlider().then(result => {
            var array_slider = [];
            result.forEach(element => {
                array_slider.push({
                    slider_id : element.slider_id,
                    playlist_id : element.playlist_id,
                    slider_name : element.slider_name,
                    slider_content : element.slider_content 
                });
            });
            res.render("admin-table", array_slider);
        });
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