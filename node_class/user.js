var DB = require("./db");
var Promise = require("promise");
var db;

var method = User.prototype;

function User(){
    this.id = null;
    this.username = null;
    this.password = null;
    db = new DB();
}

method.getUser = function(id){
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("SELECT * FROM user WHERE `user_id`=" + id, function (err, result, field){
            if (err) 
                return reject(err);
            result.forEach(element => {
                this.id = element.user_id;
                this.username = element.username;
                this.password = element.password; 
            });
            resolve(this);
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

method.editUser = function (id, username, password) {
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("UPDATE `user` SET `username` = '" + username + "', `password` = '" + password + "' WHERE `user_id` = " + id, 
            function (err, result, field){
            if (err)
                reject(err);
            resolve(result);
        });
    });
}

method.deleteUser = function (id) {
    var conn = db.getConnection();
    return new Promise( (resolve, reject) => {
        conn.query("DELETE FROM `user` WHERE `user_id`=" + id, function(err, result, field){
            if (err)
                reject(err);
            resolve(result);
        });
    });
}

module.exports = User;