var fileListDao = require("../dao/fileListDao");
var path = new Map();

function upload(request, response){
    // response.end("finish");
    // console.log(request.file.mimeType);
    // console.log(request.file.originalname);//原来的文件名和后缀
    // console.log(request.file.size);//文件大小
    // console.log(request.file.path);//存储的地址
    fileListDao.insertFileList(request.file.originalname,request.file.size,request.file.path,request.cookies.id,function(result){
        console.log("上传完成");
        response.end(request.file.path);
    })
}

path.set("/upload",upload);

module.exports.path = path;

