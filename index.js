var express = require('express');
var session = require('express-session');
var app = express();
var Slider = require("./node_class/slider_router");
var View = require("./node_class/view_router")

app.set('views', __dirname + '/views');
app.set("view engine", "pug")
app.use(session({
    secret: 'super secret session',
    name : 'signage-cookie',
    resave : true,
    saveUninitialized : true
}));
app.use(express.static('public'));

app.get("/", function(req, res){
    res.redirect("/view/index");
});

app.post("/login", function(req, res){
    var sess = req.session;
    sess.time_login = Date.now();
    res.redirect("/view/admin_dashboard");
});

app.use("/slider", Slider);
app.use("/view", View);

app.listen(3000, function(){
    console.log("Apps started on port 3000");
});