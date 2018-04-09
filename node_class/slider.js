var DB = require("./db");
var Promise = require("promise");
var db;
var method = Slider.prototype;
var request = require('request');

function Slider(){
    this.slider_id = null;
    this.playlist_id = null;
    this.slider_name = null;
    this.slider_content = null
    this.dialog_flow_access_token = '3db08300491841ad95a8acd25a8910b8';
    db = new DB();
}

method.getSliderID = function(){
    return this.slider_id;
}
method.getPlaylistID = function(){
    return this.playlist_id;
}
method.getSliderName = function(){
    return this.slider_name;
}
method.getSliderContent = function(){
    return this.slider_content;
}

method.getSlider= function(id){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("SELECT * FROM slider_content WHERE `slider_id`=" + id, function (err, result, field){
            if (err) 
                return reject(err);
            result.forEach(element => {
                this.slider_id = element.slider_id;
                this.playlist_id = element.playlist_id;
                this.slider_name = element.slider_name;
                this.slider_content = element.slider_content;
            });
            resolve(this);
        });
    });
}

method.getSliderByPlaylist =  function(playlist_id) {
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("SELECT * FROM slider_content WHERE `playlist_id`=" + playlist_id, function (err, result, field){
            if (err) 
                return reject(err);
            resolve(result);
        });
    });
}

method.addSlider = function(playlist_id,slider_name,slider_content){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("INSERT INTO `slider_content`(`playlist_id`,`slider_name`,`slider_content`) VALUES ('" + playlist_id
            + "', '" + slider_name + "', '" + slider_content + "')", function(err, result, field) {
            if (err)
                reject(err);
            resolve(result);
        })
    });
}

method.editSliderName = function (id, name) {
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("UPDATE `slider_content` SET `slider_name` = '" + name + "' WHERE `slider_id` = " + id, 
            function (err, result, field){
            if (err)
                reject(err);
            resolve(result);
        });
    });
}

method.editSliderContent = function (id, content) {
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("UPDATE `slider_content` SET `slider_content` = '" + content + "' WHERE `slider_id` = " + id, 
            function (err, result, field){
            if (err)
                reject(err);
            resolve(result);
        });
    });
}
method.editSliderPlaylistID = function(id, playlist_id){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("UPDATE `slider_content` SET `playlist_id` = '" + playlist_id + "' WHERE `slider_id` = " + id, 
            function (err, result, field){
            if (err)
                reject(err);
            resolve(result);
        });
    });
}
method.deleteSlider= function (id) {
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("DELETE FROM `slider_content` WHERE `slider_id`=" + id, function(err, result, field){
            if (err)
                reject(err);
            resolve(result);
        });
    });
}

method.getAllSlider = function(){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) =>{
        conn.query("SELECT * FROM `slider_playlist` LEFT OUTER JOIN `slider_content` ON `slider_playlist`.`id` = `slider_content`.`playlist_id` ORDER BY `id`", function(err, result, field){
            if(err)
                reject(err);
            resolve(result);
        });
    });
}
method.getSliderbyActive = function(){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) =>{
        conn.query("SELECT * FROM `slider_playlist` LEFT OUTER JOIN `slider_content` ON `slider_playlist`.`id` = `slider_content`.`playlist_id` WHERE `active` = 1 ORDER BY `playlist_id`", function(err, result, field){
            if(err)
                reject(err);
            resolve(result);
        });
    });
}

method.voiceQuery = function(message, session) {
    var requestJSON = 
    {originalRequest: 
        {data: {exampleMessage: 'Signage'}}, 
        query: message, 
        lang: 'id-ID', 
        sessionId: session
    };

    request({
        url : 'https://api.dialogflow.com/v1/query?v=20150910',
        method : 'POST',
        data: JSON.stringify(
                {originalRequest: 
                    {data: {exampleMessage: 'Signage'}}, 
                    query: message, 
                    lang: 'id-ID', 
                    sessionId: session
                }),
        json : true,
        headers: {
            'Authorization': 'BEARER ' + this.dialog_flow_access_token,   //If your header name has spaces or any other char not appropriate
            'Content-Type' : 'application/json'  //for object property name, use quoted notation shown in second
        },
        dataType: 'json'
    , function(response) {
        console.log(respone);
    }})
}

method.destroy = function(){
    db.disconnect();
}

module.exports = Slider;