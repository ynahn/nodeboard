"use strict";

const { reject } = require("async");
const db = require("../config/db");
// const fs = require("fs").promises;

class UserStorage {
  //"#" 은닉화 -> 외부에서 불러올수 없음.
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // => [id, psword, names]
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    // console.log(userInfo);
    return userInfo;
  }

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;

    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});

    return newUsers;
  }

  // static getUsers(isAll, ...fields) {}

  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      //resolve => success, reject => fail
      const query = `SELECT TOP (3)  [user_skey]
        ,[user_name]
        ,[user_id] as id
        ,[password] as psword
        ,[comp_skey]
        ,[regdate]  FROM [TousFluxClient] WHERE user_id = '${id}'`;
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data.recordset[0]);
      });
    });
  }

  static async save(userInfo) {
    // return new Promise((resolve, reject) => {
    //   //resolve => success, reject => fail
    //   const query = `SELECT TOP (3)  [user_skey]
    //   ,[user_name]
    //   ,[user_id] as id
    //   ,[password] as psword
    //   ,[comp_skey]
    //   ,[regdate]  FROM [TousFluxClient].[dbo].[sys_user_info] WHERE user_id = '${id}'`;
    //   db.query(query, (err, data) => {
    //     if (err) reject(err);
    //     resolve(data.recordsets[0][0]);
    //   });
    // });
  }
}

module.exports = UserStorage;
