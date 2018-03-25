var express = require('express');
var session = require('express-session');
var app = express();
<<<<<<< HEAD
var Slider = require('./node_class/slider_router');
var Playlist = require('./node_class/playlist_router');
var User = require('./node_class/playlist_router');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
=======
var Slider = require("./node_class/slider_router");
var Playlist = require("./node_class/playlist_router");
>>>>>>> edit-delete

app.set('views', __dirname + '/views');
app.set("view engine", "pug")
app.engine('html', require('ejs').renderFile);
app.use(session({
    secret: 'super secret session',
    name : 'signage-cookie',
    resave : true,
    saveUninitialized : true
}));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/render", function(req, res){
    res.render("index")
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

app.use("/slider", Slider);
app.use("/playlist", Playlist);

app.listen(3000, function(){
    console.log("Apps started on port 3000");
});