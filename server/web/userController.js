var userDao = require("../dao/userDao");
var url = require("url");
var utility = require("utility"); // md5加密模块
var path = new Map();

function insertUser(request, response) {
    var params = { // 获取form表单提交的账号密码 post方法需要从request的body中获取
        name: request.body.userName,
        phone: request.body.phone,
        email: request.body.email,
        password: utility.md5(request.body.password),
        create_time: request.body.createTime
    }
    // console.log(params)
    userDao.insertUser(params, function (result) {
        if (!result.sqlMessage) {
            // console.log("插入成功")
            response.send({ status: 'ok', message: "插入成功" })
        } else {
            if (result.sqlMessage.indexOf('phone_UNIQUE') > 0) { //电话号码已存在
                response.send({ status: 'fail', message: 'phoneUn' })
            } else {
                console.log(result)
            }
        }
    })
}

function userLogin(request, response) {
    var params = { // 获取form表单提交的账号密码 post方法需要从request的body中获取
        phone: request.body.phone,
        password: request.body.password
    }
    // console.log(params)
    userDao.queryUserByPhone(params, function (result) {
        // console.log(result[0].password)
        if (result && result.length > 0 && result[0].password == utility.md5(params.password)) {
            response.send({ status: 'ok', userName: result[0].name, userPhone: result[0].phone, userPic: result[0].pic_path, userId: result[0].id, userEmail: result[0].email })
        } else {
            response.send({ status: 'fail' })
        }
    })
}

function getUserInfo(request, response) {
    var params = { phone: request.body.phone };
    userDao.queryUserByPhone(params, function (result) {
        response.send(result);
    })
}

function userChange(request, response) {
    // console.log(request.file.originalname);//原来的文件名和后缀
    // console.log(request.file.mimetype.indexOf('image') == 0);//  限制上传的文件必须是image类型
    if (request.file == null || request.file.mimetype.indexOf('image') != 0) {
        var picName = null;
        var picSize = null;
        var picPath = null;
    } else {
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
        phone: request.body.phone,
        email: request.body.email,
        password: request.body.password,
        pic_name: picName,
        pic_size: picSize,
        pic_path: picPath
    }
    // console.log(params)
    userDao.userChange(params, function (result) {
        if (!result.sqlMessage) {
            // console.log("插入成功")
            response.send({ status: 'ok', message: "修改成功" })
        } else {
            if (result.sqlMessage.indexOf('phone_UNIQUE') > 0) { //电话号码已存在
                response.send({ status: 'fail', message: 'phoneUn' })
            }
        }
    })
}

function teacherInfoChange(request, response) {
    var params = [ // 获取form表单提交的账号密码 post方法需要从request的body中获取
        request.body.teacher_id,
        request.body.name,
        request.body.phone,
        request.body.email,
        request.body.card,
        request.body.pic_path,
        request.body.sex,
        request.body.graduated,
        request.body.education,
        request.body.teachage,
        request.body.teacherjob,
        request.body.teachlesson,
        request.body.teachtime,
        request.body.teachtimedis,
        request.body.price,
        request.body.teacharea,
        request.body.areadis,
        request.body.description,
        request.body.createTime,
        request.body.flag,
    ];
    var type = request.body.type;
    var id = request.body.id;
    // console.log(type)
    userDao.teacherInfoChange(params,type,id, function (result) {
        response.send({ status: 'ok', message: "插入成功" })
    })
}

function getPublishInfo(request, response) {
    var params = {
        phone: request.body.phone,
        teacherCurrentPage:request.body.teacherCurrentPage,
        parentCurrentPage:request.body.parentCurrentPage,
    }
    userDao.getPublishInfo(params, function (result) {
        response.send({ status: 'ok', result })
    })
}

function deletePublishInfo(request, response) {
    var params = {
        id:request.body.id,
        teacher_id:request.body.teacher_id,
        parent_id:request.body.parent_id,
    };
    userDao.deletePublishInfo(params, function (result) {
        response.send({ status: 'ok' })
    })
}

function getTeacherChangeInfo(request, response) {
    var id = request.body.id
    userDao.getTeacherChangeInfo(id, function (result) {
        response.send({ status: 'ok', result })
    })
}

function parentInfoChange(request, response) {
    var params = [ // 获取form表单提交的账号密码 post方法需要从request的body中获取
        request.body.parent_id,
        request.body.name,
        request.body.phone,
        request.body.email,
        request.body.pic_path,
        request.body.sex,
        request.body.education,
        request.body.teachage,
        request.body.teacherjob,
        request.body.teachlesson,
        request.body.teachtime,
        request.body.teachtimedis,
        request.body.price,
        request.body.teacharea,
        request.body.areadis,
        request.body.description,
        request.body.createTime,
        request.body.flag,
    ];
    var type = request.body.type;
    var id = request.body.id;
    // console.log(type)
    userDao.parentInfoChange(params,type,id, function (result) {
        response.send({ status: 'ok', message: "插入成功" })
    })
}

function getParentChangeInfo(request, response) {
    var id = request.body.id
    userDao.getParentChangeInfo(id, function (result) {
        response.send({ status: 'ok', result })
    })
}

path.set("/insertUser", insertUser);
path.set("/userLogin", userLogin);
path.set("/getUserInfo", getUserInfo);
path.set("/userChange", userChange);
path.set("/teacherInfoChange", teacherInfoChange);
path.set("/getPublishInfo", getPublishInfo);
path.set("/deletePublishInfo", deletePublishInfo);
path.set("/getTeacherChangeInfo", getTeacherChangeInfo);
path.set("/parentInfoChange", parentInfoChange);
path.set("/getParentChangeInfo", getParentChangeInfo);

module.exports.path = path;