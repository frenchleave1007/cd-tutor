var uploadPicDao = require("../dao/uploadPicDao");
var path = new Map();

function uploadAdminPic(request, response){
    // response.end("finish");
    // console.log(request.file.mimeType);
    // console.log(request.file.originalname);//原来的文件名和后缀
    // console.log(request.file.size);//文件大小
    // console.log(request.file.path);//存储的地址
    uploadPicDao.insertAdminPic(phone,request.file.originalname,request.file.size,request.file.path,function(result){
        console.log("上传完成");
        response.end(request.file.path);
    })
}

path.set("/uploadAdminPic",uploadAdminPic);

module.exports.path = path;

