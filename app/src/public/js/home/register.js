"use strict";

//DOM => Document Object Model
const id = document.querySelector("#id"),
  name = document.querySelector("#name"),
  psword = document.querySelector("#psword"),
  confirmPsword = document.querySelector("#confirm-psword"),
  registerBtn = document.querySelector("#button");

console.log("hello register");
registerBtn.addEventListener("click", register);

function register() {
  if (!id.value) return alert("아이디를 입력해주세요.");
  if (psword.value !== confirmPsword.value)
    return alert("비밀번호가 일치하지 않습니다.");

  const req = {
    id: id.value,
    name: name.value,
    psword: psword.value,
    confirmPsword: confirmPsword.value,
  };

  fetch("/register", {
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
        location.href = "/login";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("회원가입 중 에러 발생"));
    });
}
