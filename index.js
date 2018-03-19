var express = require('express');
var session = require('express-session');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(session({secret: 'super secret session'}));
app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/admin_dashboard", function(req, res){
    if(req.session.time_login){
        res.sendFile(__dirname + "/public/admin-table.html");
    } else {
        res.redirect("/admin");
    }
});

app.get("/admin", function(req, res) {
    if(req.session.time_login){
        res.redirect("/admin_dashboard");
    } else {
        res.sendFile(__dirname + "/public/admin.html");
    }
});

app.post("/login", function(req, res){
    var sess = req.session;
    sess.time_login = Date.now();
    res.redirect("/admin_dashboard");
});

app.listen(3000, function(){
    console.log("Apps started on port 3000");
});