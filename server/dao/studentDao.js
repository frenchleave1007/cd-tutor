var dbutil = require("./dbutil");

function insertStudent(stuNum,name,age,stuClass,pwd,success){
    var insertSql = "insert into student (stu_num,name,age,class,pwd) values (?,?,?,?,?);";
    var params = [stuNum,name,age,stuClass,pwd];
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            // console.log(result);
            success(result);
        }else{
            throw new Error("error");
            // console.log("error")
        }
    });
    connection.end();//关闭连接
}

function queryAllStudent (success){
    var querySql = "select * from student;";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(querySql,function(error,result){
        if(error == null){
            // console.log(result);
            success(result);
        }else{
            throw new Error("error");
        }
    });
    connection.end();//关闭连接
}
// queryAllStudent();

function queryStudentByClassAndAge (classNum,age){
    var queryParams = [classNum,age]
    var querySql = "select * from student where class = ? and age = ?";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(querySql,queryParams,function(error,result){
        if(error == null){
            console.log(result);
        }else{
            // console.log(error)
            throw new Error("error");
        }
    });
    connection.end();//关闭连接
}
// queryStudentByClassAndAge(3,81);
function queryStudentByStuNum(stuNum,success){
    var querySql = "select * from student where stu_num = ?";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(querySql,stuNum,function(error,result){
        if(error == null){
            // console.log(result);
            success(result);
        }else{
            throw new Error("error");
        }
    });
    connection.end();//关闭连接
}
module.exports = {
    "queryAllStudent":queryAllStudent,//函数后面不能有括号
    "queryStudentByClassAndAge":queryStudentByClassAndAge,
    "queryStudentByStuNum":queryStudentByStuNum,
    "insertStudent":insertStudent
};