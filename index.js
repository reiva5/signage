var express = require('express');
var session = require('express-session');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(session({secret: 'super secret session'}));

app.get("/", function(req, res){
    res.render("index.html");
});

app.post("\login", function(req, res){
    var sess = req.session;
    sess.time_login = new Date.now();
    res.render("admin-table.html");
})
app.listen(3000, function(){
    console.log("Apps started on port 3000");
});