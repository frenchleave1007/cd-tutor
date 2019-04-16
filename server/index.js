// var express = require("express");
// var globalConfig = require("./config");
// var loader = require("./loader");
// var cookie = require("cookie-parser");//解析cookie
// var multer = require("multer");//上传文件

// var app = new express();

// var uploadSingle = multer({dest: "./TestExpress/file/"});//指定文件上传到哪里

// app.use(express.static(__dirname + "/" +globalConfig["page_path"]));//规定静态文件的地址
// app.use(cookie());


// app.get("/api/*",function(request,response,next){//拦截器  读cookie 重定向
//     console.log(request.cookies.id);
//     if(request.cookies.id){
//         next();
//     }else{
//         response.redirect("/login.html");
//     }
// });

// app.get("/api/getAllStudent",loader.get("/api/getAllStudent")); //get请求
// app.get("/api/addStudent",loader.get("/api/addStudent"));
// app.get("/login",loader.get("/login"));
// app.post("/upload",uploadSingle.single("file"),loader.get("/upload"));//single规定那个字段表示文件
// app.get("/getPic",loader.get("/getPic"));

// app.listen(globalConfig["port"]);

