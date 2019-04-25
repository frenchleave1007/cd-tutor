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

function teacherInfoChange(params, type, id, success) {
    var sql = "";
    if (type == 'add') {
        sql = "insert into teacher (teacher_id,name,phone,email,card,pic_path,sex,graduated,education,teachage,teacherjob,teachlesson,teachtime,teachtimedis,price,teacharea,areadis,description,create_time,flag) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    } else if (type == 'update') {
        sql = "update teacher set teacher_id = ?,name = ?,phone = ?,email = ?,card = ?,pic_path = ?,sex = ?,graduated = ?,education = ?,teachage = ?,teacherjob = ?,teachlesson = ?,teachtime = ?,teachtimedis = ?,price = ?,teacharea = ?,areadis = ?,description = ?,create_time = ?,flag = ? where id = " + id + ";";
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

function parentInfoChange(params, type, id, success) {
    var sql = "";
    if (type == 'add') {
        sql = "insert into parent (parent_id,name,phone,email,pic_path,sex,education,teachage,teacherjob,teachlesson,teachtime,teachtimedis,price,teacharea,areadis,description,create_time,flag) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    } else if (type == 'update') {
        sql = "update parent set parent_id = ?,name = ?,phone = ?,email = ?,pic_path = ?,sex = ?,education = ?,teachage = ?,teacherjob = ?,teachlesson = ?,teachtime = ?,teachtimedis = ?,price = ?,teacharea = ?,areadis = ?,description = ?,create_time = ?,flag = ? where id = " + id + ";";
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

function getAllUser(currentPage, success) {
    var page = (currentPage - 1) * 8
    var querySql = "select count(*) from user;select * from user limit " + page + ",8;";
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

function deleteUser(id, success) {
    var deleteSql = "delete from user where id = ?;";
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

function searchUser(params, success) {
    console.log(params)
    // var paramsArr = [params.adminName,params.adminNum,params.adminPhone];
    var searchSql = "";
    var page = (params.currentPage - 1) * 8
    if (params.userName != '' && params.userPhone != '') {
        searchSql = "select count(*) from user where name like '%" + params.userName + "%' and phone like '%" + params.userPhone + "%';\
                    select * from user where name like '%" + params.userName + "%' and phone like '%" + params.userPhone + "%' limit " + page + ",8;";
    } else if (params.userName != '') {
        searchSql = "select count(*) from user where name like '%" + params.userName + "%';\
                    select * from user where name like '%" + params.userName + "%' limit " + page + ",8;";
    } else if (params.userPhone != '') {
        searchSql = "select count(*) from user where phone like '%" + params.userPhone + "%';\
                    select * from user where phone like '%" + params.userPhone + "%' limit " + page + ",8;";
    } else {
        searchSql = "select count(*) from user;\
                    select * from user limit "+ page + ",8;";
    }
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(searchSql, function (error, result) {
        if (error == null) {
            // console.log(result)
            success(result);
        } else {
            console.log(error);
            // throw new Error("")
        }
    });
    connection.end();//关闭连接
}

function getAllTeacherInfo(currentPage, success) {
    var page = (currentPage - 1) * 8
    var querySql = "select count(*) from teacher where flag <> '已删除';select * from teacher where flag <> '已删除' limit " + page + ",8;";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(querySql, function (error, result) {
        if (error == null) {
            // console.log(result);
            // console.log(result.length)
            success(result);
        } else {
            // throw new Error("error");
            console.log(error)
        }
    });
    connection.end();//关闭连接
}

function searchTeacherInfo(params, success) {
    // console.log(params)
    // var paramsArr = [params.adminName,params.adminNum,params.adminPhone];
    var searchSql = "";
    var page = (params.currentPage - 1) * 8
    if (params.teacherName != '' && params.create_time != '' && params.teacherPhone != '') {
        searchSql = "select count(*) from teacher where flag <> '已删除' and name like '%" + params.teacherName + "%'  and create_time like '%" + params.create_time + "%' and phone like '%" + params.teacherPhone + "%';\
                    select * from teacher where flag <> '已删除' and name like '%" + params.teacherName + "%'  and create_time like '%" + params.create_time + "%' and phone like '%" + params.teacherPhone + "%' limit " + page + ",8;";
    } else if (params.teacherName != '' && params.create_time != '') {
        searchSql = "select count(*) from teacher where flag <> '已删除' and name like '%" + params.teacherName + "%'  and create_time like '%" + params.create_time + "%';\
                    select * from teacher where flag <> '已删除' and name like '%" + params.teacherName + "%'  and create_time like '%" + params.create_time + "%' limit " + page + ",8;";
    } else if (params.teacherName != '' && params.teacherPhone != '') {
        searchSql = "select count(*) from teacher where flag <> '已删除' and name like '%" + params.teacherName + "%' and phone like '%" + params.teacherPhone + "%';\
                    select * from teacher where flag <> '已删除' and name like '%" + params.teacherName + "%' and phone like '%" + params.teacherPhone + "%' limit " + page + ",8;";
    } else if (params.create_time != '' && params.teacherPhone != '') {
        searchSql = "select count(*) from teacher where flag <> '已删除' and create_time like '%" + params.create_time + "%' and phone like '%" + params.teacherPhone + "%';\
                    select * from teacher where flag <> '已删除' and create_time like '%" + params.create_time + "%' and phone like '%" + params.teacherPhone + "%' limit " + page + ",8;";
    } else if (params.teacherName != '') {
        searchSql = "select count(*) from teacher where flag <> '已删除' and name like '%" + params.teacherName + "%';\
                     select * from teacher where flag <> '已删除' and name like '%" + params.teacherName + "%' limit " + page + ",8;";
    } else if (params.create_time != '') {
        searchSql = "select count(*) from teacher where flag <> '已删除' and create_time like '%" + params.create_time + "%';\
                    select * from teacher where flag <> '已删除' and create_time like '%" + params.create_time + "%' limit " + page + ",8;";
    } else if (params.teacherPhone != '') {
        searchSql = "select count(*) from teacher where flag <> '已删除' and phone like '%" + params.teacherPhone + "%';\
                    select * from teacher where flag <> '已删除' and phone like '%" + params.teacherPhone + "%' limit " + page + ",8;";
    } else {
        searchSql = "select count(*) from teacher where flag <> '已删除';\
                    select * from teacher where flag <> '已删除' limit "+ page + ",8;";
    }
    // console.log(searchSql)
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(searchSql, function (error, result) {
        if (error == null) {
            // console.log(result)
            success(result);
        } else {
            console.log(error);
            // throw new Error("")
        }
    });
    connection.end();//关闭连接
}

function adminDeleteTeacherInfo(id, success) {
    var sql = "update teacher set flag = '已删除' where id = " + id + ";";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(sql, function (error, result) {
        if (error == null) {
            console.log(result);
            // console.log(result.length)
            success(result);
        } else {
            // throw new Error("error");
            console.log(error)
        }
    });
    connection.end();//关闭连接
}

function setTeacherInfoStatus(params, success) {
    var sql = "update teacher set flag = ?, errmsg = ? where id = ?;";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(sql, params, function (error, result) {
        if (error == null) {
            // console.log(result);
            // console.log(result.length)
            success(result);
        } else {
            // throw new Error("error");
            console.log(error)
        }
    });
    connection.end();//关闭连接
}

function canDelete(id, success) {
    var sql = "select * from teacher where teacher_id = " + id + ";select * from parent where parent_id = " + id + ";";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(sql, function (error, result) {
        if (error == null) {
            console.log(result);
            // console.log(result.length)
            success(result);
        } else {
            // throw new Error("error");
            console.log(error)
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
    "parentInfoChange": parentInfoChange,
    "getParentChangeInfo": getParentChangeInfo,
    "getAllUser": getAllUser,
    "deleteUser": deleteUser,
    "searchUser": searchUser,
    "getAllTeacherInfo": getAllTeacherInfo,
    "searchTeacherInfo": searchTeacherInfo,
    "adminDeleteTeacherInfo": adminDeleteTeacherInfo,
    "setTeacherInfoStatus": setTeacherInfoStatus,
    "canDelete": canDelete
}