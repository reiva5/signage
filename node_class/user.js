var DB = require("./db");
var Promise = require("promise");
var db;

var method = User.prototype;

function User(){
    this.username = null;
    this.password = null;
    db = new DB();
}

method.getUsername = function(){
    return this.username;
}

method.getPassword = function(){
    return this.password;
}

method.getUser = function(username){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("SELECT * FROM user WHERE `username`='" +username + "' LIMIT 1", function (err, result, field){
            if (err) 
                return reject(err);
            if (result.length > 0){
                result.forEach(element => {
                    this.username = element.username;
                    this.password = element.password; 
                });
                resolve(this);
            } else {
                resolve(null);
            }
        });
    });
}

method.addUser = function(username, password){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("INSERT INTO `user`(`username`, `password`) VALUES ('" + username 
            + "', '" + password + "')", function(err, result, field) {
            if (err)
                reject(err);
            resolve(result);
        })
    });
}

method.editUser = function (old_user, username, password) {
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("UPDATE `user` SET `username` = '" + username + "', `password` = '" + password + "' WHERE `username` = '" + old_user + "'", 
            function (err, result, field){
            if (err)
                reject(err);
            resolve(result);
        });
    });
}

method.deleteUser = function (username) {
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("DELETE FROM `user` WHERE `username`='" + username + "'", function(err, result, field){
            if (err)
                reject(err);
            resolve(result);
        });
    });
}

method.getAllUser = function(){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) =>{
        conn.query("SELECT * FROM `user`", function(err, result, field){
            if(err)
                reject(err);
            resolve(result);
        });
    });
}

method.destroy = function(){
    db.disconnect();
}

module.exports = User;