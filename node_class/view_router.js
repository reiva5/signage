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
            var curr_playlist_id = 1;
            var playlist_array = []
            result.forEach(element => {
                if (curr_playlist_id != element.playlist_id) {
                    array_slider.push({
                        playlist_id : curr_playlist_id,
                        content : playlist_array
                    });
                    playlist_array = []
                    curr_playlist_id += 1;
                }
                playlist_array.push({
                    slider_id : element.slider_id,
                    playlist_id : element.playlist_id,
                    slider_name : element.slider_name,
                    slider_content : element.slider_content 
                });
            });
            array_slider.push({
                playlist_id : curr_playlist_id,
                content : playlist_array
            });
            res.render("admin-table", {playlists: array_slider});
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