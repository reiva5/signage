var DB = require("./db");
var Promise = require("promise");
var db;
var method = Playlist.prototype;
function Playlist(){
    this.id = null;
    this.name = null;
    db = new DB();
}

method.getID = function(){
    return this.id;
}
method.getName = function(){
    return this.name;
}
method.setID = function(newID){
    this.id = newID;
}
method.setName = function(newName){
    this.name = newName;
}

method.getPlaylist = function(id){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("SELECT * FROM slider_playlist WHERE `id`=" + id, function (err, result, field){
            if (err) 
                return reject(err);
            result.forEach(element => {
                this.id = element.id;
                this.name = element.name;
            });
            resolve(this);
        });
    });
}

method.addPlaylist = function(name){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("INSERT INTO `slider_playlist`(`name`) VALUES ('" + name
            + "')", function(err, result, field) {
            if (err)
                reject(err);
            resolve(result);
        })
    });
}

method.editPlaylist = function (id, name) {
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("UPDATE `slider_playlist` SET `name` = '" + name + "' WHERE `id` = " + id, 
            function (err, result, field){
            if (err)
                reject(err);
            resolve(result);
        });
    });
}
method.editPlaylistActive = function (id, active){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("UPDATE `slider_playlist` SET `active` = " + active + " WHERE `id` = " + id, 
            function (err, result, field){
            if (err)
                reject(err);
            resolve(result);
        });
    });
}
method.deletePlaylist= function (id) {
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("DELETE FROM `slider_playlist` WHERE `id`=" + id, function(err, result, field){
            if (err)
                reject(err);
            resolve(result);
        });
    });
}

method.getAllPlaylist = function(){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) =>{
        conn.query("SELECT * FROM `slider_playlist`", function(err, result, field){
            if(err)
                reject(err);
            resolve(result);
        });
    });
}

method.destroy = function(){
    db.disconnect();
}

module.exports = Playlist;