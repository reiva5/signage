var mysql = require('mysql');
var conn;

var method = DB.prototype;
function DB(){
    conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
    });

    conn.connect(function(err){
        if (err) throw err;
        console.log("Connected to database"); 
    });
}

method.getConnection = function(){
    return conn;
}

module.exports = DB;