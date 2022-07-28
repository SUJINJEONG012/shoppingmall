"use strict"

// https://postcode.map.daum.net/guide
let addressSearch = () => {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            document.getElementById("address").value = data.address;
            document.getElementById("address_detail").focus();
        }
    }).open();
}

let join = () => {
    let name = document.getElementById("name").value;
    let username = document.getElementById("id").value;
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let addressDetail = document.getElementById("address_detail").value;

    if (!validationCheck())
        return;

    let data = {
        name: name,
        username: username,
        password: password,
        phone: phone,
        address: address,
        addressDetail: addressDetail,
    }

    fetch("http://121.145.8.135:8080/v1/join", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.code === 200){
                alert("회원가입이 완료되었습니다.");
                location.href = "login.html";
            } else {
                alert("회원가입에 실패했습니다. 다시 시도해주세요");
            }
        });
}

let validationCheck = () => {
    let name = document.getElementById("name").value;
    let username = document.getElementById("id").value;
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let addressDetail = document.getElementById("address_detail").value;

    if (strUtil.isEmpty(name)) {
        alert("이름을 입력하세요");
        return false;
    }
    if (strUtil.isEmpty(username)) {
        alert("아이디를 입력하세요");
        return false;
    }
    if (strUtil.isEmpty(password)) {
        alert("비밀번호를 입력하세요");
        return false;
    }
    if (strUtil.isEmpty(phone)) {
        alert("전화번호를 입력하세요");
        return false;
    }
    if (strUtil.isEmpty(address)) {
        alert("주소를 입력하세요");
        return false;
    }
    if (strUtil.isEmpty(addressDetail)) {
        alert("상세주소를 입력하세요");
        return false;
    }
    return true;
}

let strUtil = {
    isEmpty: (str) => {
        return (str === "" || str === undefined || str === null);
    },

    isNotEmpty: (str) => {
        return !this.isEmpty(str);
    }
}