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
// console.log(__dirname)
var uploadSingle = multer({dest: "./static/images/adminPic/"});//指定文件上传到哪里

var globalConfig = require("./config");
var loader = require("./loader");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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
app.get("/getAllAdmin",loader.get("/getAllAdmin")); //  后台管理页面获取所有管理员
app.get("/getAllUser",loader.get("/getAllUser")); //  后台管理页面获取所有管理员

app.get("/canDelete",loader.get("/canDelete")); //  

app.get("/getAllTeacherInfo",loader.get("/getAllTeacherInfo")); //  后台管理页面获取所有教师发布的信息
app.post("/searchTeacherInfo",loader.get("/searchTeacherInfo")); //  搜索

app.get("/getAllParentInfo",loader.get("/getAllParentInfo")); //  后台管理页面获取所有家长发布的信息
app.post("/searchParentInfo",loader.get("/searchParentInfo")); //  搜索


app.get("/adminLogout",loader.get("/adminLogout")); //  管理员退出
app.get("/deleteAdmin",loader.get("/deleteAdmin")); //  删除
app.get("/deleteUser",loader.get("/deleteUser")); //  删除

app.get("/adminDeleteTeacherInfo",loader.get("/adminDeleteTeacherInfo")); //  管理员删除教师发布的信息，实则是修改为已删除，等用户确认了之后才从数据库删除
app.get("/adminDeleteParentInfo",loader.get("/adminDeleteParentInfo"));

app.post("/adminLogin",loader.get("/adminLogin")); //  登录
app.post("/insertAdmin",loader.get("/insertAdmin")); //  插入

app.post("/searchAdmin",loader.get("/searchAdmin")); //  搜索
app.post("/searchUser",loader.get("/searchUser")); //  搜索


app.post("/insertSearchValue",loader.get("/insertSearchValue")); //  插入搜索的列表
app.post("/deleteSearchValue",loader.get("/deleteSearchValue"));
app.post("/updateSearchValue",loader.get("/updateSearchValue"));
app.post("/getSearchValue",loader.get("/getSearchValue"));

app.post("/adminChange",uploadSingle.single("file"),loader.get("/adminChange")); //  修改信息，包括图片上传

app.post("/insertUser",loader.get("/insertUser")); //  插入用户（注册）
app.post("/userLogin",loader.get("/userLogin")); //  用户登录
app.post("/getUserInfo",loader.get("/getUserInfo")); //  修改信息之前，获取用户已有的信息
app.post("/userChange",uploadSingle.single("file"),loader.get("/userChange")); // 提交用户修改的信息

app.post("/getPublishInfo",loader.get("/getPublishInfo")); //  获得大概发布的教师信息，查看时候通过，在publish页面
app.post("/deletePublishInfo",loader.get("/deletePublishInfo"));// 删除自己发布的信息

app.post("/getTeacherChangeInfo",loader.get("/getTeacherChangeInfo"));//  在修改自己发布的信息之前，获取发布的详细信息
app.post("/getParentChangeInfo",loader.get("/getParentChangeInfo"));//  在修改自己发布的信息之前，获取发布的详细信息

app.post("/parentInfoChange",loader.get("/parentInfoChange")); //  插入用户发布的寻找家教的信息到parent表 新增和修改功能
app.post("/teacherInfoChange",loader.get("/teacherInfoChange")); //  插入用户发布的当家教的信息到teacher表  新增和修改功能

app.post("/setTeacherInfoStatus",loader.get("/setTeacherInfoStatus")); //  修改审核状态
app.post("/setParentInfoStatus",loader.get("/setParentInfoStatus")); //  修改审核状态

app.get("/getSearchList",loader.get("/getSearchList"));

//前端主页面展示发布的信息
app.get("/getDisplayInfo",loader.get("/getDisplayInfo"));
app.get("/getDetailTeacherInfo",loader.get("/getDetailTeacherInfo"));
app.post("/displaySearchInfo",loader.get("/displaySearchInfo"));
app.post("/getSearchInfoList",loader.get("/getSearchInfoList"));

//统计页面
app.post("/getTotalInfo",loader.get("/getTotalInfo"));
app.get("/getAllLessonAndArea",loader.get("/getAllLessonAndArea"));
app.get("/getAllLessonAndTeachtime",loader.get("/getAllLessonAndTeachtime"));


console.log('服务已启动')

// app.get("/bg/*",function(request,response,next){//拦截器  读cookie 重定向
//     console.log(sessionStorage.adminNum);
//     if(sessionStorage.adminNum){
//         next();
//     }else{
//         response.redirect("/bgLogin");
//     }
// });

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
