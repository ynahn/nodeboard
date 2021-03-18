"use strict";

//DOM => Document Object Model
const id = document.querySelector("#id"),
  psword = document.querySelector("#psword"),
  loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
  const req = {
    id: id.value,
    psword: psword.value,
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json()) //res.json()의 반환값은 promise이다. ".json()"으로 Response 스트림을 가져와 완료될 때까지 읽는다. 다 읽은 body의 텍스트를 promise 형태로 반환한다.
    .then((res) => {
      console.log(res.success);
      if (res.success) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("로그인 중 에러 발생"));
    });
}
