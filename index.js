var express = require('express');
var session = require('express-session');
var app = express();
var Artyom = require('./node_modules/artyom.js/build/artyom.window');


var Slider = require('./node_class/slider_router');
var Playlist = require('./node_class/playlist_router');
var User = require('./node_class/user_router');
var bodyParser = require('body-parser');
var View = require("./node_class/view_router");

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
app.post("/login", function(req, res){
    var sess = req.session;
    sess.time_login = Date.now();
    res.redirect("/view/admin_dashboard");
});

app.use("/slider", Slider);
app.use("/view", View);
app.use("/playlist", Playlist)

app.listen(3000, function(){
    console.log("Apps started on port 3000");
});