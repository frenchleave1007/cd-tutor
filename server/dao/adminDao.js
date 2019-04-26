var dbutil = require("./dbutil");

function queryAllAdmin(currentPage,success) {
    var page = (currentPage - 1) * 8
    var querySql = "select count(*) from admin;select * from admin limit "+ page +",8;";
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

function queryAdminByPhone(params, success) {
    var phone = params.phone;
    console.log(phone)
    var querySql = "select * from admin where phone = ?;";
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


function insertAdmin(params, success) {
    // console.log(params.isSuper + '------------')
    var insertSql = "insert into admin (name,admin_num,phone,password,creater_name,creater_num,create_time,super) values (?,?,?,?,?,?,?,?);";
    var paramsArr = [params.name, params.adminNum, params.phone, params.password, params.createrName, params.createrNum, params.createTime,params.isSuper];
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

function deleteAdmin(id, success) {
    var deleteSql = "delete from admin where id = ?;";
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

function searchAdmin(params, success) {
    console.log(params)
    // var paramsArr = [params.adminName,params.adminNum,params.adminPhone];
    var searchSql = "";
    var page = (params.currentPage - 1) * 8 
    if (params.adminName != '' && params.adminNum != '' && params.adminPhone != '') {
        searchSql = "select count(*) from admin where name like '%" + params.adminName + "%'  or admin_num like '%" + params.adminNum + "%' or phone like '%" + params.adminPhone + "%';\
                    select * from admin where name like '%" + params.adminName + "%'  or admin_num like '%" + params.adminNum + "%' or phone like '%" + params.adminPhone + "%' limit "+page+",8;";
    } else if (params.adminName != '' && params.adminNum != '') {
        searchSql = "select count(*) from admin where name like '%" + params.adminName + "%'  or admin_num like '%" + params.adminNum + "%';\
                    select * from admin where name like '%" + params.adminName + "%'  or admin_num like '%" + params.adminNum + "%' limit "+page+",8;";
    } else if (params.adminName != '' && params.adminPhone != '') {
        searchSql = "select count(*) from admin where name like '%" + params.adminName + "%' or phone like '%" + params.adminPhone + "%';\
                    select * from admin where name like '%" + params.adminName + "%' or phone like '%" + params.adminPhone + "%' limit "+page+",8;";
    } else if (params.adminNum != '' && params.adminPhone != '') {
        searchSql = "select count(*) from admin where admin_num like '%" + params.adminNum + "%' or phone like '%" + params.adminPhone + "%';\
                    select * from admin where admin_num like '%" + params.adminNum + "%' or phone like '%" + params.adminPhone + "%' limit "+page+",8;";
    } else if (params.adminName != '') {
        searchSql = "select count(*) from admin where name like '%" + params.adminName + "%';\
                     select * from admin where name like '%" + params.adminName + "%' limit "+page+",8;";
    } else if (params.adminNum != '') {
        searchSql = "select count(*) from admin where admin_num like '%" + params.adminNum + "%';\
                    select * from admin where admin_num like '%" + params.adminNum + "%' limit "+page+",8;";
    } else if (params.adminPhone != '') {
        searchSql = "select count(*) from admin where phone like '%" + params.adminPhone + "%';\
                    select * from admin where phone like '%" + params.adminPhone + "%' limit "+page+",8;";
    } else {
        searchSql = "select count(*) from admin;\
                    select * from admin limit "+page+",8;";
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
            // console.log(result)
            success(result);
        } else {
            console.log(error);
            // throw new Error("")
        }
    });
    connection.end();//关闭连接
}

function adminChange(params, success){
    // console.log(params)
    var paramsArr = [params.name,params.admin_num,params.phone,params.change_time,params.pic_name,params.pic_size,params.pic_path,params.id]
    var updateSql = "update admin set name = ?, admin_num = ?, phone = ?, change_time = ?, pic_name = ?, pic_size = ?, pic_path = ? where id = ?;";
    var connection = dbutil.createConnection();
    connection.connect();//创建一个连接
    connection.query(updateSql, paramsArr, function (error, result) {
        if (error == null) {
            success(result);
            // console.log(result)
        } else {
            // console.log(error);
            success(error)
            // throw new Error("删除出错")
        }
    });
    connection.end();//关闭连接
}

module.exports = {
    "queryAllAdmin": queryAllAdmin,
    "insertAdmin": insertAdmin,
    "queryAdminByPhone": queryAdminByPhone,
    "deleteAdmin": deleteAdmin,
    "searchAdmin": searchAdmin,
    "adminChange": adminChange,
}