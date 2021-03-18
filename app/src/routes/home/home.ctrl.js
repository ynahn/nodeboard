"use strict";

const User = require("../../models/User");

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
  register: (req, res) => {
    res.render("home/register");
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    // console.log(response);
    return res.json(response);
  },
  register: (req, res) => {
    const user = new User(req.body);
    const response = user.register();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};

//========================================

// const user = new User(req.body); => 클라이언트가 전달한 body
// const response = user.login(); => 로그인 처리 후 응답받기
// return res.json(response); => 컨트롤러가 응답 받은 부분 리턴
