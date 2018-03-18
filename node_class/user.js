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




module.exports = User;