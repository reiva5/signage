var express = require("express");
var router = express.Router();
var Slider = require("./slider");

router.get("/get", function(req, res){
    var slider = new Slider();
    slider.getSlider(req.body.slider_id).then(result => {
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
    slider.getSliderByPlaylist(req.body.playlist_id).then(result => {
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
router.get("/get_all",function(req,res){
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
        res.json(array_slider);
        slider.destroy();
    });
});
router.post("/insert",function(req,res){
    var slider = new Slider();
    slider.addSlider(req.body.playlist_id,req.body.slider_name,req.body.slider_content).then(result=>{
        if(result.affectedRows > 0){
            res.json({
                status : "success",
                id : result.insertId
            });
        } else {
            res.json({status: "error"});
        }
        playlist.destroy();
    });
});
router.post("/update_name",function(req,res){
    var slider = new Slider();
    slider.editSliderName(req.body.slider_id,req.body.slider_name).then(result=>{
        if(result.affectedRows > 0){
            res.json({status: "success"});
        } else {
            res.json({status: "failed"});
        }
        playlist.destroy();
    });
});
router.post("/update_playlist",function(req,res){
    var slider = new Slider();
    slider.editSliderPlaylistID(req.body.slider_id,req.body.playlist_id).then(result=>{
        if(result.affectedRows > 0){
            res.json({status: "success"});
        } else {
            res.json({status: "failed"});
        }
        playlist.destroy();
    });
});
router.post("/update_content",function(req,res){
    var slider = new Slider();
    slider.editSliderContent(req.body.slider_id,req.body.slider_content).then(result=>{
        if(result.affectedRows > 0){
            res.json({status: "success"});
        } else {
            res.json({status: "failed"});
        }
        playlist.destroy();
    });
});
router.post("/delete",function(req,res){
    var slider = new Slider();
    slider.deleteSlider(req.body.slider_id).then(result=>{
        if(result.affectedRows > 0){
            res.json({status: "success"});
        } else {
            res.json({status: "failed"});
        }
        playlist.destroy();
    });
});

router.post("/add", function(req, res){
    var slider = new Slider();
    var playlist_id = req.body.playlist_id;
    var slider_name = req.body.slider_name;
    var slider_content = req.body.slider_content;
    slider.addSlider(playlist_id, slider_name, slider_content).then(result => {
        if(result.affectedRows > 0){
            res.json({ status: "success"});
        } else {
            res.json({ status: "failed"});
        }
        slider.destroy();
    });
});

router.post("/voice_query", function(req, res){
    var slider = new Slider();
    var message = req.body.message;
    var session = req.body.session;
    slider.voiceQuery(message, session);
});

module.exports = router;