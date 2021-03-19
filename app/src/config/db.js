var sql = require("mssql");

var strSql = "";

//디비 연결정보
var connectionConfig = {
  user: process.env.DB_USER, //사용자
  password: process.env.DB_PSWORD, //비밀번호
  server: process.env.DB_HOST, //서버주소
  port: Number(process.env.DB_PORT), //서버포트
  options: {
    database: process.env.DB_DATABASE, //데이터베이스 이름
    instanceName: "",
    connectTimeout: 15000,
    requestTimeout: 15000,
    useUTC: true,
    encrypt: false,
    enableArithAbort: true,
  },
};

//디비에 저장한다.
const db = new sql.ConnectionPool(connectionConfig);

db.connect()
  .then(async function (db) {
    var request = await new sql.Request(db);
    //console.log("Connection db");
    //   request.input("productid", sql.VarChar, productid);
    //   request.input("featureid", sql.VarChar, featureid);
    return request;
  })
  .catch(console.error);

// const db = new sql.ConnectionPool(connectionConfig, function (err) {
//   if (err) return console.error("error is", err);

//   // or: var request = connection.request();
//   var request = new sql.Request(db);

//   return request;
//   //   console.log(request);
//   //   strSql = `SELECT TOP (10) [brand]
//   //   FROM [DMP].[dbo].[brandlist]`;

//   //   request.query(strSql, function (err, recordset) {
//   //     if (err) return console.error("error query is", err);

//   //     // console.log(recordset.recordset);

//   //     console.log(recordset.recordsets[0]);
//   //     return recordset.recordsets[0];
//   //   });
// });

module.exports = db;
