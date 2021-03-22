"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");

const output = {
  home: (req, res) => {
    logger.info(`GET / 200 "홈 화면으로 이동"`);
    res.render("home/index");
  },
  login: (req, res) => {
    logger.info(`GET /login 200 "로그인 화면으로 이동"`);
    res.render("home/login");
  },
  register: (req, res) => {
    logger.info(`GET /register 200 "회원가입 화면으로 이동"`);
    res.render("home/register");
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    if (response.err) {
      logger.error(
        `POST /login 200 Response: "success: ${response.success}, ${response.err}"`
      );
    } else {
      logger.info(
        `POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`
      );
    }
    return res.json(response);
  },
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();

    if (response.err) {
      logger.error(
        `POST /login 200 Response: "success: ${response.success}, ${response.err}"`
      );
    } else {
      logger.info(
        `POST /register 200 Response: "success: ${response.success}, msg: ${response.msg}"`
      );
    }
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
