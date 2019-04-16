var express = require('express');
// var dbutil = require('../dao/until');
var studentDao = require('../dao/studentDao');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('asdasdasdasdasdasd');
  // var querySql = "select * from student;";
  // var connection = dbutil.createConnection();
  // connection.connect();//创建一个连接
  // connection.query(querySql, function (error, result) {
  //   if (error == null) {
  //     console.log(result);
  //     // res.send(result);
  //     success(result);
  //   } else {
  //     throw new Error("error");
  //   }
  // });
  // connection.end();//关闭连接
  studentDao.queryAllStudent(success);
});

module.exports = router;
