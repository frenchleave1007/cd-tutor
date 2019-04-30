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
        request.body.honor,
        request.body.teachage,
        request.body.teacherjob,
        request.body.teachlesson,
        request.body.teachtime1,
        request.body.teachtime2,
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
    userDao.teacherInfoChange(params, type, id, function (result) {
        response.send({ status: 'ok', message: "插入成功" })
    })
}

function getPublishInfo(request, response) {
    var params = {
        phone: request.body.phone,
        teacherCurrentPage: request.body.teacherCurrentPage,
        parentCurrentPage: request.body.parentCurrentPage,
    }
    userDao.getPublishInfo(params, function (result) {
        response.send({ status: 'ok', result })
    })
}

function deletePublishInfo(request, response) {
    var params = {
        id: request.body.id,
        teacher_id: request.body.teacher_id,
        parent_id: request.body.parent_id,
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
        request.body.teachtime1,
        request.body.teachtime2,
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
    userDao.parentInfoChange(params, type, id, function (result) {
        response.send({ status: 'ok', message: "插入成功" })
    })
}

function getParentChangeInfo(request, response) {
    var id = request.body.id
    userDao.getParentChangeInfo(id, function (result) {
        response.send({ status: 'ok', result })
    })
}

function getAllUser(request, response) {
    var params = url.parse(request.url, true).query;
    var currentPage = params.currentPage
    userDao.getAllUser(currentPage, function (result) {
        for (var i = 0; i < result[1].length; i++) { // 移除密码和不需要的属性，不返回给前端
            delete result[1][i].password;
            delete result[1][i].pic_name;
            delete result[1][i].pic_size;
        }
        response.send(result);
    })
}

function deleteUser(request, response) {
    var params = url.parse(request.url, true).query;
    var id = params.id
    userDao.deleteUser(id, function (result) {
        response.send({ status: 'ok' })
    })
}

function searchUser(request, response) {
    var params = { // 获取搜索框中的 名字 编号 电话
        userName: request.body.userName,
        userPhone: request.body.userPhone,
        currentPage: request.body.currentPage
    }
    userDao.searchUser(params, function (result) {
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

function getAllTeacherInfo(request, response) {
    var params = url.parse(request.url, true).query;
    var currentPage = params.currentPage
    userDao.getAllTeacherInfo(currentPage, function (result) {
        response.send(result);
    })
}

function searchTeacherInfo(request, response) {
    var params = {
        teacherName: request.body.teacherName,
        teacherPhone: request.body.teacherPhone,
        create_time: request.body.create_time,
        currentPage: request.body.currentPage
    }
    userDao.searchTeacherInfo(params, function (result) {
        if (result[1].length == 0) {
            response.send({ status: 'fail' })
        } else {
            response.send({ status: 'ok', result: result });
        }
    })
}

function adminDeleteTeacherInfo(request, response) {
    var params = url.parse(request.url, true).query;
    var id = params.id
    userDao.adminDeleteTeacherInfo(id, function (result) {
        response.send({ status: 'ok', result });
    })
}

function setTeacherInfoStatus(request, response) {
    var params = [
        request.body.flag,
        request.body.errmsg,
        request.body.id
    ]
    userDao.setTeacherInfoStatus(params, function (result) {
        response.send({ status: 'ok', result: result });
    })
}

function canDelete(request, response) {
    var params = url.parse(request.url, true).query;
    var id = params.id
    userDao.canDelete(id, function (result) {
        response.send({ status: 'ok', result });
    })
}

function getAllParentInfo(request, response) {
    var params = url.parse(request.url, true).query;
    var currentPage = params.currentPage
    userDao.getAllParentInfo(currentPage, function (result) {
        response.send(result);
    })
}

function searchParentInfo(request, response) {
    var params = {
        parentName: request.body.parentName,
        parentPhone: request.body.parentPhone,
        create_time: request.body.create_time,
        currentPage: request.body.currentPage
    }
    userDao.searchParentInfo(params, function (result) {
        if (result[1].length == 0) {
            response.send({ status: 'fail' })
        } else {
            response.send({ status: 'ok', result: result });
        }
    })
}

function adminDeleteParentInfo(request, response) {
    var params = url.parse(request.url, true).query;
    var id = params.id
    userDao.adminDeleteParentInfo(id, function (result) {
        response.send({ status: 'ok', result });
    })
}

function setParentInfoStatus(request, response) {
    var params = [
        request.body.flag,
        request.body.errmsg,
        request.body.id
    ]
    userDao.setParentInfoStatus(params, function (result) {
        response.send({ status: 'ok', result: result });
    })
}

function getSearchList(request, response) {
    userDao.getSearchList(function (result) {
        response.send({ status: 'ok', result: result });
    })
}

function insertSearchValue(request, response) {
    var params = {
        area:request.body.area,
        lesson:request.body.lesson,
        teacherjob:request.body.teacherjob
    }
    userDao.insertSearchValue(params, function (result) {
        // console.log(result)
        response.send({ status: 'ok'});
    })
}

function deleteSearchValue(request, response) {
    var params = {
        flag:request.body.flag,
        id:request.body.id
    }
    userDao.deleteSearchValue(params, function (result) {
        // console.log(result)
        response.send({ status: 'ok'});
    })
}

function updateSearchValue(request, response) {
    var params = {
        flag:request.body.flag,
        id:request.body.id,
        value:request.body.value
    }
    userDao.updateSearchValue(params, function (result) {
        // console.log(result)
        response.send({ status: 'ok'});
    })
}

function getSearchValue(request, response) {
    var params = {
        areaPage:request.body.areaPage,
        lessonPage:request.body.lessonPage,
        teacherjobPage:request.body.teacherjobPage
    }
    userDao.getSearchValue(params, function (result) {
        // console.log(result)
        response.send({ status: 'ok',result});
    })
}

function getDisplayInfo(request, response) {
    userDao.getDisplayInfo(function (result) {
        // console.log(result)
        response.send({ status: 'ok',result});
    })
}

function getDetailTeacherInfo(request, response) {
    var params = url.parse(request.url, true).query;
    var id = params.id;
    var type = params.type;
    userDao.getDetailTeacherInfo(id,type, function (result) {
        response.send({ status: 'ok', result });
    })
}

function displaySearchInfo(request, response) {
    var params = {
        type:request.body.type,
        key:request.body.key,
        table:request.body.table,
        currentPage:request.body.currentPage,
    };
    userDao.displaySearchInfo(params, function (result) {
        response.send({ status: 'ok', result });
    })
}

function getSearchInfoList(request, response) {
    var params = {
        teacharea:request.body.searchArr[0],
        teachlesson:request.body.searchArr[1],
        teachtime:request.body.searchArr[2],
        teachtimesolt:request.body.searchArr[3],
        price:request.body.searchArr[4],
        currentPage:request.body.currentPage,
        table:request.body.table,
    };
    userDao.getSearchInfoList(params, function (result) {
        response.send({ status: 'ok', result });
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
path.set("/getAllUser", getAllUser);
path.set("/deleteUser", deleteUser);
path.set("/searchUser", searchUser);
path.set("/getAllTeacherInfo", getAllTeacherInfo);
path.set("/searchTeacherInfo", searchTeacherInfo);
path.set("/adminDeleteTeacherInfo", adminDeleteTeacherInfo);
path.set("/setTeacherInfoStatus", setTeacherInfoStatus);
path.set("/canDelete", canDelete);
path.set("/getAllParentInfo", getAllParentInfo);
path.set("/searchParentInfo", searchParentInfo);
path.set("/adminDeleteParentInfo", adminDeleteParentInfo);
path.set("/setParentInfoStatus", setParentInfoStatus);
path.set("/getSearchList", getSearchList);
path.set("/insertSearchValue", insertSearchValue);
path.set("/deleteSearchValue", deleteSearchValue);
path.set("/updateSearchValue", updateSearchValue);
path.set("/getSearchValue", getSearchValue);
path.set("/getDisplayInfo", getDisplayInfo);
path.set("/getDetailTeacherInfo", getDetailTeacherInfo);
path.set("/displaySearchInfo", displaySearchInfo);
path.set("/getSearchInfoList", getSearchInfoList);


module.exports.path = path;