var express = require("express");
var router = express.Router();
var Playlist = require("./playlist");

router.get("/", function (req, res){
    res.json({message: "Playlist home"});
});

router.post("/insert", function(req, res){
    var playlist = new Playlist();
    console.log(req);
    playlist.addPlaylist(req.body.name).then(result =>{
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

router.get("/get", function(req, res){
    var playlist = new Playlist();
    playlist.getPlaylist(req.body.id).then( result => {
        console.log(result);
        if (result) {
            res.json({
                name : result.name,
            });
        } else {
            res.json({});
        }
        playlist.destroy();
    });
});
router.get("/get_all", function(req, res){
    var playlist = new Playlist();
    playlist.getAllPlaylist().then( result => {
        console.log(result);
        var all_playlist = [];
        result.forEach(element => {
            all_playlist.push({
                id : element.id,
                name : element.name
            });
        });
        res.json(all_playlist);
        playlist.destroy();
    });
});
router.post("/delete", function(req, res){
    var playlist = new Playlist();
    console.log(req);
    playlist.deletePlaylist(req.body.id).then(result =>{
        if(result.affectedRows > 0){
            res.json({status: "success"});
        } else {
            res.json({status: "failed"});
        }
        // playlist.destroy();
    });
});
router.post("/update", function(req, res){
    var playlist = new Playlist();
    playlist.editPlaylist(req.body.id,req.body.name).then(result =>{
        if(result.affectedRows > 0){
            res.json({status: "success"});
        } else {
            res.json({status: "failed"});
        }
        playlist.destroy();
    });
});
router.post("/update_active", function(req, res){
    var playlist = new Playlist();
    playlist.editPlaylistActive(req.body.id,req.body.active).then(result =>{
        if(result.affectedRows > 0){
            res.json({status: "success"});
        } else {
            res.json({status: "failed"});
        }
        playlist.destroy();
    });
});
module.exports = router;