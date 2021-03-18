"use strict";

class UserStorage {
  //"#" 은닉화 -> 외부에서 불러올수 없음.
  static #users = {
    id: ["안유니", "임어진", "황혜정"],
    psword: ["0124", "0204", "1030"],
    names: ["유니주정뱅이꾸꾸", "임어진", "황혜정"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});

    return newUsers;
  }

  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // => [id, psword, names]
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    return userInfo;
  }

  static save(userInfo) {
    const users = this.#users;

    users.id.push(userInfo.id);
    users.names.push(userInfo.name);
    users.psword.push(userInfo.psword);
    return { success: true };
  }
}

module.exports = UserStorage;
