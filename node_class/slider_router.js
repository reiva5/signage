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

module.exports = router;