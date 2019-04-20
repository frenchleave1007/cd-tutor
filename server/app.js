var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require("express-session");

var bodyParser = require('body-parser');//解析,用req.body获取post参数
    

var url = require("url");//解析url为对象
var querystring = require('querystring');//解析如‘a=1&b=2’为对象



var multer = require("multer");//上传文件

var uploadSingle = multer({dest: "../static/images/uploadPic/"});//指定文件上传到哪里

var globalConfig = require("./config");
var loader = require("./loader");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');

var app = new express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',ejs.__express);//规定解析views下面的文件用什么引擎

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(session({ //使用session
  secret: 'this is the secret for cookie',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge:60*60*24
  }
}));

// app.get("/getAllStudent",loader.get("/getAllStudent")); //get请求
app.get("/getAllAdmin",loader.get("/getAllAdmin")); //get请求
app.get("/adminLogout",loader.get("/adminLogout")); //get请求
app.get("/deleteAdmin",loader.get("/deleteAdmin")); //get请求


app.post("/adminLogin",loader.get("/adminLogin")); //post请求
app.post("/insertAdmin",loader.get("/insertAdmin")); //post请求
app.post("/searchAdmin",loader.get("/searchAdmin")); //post请求

console.log('服务已启动')


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;