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
    });
    slider.destroy();
});

module.exports = router;