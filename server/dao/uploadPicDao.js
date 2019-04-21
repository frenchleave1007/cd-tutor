var dbutil = require("./dbutil");

function insertAdminPic(phone,fileName,fileSize,filePath,success){
    var insertSql = "insert into admin_pic (phone,pic_name,pic_size,pic_path) values (?,?,?,?);";
    var params = [phone,fileName,fileSize,filePath];
    // console.log(params);
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            // console.log(result+"--------------------");
            success(result);
        }else{
            throw new Error("error");
            // console.log("error")
        }
    });
    connection.end();//关闭连接
}



module.exports = {
    "insertAdminPic":insertAdminPic
};