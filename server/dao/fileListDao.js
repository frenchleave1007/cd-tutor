var dbutil = require("./dbutil");

function insertFileList(fileName,fileSize,filePath,stuNum,success){
    var insertSql = "insert into file_list (file_name,file_size,file_path,stu_num) values (?,?,?,?);";
    var params = [fileName,fileSize,filePath,stuNum];
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
    "insertFileList":insertFileList
};