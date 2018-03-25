var mysql = require('mysql');
var conn;

var method = DB.prototype;
function DB(){
    conn = mysql.createConnection({
        host: "phpmyadmin.ctbm9xc1oi6i.ap-southeast-1.rds.amazonaws.com",
        user: "phpmyadmin",
        password: "phpmyadmin",
        database: "signage"
    });

    conn.connect(function(err){
        if (err) throw err;
        console.log("Connected to database"); 
    });
}

method.getConnection = function(){
    return conn;
}

method.disconnect = function(){
    conn.end(function(err) {
        if (err) throw err;
        console.log("Disconnected from database");
    })
}

module.exports = DB;