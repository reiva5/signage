var express = require("express");
var router = express.Router();
var Slider = require("./slider");

router.get("/get", function(req, res){
    var slider = new Slider();
    slider.getSlider(req.query.id).then(result => {
        if (result) {
            res.json({
                slider_id : result.slider_id,
                playlist_id : result.playlist_id,
                slider_name : result.slider_name,
                slider_content : result.slider_content 
            });
        } else {
            res.json({});
        }
        slider.destroy();
    });

});

router.get("/get_by_playlist", function(req, res){
    var slider = new Slider();
    slider.getSliderByPlaylist(req.query.id).then(result => {
        var array_slider = [];
        result.forEach(element => {
            array_slider.push({
                slider_id : element.slider_id,
                playlist_id : element.playlist_id,
                slider_name : element.slider_name,
                slider_content : element.slider_content 
            });
        });
        res.json(array_slider);
        slider.destroy();
    });
});

router.post("/add", function(req, res){
    var slider = new Slider();
    var playlist_id = req.query.playlist_id;
    var slider_name = req.query.slider_name;
    var slider_content = req.query.slider_content;
    slider.addSlider(playlist_id, slider_name, slider_content).then(result => {
        if(result.affectedRows > 0){
            res.json({ status: "success"});
        } else {
            res.json({ status: "failed"});
        }
        slider.destroy();
    });
});

module.exports = router;