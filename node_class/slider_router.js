var express = require("express");
var router = express.Router();
var Slider = require("./slider");

router.get("/get", function(req, res){
    var slider = new Slider();
    slider.getSlider(req.query.slider_id).then(result => {
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
    slider.getSliderByPlaylist(req.query.playlist_id).then(result => {
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
    slider.addSlider(req.query.playlist_id,req.query.slider_name,req.query.slider_content).then(result=>{
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
    slider.editSliderName(req.query.slider_id,req.query.slider_name).then(result=>{
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
    slider.editSliderPlaylistID(req.query.slider_id,req.query.playlist_id).then(result=>{
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
    slider.editSliderContent(req.query.slider_id,req.query.slider_content).then(result=>{
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
    slider.deleteSlider(req.query.slider_id).then(result=>{
        if(result.affectedRows > 0){
            res.json({status: "success"});
        } else {
            res.json({status: "failed"});
        }
        playlist.destroy();
    });
});

module.exports = router;