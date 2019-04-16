var mysql = require("mysql");

// console.log(mysql);

function createConnection(){
    var connection = mysql.createConnection({
        host:"127.0.0.1",
        port:"3306",
        user:"root",
        password:"frenchleave",
        database:"school"
    });
    return connection;
}
module.exports.createConnection = createConnection;