var adminDao = require("../dao/adminDao");
var url = require("url");
var utility = require("utility"); // md5加密模块
var path = new Map();


function getAllAdmin(request, response) {
    var params = url.parse(request.url, true).query;
    var currentPage = params.currentPage
    adminDao.queryAllAdmin(currentPage, function (result) {
        for (var i = 0; i < result[1].length; i++) { // 移除密码和不需要的属性，不返回给前端
            delete result[1][i].password;
            delete result[1][i].pic_name;
            delete result[1][i].pic_size;
        }
        response.send(result);
    })
}

function adminLogin(request, response) {
    // var params = url.parse(request.url,true).query;
    // var params = request.body
    var params = { // 获取form表单提交的账号密码 post方法需要从request的body中获取
        phone: request.body.phone,
        password: request.body.password
    }
    // console.log(params)
    adminDao.queryAdminByPhone(params, function (result) {
        // console.log(result[0].password)
        if (result && result.length > 0 && result[0].password == utility.md5(params.password)) {
            //登录成功
            // response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            // response.write(JSON.stringify(result[0].name));
            // console.log(session)
            // console.log(request)
            // console.log('-----------------')
            // request.session.username = 'zhangsan';
            // console.log(request.session.cookie)

            // response.cookie("admin_num", result[0].admin_num)

            response.send({ status: 'ok', adminNum: result[0].admin_num, adminName: result[0].name })
        } else {
            response.send({ status: 'fail' })
        }
        // response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        // response.write(JSON.stringify(result));
        // response.end();
    })
}

function adminLogout(request, response) {
    // response.cookie("admin_num", '', {maxAge:-1});
    response.send({ status: 'ok', url: '/bgLogin' });
    // res.clearCookie('admin_num')
    // console.log(request.cookie.admin_num)
}

function insertAdmin(request, response) {
    var params = { // 获取form表单提交的账号密码 post方法需要从request的body中获取
        name: request.body.name,
        adminNum: request.body.adminNum,
        phone: request.body.phone,
        password: utility.md5(request.body.password),
        createrName: request.body.createrName,
        createrNum: request.body.createrNum,
        createTime: request.body.createTime
    }
    adminDao.insertAdmin(params, function (result) {
        if (!result.sqlMessage) {
            // console.log("插入成功")
            response.send({ status: 'ok', message: "插入成功" })
        } else {
            if (result.sqlMessage.indexOf('phone_UNIQUE') > 0) { //电话号码已存在
                response.send({ status: 'fail', message: 'phoneUn' })
            } else if (result.sqlMessage.indexOf('admin_num_UNIQUE') > 0) { //管理员编号已存在
                response.send({ status: 'fail', message: 'adminNumUn' })
            }
        }
    })
}

function deleteAdmin(request, response) {
    var params = url.parse(request.url, true).query;
    var id = params.id
    adminDao.deleteAdmin(id, function (result) {
        response.send({ status: 'ok' })
    })
}

function searchAdmin(request, response) {
    var params = { // 获取搜索框中的 名字 编号 电话
        adminName: request.body.adminName,
        adminNum: request.body.adminNum,
        adminPhone: request.body.adminPhone,
        currentPage: request.body.currentPage
    }
    adminDao.searchAdmin(params, function (result) {
        if (result[1].length == 0) {
            response.send({ status: 'fail' })
        } else {
            for (var i = 0; i < result[1].length; i++) { // 移除密码和不需要的属性，不返回给前端
                delete result[1][i].password;
                delete result[1][i].pic_name;
                delete result[1][i].pic_size;
            }
            response.send({ status: 'ok', result: result });
        }
    })
}

function adminChange(request, response) {
    // console.log(request.file.originalname);//原来的文件名和后缀
    // console.log(request.file.mimetype.indexOf('image') == 0);//  限制上传的文件必须是image类型
    if(request.file == null || request.file.mimetype.indexOf('image') != 0){
        var picName = null;
        var picSize = null;
        var picPath = null;
    }else{
        var picName = request.file.originalname;
        var picSize = request.file.size;
        var picPath = request.file.path;
    }
    // console.log(request.file.size);//文件大小
    // console.log(request.file.path);//存储的地址
    // console.log(request.body.id)

    var params = {
        id: request.body.id,
        name: request.body.name,
        admin_num: request.body.admin_num,
        phone: request.body.phone,
        change_time: request.body.change_time,
        pic_name: picName,
        pic_size: picSize,
        pic_path: picPath
    }
    // console.log(params)
    adminDao.adminChange(params, function (result) {
        if (!result.sqlMessage) {
            // console.log("插入成功")
            response.send({ status: 'ok', message: "插入成功" })
        } else {
            if (result.sqlMessage.indexOf('phone_UNIQUE') > 0) { //电话号码已存在
                response.send({ status: 'fail', message: 'phoneUn' })
            } else if (result.sqlMessage.indexOf('admin_num_UNIQUE') > 0) { //管理员编号已存在
                response.send({ status: 'fail', message: 'adminNumUn' })
            }
        }
    })
}

path.set("/getAllAdmin", getAllAdmin);
path.set("/adminLogin", adminLogin);
path.set("/adminLogout", adminLogout);
path.set("/insertAdmin", insertAdmin);
path.set("/deleteAdmin", deleteAdmin);
path.set("/searchAdmin", searchAdmin);
path.set("/adminChange", adminChange);

module.exports.path = path;