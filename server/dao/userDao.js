var dbutil = require("./dbutil");

function insertUser(params, success) {
    var insertSql = "insert into user (name,phone,email,password,create_time) values (?,?,?,?,?);";
    var paramsArr = [params.name, params.phone, params.email, params.password, params.create_time];
    // console.log(params)
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(insertSql, paramsArr, function (error, result) {
        if (error == null) {
            // console.log(result);
            success(result);
        } else {
            success(error);
        }
    });
    connection.end();//关闭连接
}

function queryUserByPhone(params, success) {
    var phone = params.phone;
    // console.log(phone)
    var querySql = "select * from user where phone = ?;";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(querySql, phone, function (error, result) {
        if (error == null) {
            // console.log(result);
            success(result);
        } else {
            throw new Error("error");
        }
    });
    connection.end();//关闭连接
}

function userChange(params, success) {
    // console.log(params)
    var paramsArr = [params.name, params.phone, params.email, params.password, params.pic_name, params.pic_size, params.pic_path, params.id]
    var updateSql = "update user set name = ?, phone = ?, email = ?, password = ?, pic_name = ?, pic_size = ?, pic_path = ? where id = ?;";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(updateSql, paramsArr, function (error, result) {
        if (error == null) {
            success(result);
            // console.log(result)
        } else {
            // console.log(error);
            success(error)
        }
    });
    connection.end();//关闭连接
}

function teacherInfoChange(params,type,id, success) {
    var sql = "";
    if(type == 'add'){
        sql = "insert into teacher (teacher_id,name,phone,email,card,pic_path,sex,graduated,education,teachage,teacherjob,teachlesson,teachtime,teachtimedis,price,teacharea,areadis,description,create_time,flag) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    }else if(type == 'update'){
        sql = "update teacher set teacher_id = ?,name = ?,phone = ?,email = ?,card = ?,pic_path = ?,sex = ?,graduated = ?,education = ?,teachage = ?,teacherjob = ?,teachlesson = ?,teachtime = ?,teachtimedis = ?,price = ?,teacharea = ?,areadis = ?,description = ?,create_time = ?,flag = ? where id = "+ id +";";
    }
    // console.log(params)
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(sql, params, function (error, result) {
        if (error == null) {
            // console.log(result);
            success(result);
        } else {
            // success(error);
            console.log(error)
        }
    });
    connection.end();//关闭连接
}

function getPublishInfo(params, success) {
    var teacherCurrentPage = (params.teacherCurrentPage - 1) * 10;
    var parentCurrentPage = (params.parentCurrentPage - 1) * 10;
    var querySql = "select count(*) from teacher where phone =" + params.phone + " ;select * from teacher where phone =" + params.phone + "  limit " + teacherCurrentPage + ",10;\
    select count(*) from parent where phone =" + params.phone + " ;select * from parent where phone =" + params.phone + "  limit " + parentCurrentPage + ",10;";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(querySql, function (error, result) {
        if (error == null) {
            // console.log(result);
            // console.log(result.length)
            success(result);
        } else {
            throw new Error("error");
        }
    });
    connection.end();//关闭连接
}

function deletePublishInfo(params, success) {
    // console.log(params.parent_id == undefined)
    var deleteSql = "";
    var id;
    if (params.parent_id == undefined) {
        deleteSql = "delete from teacher where id = ?;";
        id = params.id;
    } else if (params.teacher_id == undefined) {
        deleteSql = "delete from parent where id = ?;";
        id = params.id;
    }
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(deleteSql, id, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            // console.log(error);
            throw new Error("删除出错")
        }
    });
    connection.end();//关闭连接
}

function getTeacherChangeInfo(id, success) {
    var querySql = "select * from teacher where id = ?;";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(querySql, id, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error("error");
        }
    });
    connection.end();//关闭连接
}

function parentInfoChange(params,type,id, success) {
    var sql = "";
    if(type == 'add'){
        sql = "insert into parent (parent_id,name,phone,email,pic_path,sex,education,teachage,teacherjob,teachlesson,teachtime,teachtimedis,price,teacharea,areadis,description,create_time,flag) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    }else if(type == 'update'){
        sql = "update parent set parent_id = ?,name = ?,phone = ?,email = ?,pic_path = ?,sex = ?,education = ?,teachage = ?,teacherjob = ?,teachlesson = ?,teachtime = ?,teachtimedis = ?,price = ?,teacharea = ?,areadis = ?,description = ?,create_time = ?,flag = ? where id = "+ id +";";
    }
    // console.log(params)
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(sql, params, function (error, result) {
        if (error == null) {
            // console.log(result);
            success(result);
        } else {
            // success(error);
            console.log(error)
        }
    });
    connection.end();//关闭连接
}

function getParentChangeInfo(id, success) {
    var querySql = "select * from parent where id = ?;";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(querySql, id, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error("error");
        }
    });
    connection.end();//关闭连接
}

function searchAdmin(params, success) {
    console.log(params)
    // var paramsArr = [params.adminName,params.adminNum,params.adminPhone];
    var searchSql = "";
    var page = (params.currentPage - 1) * 8
    if (params.adminName != '' && params.adminNum != '' && params.adminPhone != '') {
        searchSql = "select count(*) from admin where name like '%" + params.adminName + "%'  or admin_num like '%" + params.adminNum + "%' or phone like '%" + params.adminPhone + "%';\
                    select * from admin where name like '%" + params.adminName + "%'  or admin_num like '%" + params.adminNum + "%' or phone like '%" + params.adminPhone + "%' limit " + page + ",8;";
    } else if (params.adminName != '' && params.adminNum != '') {
        searchSql = "select count(*) from admin where name like '%" + params.adminName + "%'  or admin_num like '%" + params.adminNum + "%';\
                    select * from admin where name like '%" + params.adminName + "%'  or admin_num like '%" + params.adminNum + "%' limit " + page + ",8;";
    } else if (params.adminName != '' && params.adminPhone != '') {
        searchSql = "select count(*) from admin where name like '%" + params.adminName + "%' or phone like '%" + params.adminPhone + "%';\
                    select * from admin where name like '%" + params.adminName + "%' or phone like '%" + params.adminPhone + "%' limit " + page + ",8;";
    } else if (params.adminNum != '' && params.adminPhone != '') {
        searchSql = "select count(*) from admin where admin_num like '%" + params.adminNum + "%' or phone like '%" + params.adminPhone + "%';\
                    select * from admin where admin_num like '%" + params.adminNum + "%' or phone like '%" + params.adminPhone + "%' limit " + page + ",8;";
    } else if (params.adminName != '') {
        searchSql = "select count(*) from admin where name like '%" + params.adminName + "%';\
                     select * from admin where name like '%" + params.adminName + "%' limit " + page + ",8;";
    } else if (params.adminNum != '') {
        searchSql = "select count(*) from admin where admin_num like '%" + params.adminNum + "%';\
                    select * from admin where admin_num like '%" + params.adminNum + "%' limit " + page + ",8;";
    } else if (params.adminPhone != '') {
        searchSql = "select count(*) from admin where phone like '%" + params.adminPhone + "%';\
                    select * from admin where phone like '%" + params.adminPhone + "%' limit " + page + ",8;";
    } else {
        searchSql = "select count(*) from admin;\
                    select * from admin limit "+ page + ",8;";
    }

    // console.log(params.adminName == '' && params.adminNum == '' && params.adminPhone == '')
    // if(params.adminName == '' && params.adminNum == '' && params.adminPhone == ''){
    //     searchSql = "select * from admin;";
    //     paramsArr = [];
    // }else if(params.adminName == '' && params.adminNum == ''){
    //     searchSql = "select * from admin where phone = ?;";
    //     paramsArr = [params.adminPhone];
    // }else if(params.adminName == '' && params.adminPhone == ''){
    //     searchSql = "select * from admin where admin_num = ?;";
    //     paramsArr = [params.adminNum];
    // }else if(params.adminNum == '' && params.adminPhone == ''){
    //     paramsArr = [params.adminName];
    //     searchSql = "select * from admin where name like '%"+params.adminName+"%';";
    // }else if(params.adminName == ''){
    //     searchSql = "select * from admin where admin_num = ? and phone = ?;";
    //     paramsArr = [params.adminNum,params.adminPhone];
    // }else if(params.adminNum == ''){
    //     searchSql = "select * from admin where name = ? and phone = ?;";
    //     paramsArr = [params.adminName,params.adminPhone];
    // }else if(params.adminPhone == ''){
    //     searchSql = "select * from admin where name = ? and admin_num = ?;";
    //     paramsArr = [params.adminName,params.adminNum];
    // }else{
    //     searchSql = "select * from admin where name = ? and admin_num = ? and phone = ?;";
    //     paramsArr = [params.adminName,params.adminNum,params.adminPhone];
    // }
    // console.log(searchSql)
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(searchSql, function (error, result) {
        if (error == null) {
            console.log(result)
            success(result);
        } else {
            console.log(error);
            // throw new Error("")
        }
    });
    connection.end();//关闭连接
}

module.exports = {
    "insertUser": insertUser,
    "queryUserByPhone": queryUserByPhone,
    "userChange": userChange,
    "teacherInfoChange": teacherInfoChange,
    "getPublishInfo": getPublishInfo,
    "deletePublishInfo": deletePublishInfo,
    "getTeacherChangeInfo": getTeacherChangeInfo,
    "parentInfoChange":parentInfoChange,
    "getParentChangeInfo":getParentChangeInfo
}