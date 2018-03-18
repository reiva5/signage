var DB = require("./node_class/db");

var db = new DB();

var conn = db.getConnection();

console.log(conn);