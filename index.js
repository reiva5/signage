var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(session({secret: 'super secret session'}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    console.log("Waktunya adalah: " + req.session.time_login);
    if(req.session.time_login){
        res.redirect("/admin_dashboard");
    } else {
        console.log("askdjfhsakldfhsakljfhsladkfh");
        res.sendFile(__dirname + "/public/admin.html");
    }
});

app.post("/login", function(req, res){
    console.log("Bismilllah");
    if (req.body.username == "jehian" && req.body.password == "12345"){
        var sess = req.session;
        console.log("udah lewat sini");
        sess.time_login = Date.now();
        res.send('valid');
    } else {
        res.send('failed');
    }
});

app.listen(3000, function(){
    console.log("Apps started on port 3000");
});