export function headerRender(){
    let headerTopUl = document.getElementById('header_top_ul');
    while(headerTopUl.hasChildNodes()){
        headerTopUl.removeChild(headerTopUl.firstChild);
    }

    let html

    let accessToken = localStorage.getItem('accessToken');
    if(accessToken == null){
        console.log("로그인 안했음");
        html = `<li><a href="/shoppingmall/page/login.html" lang="en">Login</a></li>
                        <li><a href="/shoppingmall/page/join.html" lang="en">Join</a></li>`;
    } else {
        console.log("로그인 했음");
        html = `<li><a href="/shoppingmall/page/login.html" lang="en" id="logout">Logout</a></li>`
    }

    headerTopUl.insertAdjacentHTML("beforeend", html);
    let logout = document.getElementById('logout');
    if(logout != null){
        logout.addEventListener("click", ev => {
            localStorage.removeItem('accessToken');
        });
    }
}