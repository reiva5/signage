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

module.exports = User;