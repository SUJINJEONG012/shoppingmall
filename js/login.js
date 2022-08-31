let login = () => {
    let username = document.getElementById("id").value;
    let password = document.getElementById("password").value;

    if(!validationCheck())
        return;

    let data = {
        username : username,
        password : password
    }

    fetch("http://121.145.8.135:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.code === 200){
                // console.log(res.content.accessToken);
                localStorage.setItem('accessToken', res.content.accessToken);
                location.href = "shop.html";
            } else {
                alert("로그인에 실패했습니다. 다시 시도해주세요");
            }
        });
}

let validationCheck = () => {
    let username = document.getElementById("id").value;
    let password = document.getElementById("password").value;

    if (strUtil.isEmpty(username)) {
        alert("아이디를 입력하세요");
        return false;
    }
    if (strUtil.isEmpty(password)) {
        alert("비밀번호를 입력하세요");
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