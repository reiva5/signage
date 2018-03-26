var express = require("express");
var router = express.Router();
var Slider = require("./slider");

router.get("/", function(req, res){
    var slider = new Slider();
    slider.getAllSlider().then(result => {
        var array_slider = [];
        result.forEach(element =>{
            if (element.slider_id != null){
                array_slider.push({
                    slider_name : element.slider_name,
                    slider_content : element.slider_content
                });
            }
        });
        slider.destroy();
        res.render("index", {sliders: array_slider});
    });
});

router.get("/admin_dashboard", function(req, res){
    if (req.session.time_login){
        var slider = new Slider();
        slider.getAllSlider().then(result => {
            var array_slider = [];
            var curr_playlist_id = 0;
            var curr_playlist_name = "";
            var playlist_array = []
            result.forEach(element => {
                if (curr_playlist_id != element.id) {
                    if (curr_playlist_name != ""){
                        array_slider.push({
                            playlist_id : curr_playlist_id,
                            playlist_name : curr_playlist_name,
                            content : playlist_array
                        });
                    }
                    curr_playlist_id = element.id;
                    curr_playlist_name = element.name;
                    playlist_array = []
                }
                if (element.playlist_id != null){
                    playlist_array.push({
                        slider_id : element.slider_id,
                        playlist_id : element.id,
                        slider_name : element.slider_name,
                        slider_content : element.slider_content 
                    });
                }
            });
            if (curr_playlist_name != ""){
                array_slider.push({
                    playlist_id : curr_playlist_id,
                    playlist_name : curr_playlist_name,
                    content : playlist_array
                });
            }
            slider.destroy();
            res.render("admin-table", {playlists: array_slider});
        });
    } else {
        res.redirect("admin");
    } 
});

router.get("/admin", function(req, res) {
    if(req.session.time_login){
        res.redirect("admin_dashboard");
    } else {
        res.render("admin");
    }
});

router.get("/edit_slider", function(req, res){
    var slider = new Slider();
    slider.getSlider(req.query.id).then(result => {
        slider.destroy();
        if (result != null){
            res.render("edit_slider", {slider : result, mode : "edit", id : req.query.id});
        } else {
            res.redirect("admin_dashboard");
        }
    });
})

router.get("/add_slider", function(req, res){
    res.render("edit_slider", {slider : null, mode : "add", id : req.query.id});
})
module.exports = router;