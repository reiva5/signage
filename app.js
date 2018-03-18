var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

var cors = require('cors');


app.listen(3000);
console.log('Listening to 3000 ...');
console.log(__dirname);

// use it before all route definitions
app.use(cors({origin: '*'}));

var con = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  database  : 'signage',
  user     : 'root',
  password : 'Hwhrskxk1!'
});

con.connect(function(err) {
if (err) {
  console.error('Database connection failed: ' + err.stack);
  return;
}});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function(req,res) {
  res.sendFile('index.html', { root: __dirname });
});

app.post('/retrieve', function(req,res) {
  var data = req.body;
  
  console.log(data);
  var statement = "SELECT * FROM user";
  // var value_inserted = data.noreg;
  
  con.query(statement, function (err, result) {
    if (err) {
      res.json(err);
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});



module.exports = app;