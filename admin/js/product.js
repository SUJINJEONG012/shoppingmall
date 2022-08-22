'use strict';

const todoArray = []; //할 일들을 배열로 선언

const main__titles = document.querySelector('.main__title');
const add__btn = document.querySelector('.add-btn');
const add = document.querySelector('.add');

let groupCate = document.getElementById('group_cate').value;

let inputButton = document.querySelector('.input__button');
inputButton.addEventListener('click', addTodoSlom); /// TODO : 나중에 통신하는 버전으로 변경하기


// add__btn을 클릭하면  add__btn에  active 클래스를 토글
add__btn.addEventListener('click', () => {
    add.classList.toggle('active');
});

function addTodo() {

    //input에 입력한 todo
    const todo = document.querySelector('.todoItem').value;

    //리스트 보여주는 변수 생성
    const li = document.createElement("li");
    const modbtn = document.createElement('div');
    const addBtn = document.createElement('div');
    const modifyBtn = document.createElement('div');
    const deleteBtn = document.createElement('div');

    //두번째 카테고리 추가되는 변수 생성
    const depInput = document.createElement('input');

    modbtn.className = 'modbtn';
    addBtn.className = 'add_btn';
    modifyBtn.className = 'modify_btn';
    deleteBtn.className = 'delete_btn'; //클래스이름 생성

    //depInput.classList = 'depth_input';
    depInput.className = 'depth_input';



    //할일 목록 추가 값
    document.getElementById("todo__list").appendChild(li).innerText = todo;


    //버튼을 전체 감싸는 버튼
    li.appendChild(modbtn);
    //추가 하기 버튼
    modbtn.appendChild(addBtn);
    addBtn.textContent = '추가하기';
    //수정 하기 버튼
    modbtn.appendChild(modifyBtn);
    modifyBtn.textContent = '수정하기';

    //삭제 하기 버튼
    modbtn.appendChild(deleteBtn);
    deleteBtn.textContent = '제거하기';


    //addBtn을 클릭하면 addBtn에 active 클래스를 토글
    addBtn.addEventListener('click', () => {
        // depInput.classList.toggle('active');
        const li = document.createElement("li");
        const depInput = document.createElement('input');
        depInput.className = 'depth_input';
        li.appendChild(depInput);
        document.getElementById("todo__list").appendChild(li);
    });




    //삭제하기함수
    deleteBtn.addEventListener('click', depthDelete);
    console.log(deleteBtn);
    function depthDelete(event) {
        const list = event.target.parentElement;
        if (confirm('정말 삭제하시겠습니까?') === true) {
            list.remove();
        } else { //취소
            return;
        }
    }




    // addEventListener(이벤트유형, 이벤트인터페이스를 구현할 "객체" 또는 "함수")

} //addTodo 함수 끝





// 슬롬 카테고리 추가하는 부분
// 실제로는 통신으로 서버로 요청 후 응답데이터를 받는다. 받는 데이터 양식이 {"idx" : 1, "name" : "상위 카테고리1"} 이런 형식일 것이다. 아직은 통신하지 않으므로 임시로 index를 스크립트에 정의함
let index = 0;

function addTodoSlom() {
    index++;
    const todo = document.querySelector('.todoItem').value;

    const todoListUl = document.getElementById("todo__list");

    let html = `<li id="todo_li_${index}">
                    <div id="todo_text_${index}">${todo}</div>
                    <div class="modbtn">
                        <div class="add_btn" id="depth_add_btn_${index}" onclick="depthInputAdd(${index})">추가하기</div>
                        <div class="modify_btn" id="modify_btn_${index}" onclick="categoryModify(${index})">수정하기</div>
                        <div class="delete_btn" id="delete_btn_${index}" onclick="categoryDelete(${index})">제거하기</div>
                    </div>
                </li>`;
    todoListUl.insertAdjacentHTML("beforeend", html);
}


function categoryModify(index) {
    const todoLi = document.getElementById(`todo_li_${index}`);
    let text = document.getElementById(`todo_text_${index}`).innerText;
    console.log(text);
    let html = `<input type="text" id="category_modify_input_${index}" value="${text}"/>
                <div class="modbtn">
                    <div class="btn_confirm" id="btn_confirm_${index}">확인</div>
                    <div class="btn_cancel" id="btn_cancel_${index}">취소</div>
                </div>`;

    // 자식 노드 전부 삭제
    while (todoLi.hasChildNodes()) {
        todoLi.removeChild(todoLi.firstChild);
    }

    todoLi.insertAdjacentHTML("beforeend", html);

    let btnConfirm = document.getElementById(`btn_confirm_${index}`);
    btnConfirm.addEventListener("click", ev => modifyConfirm(index));

    let btnCancel = document.getElementById(`btn_cancel_${index}`);
    btnCancel.addEventListener("click", ev => modifyCancel(index, text));
}

function modifyConfirm(index) {
    const todoLi = document.getElementById(`todo_li_${index}`);
    let modifyInputValue = document.getElementById(`category_modify_input_${index}`).value;
    while (todoLi.hasChildNodes()) {
        todoLi.removeChild(todoLi.firstChild);
    }

    let html = `<div id="todo_text_${index}">${modifyInputValue}</div>
                    <div class="modbtn">
                        <div class="add_btn" id="depth_add_btn_${index}" onclick="depthInputAdd(${index})">추가하기</div>
                        <div class="modify_btn" id="modify_btn_${index}" onclick="categoryModify(${index})">수정하기</div>
                        <div class="delete_btn" id="delete_btn_${index}" onclick="categoryDelete(${index})">제거하기</div>
                    </div>`;

    todoLi.insertAdjacentHTML("beforeend", html);
}

function modifyCancel(index, value) {
    const todoLi = document.getElementById(`todo_li_${index}`);
    while (todoLi.hasChildNodes()) {
        todoLi.removeChild(todoLi.firstChild);
    }

    let html = `<div id="todo_text_${index}">${value}</div>
                    <div class="modbtn">
                        <div class="add_btn" id="depth_add_btn_${index}" onclick="depthInputAdd(${index})">추가하기</div>
                        <div class="modify_btn" id="modify_btn_${index}" onclick="categoryModify(${index})">수정하기</div>
                        <div class="delete_btn" id="delete_btn_${index}" onclick="categoryDelete(${index})">제거하기</div>
                    </div>`;

    todoLi.insertAdjacentHTML("beforeend", html);
}

function categoryDelete(index) {
    const todoLi = document.getElementById(`todo_li_${index}`);
    todoLi.remove();
}


/// 하위 카테고리
function depthInputAdd(num) {
    const refLi = document.getElementById(`todo_li_${num}`);
    let listSub = document.getElementById(`list_sub_${num}`);
    if (listSub == null) {
        let html = `<li id="list_sub_${num}">
                        <ul class="list_sub_ul"></ul>
                     </li>`;
        refLi.insertAdjacentHTML("afterend", html);
        listSub = document.getElementById(`list_sub_${num}`);
    }

    let listSubUl = listSub.getElementsByClassName('list_sub_ul')[0];

    console.log(listSubUl);

    let html = `<li class="todo_sub_li">
                            <input type="text" class="depth_input"/>
                            <button type="button" class="input__button" onclick="depthAdd(this)">
                                <i class="fas fa-plus-circle"></i>
                            </button>
                </li>`

    listSubUl.insertAdjacentHTML("beforeend", html);
}


function depthAdd(e) {
    // console.log(e);
    let todoSubLi = e.parentNode;
    let inputValue = todoSubLi.getElementsByClassName('depth_input')[0].value;
    // console.log(inputValue);

    let html = `<li class="todo_sub_li">
                    <div class="depth_text">${inputValue}</div>
                    <div class="modbtn">
                        <div class="modify_btn" onclick="depthModify(this)">수정하기</div>
                        <div class="delete_btn" onclick="depthDelete(this)">제거하기</div>
                    </div>
                </li>`;

    todoSubLi.insertAdjacentHTML("afterend", html);
    todoSubLi.remove();
}

function depthDelete(e) {
    let todoSubLi = e.parentNode.parentNode;
    let listSubUl = todoSubLi.parentNode;
    todoSubLi.remove();
    if (!listSubUl.hasChildNodes()) {
        let listSubLi = listSubUl.parentNode;
        listSubLi.remove();
    }
}

function depthModify(e) {
    let todoSubLi = e.parentNode.parentNode;
    let value = todoSubLi.getElementsByClassName('depth_text')[0].innerText;
    console.log(value);

    while (todoSubLi.hasChildNodes()) {
        todoSubLi.removeChild(todoSubLi.firstChild);
    }

    let html = `<input type="text" class="depth_input" value="${value}"/>
                <div class="modbtn">
                    <div class="confirm_btn">확인</div>
                    <div class="cancel_btn">취소</div>
                </div>`
    todoSubLi.insertAdjacentHTML("beforeend", html);

    let btnConfirm = todoSubLi.getElementsByClassName('confirm_btn')[0];
    btnConfirm.addEventListener("click", ev => depthModifyConfirm(todoSubLi));

    let btnCancel = todoSubLi.getElementsByClassName('cancel_btn')[0];
    btnCancel.addEventListener("click", ev => depthModifyCancel(todoSubLi, value));
}

function depthModifyConfirm(todoSubLi) {
    let modifyInputValue = todoSubLi.getElementsByClassName('depth_input')[0].value;
    console.log(modifyInputValue);
    while (todoSubLi.hasChildNodes()) {
        todoSubLi.removeChild(todoSubLi.firstChild);
    }

    let html = `<div class="depth_text">${modifyInputValue}</div>
                    <div class="modbtn">
                        <div class="modify_btn" onclick="depthModify(this)">수정하기</div>
                        <div class="delete_btn" onclick="depthDelete(this)">제거하기</div>
                    </div>`;

    todoSubLi.insertAdjacentHTML("beforeend", html);
}

function depthModifyCancel(todoSubLi, value) {
    console.log('취소');
    while (todoSubLi.hasChildNodes()) {
        todoSubLi.removeChild(todoSubLi.firstChild);
    }

    let html = `<div class="depth_text">${value}</div>
                <div class="modbtn">
                    <div class="modify_btn" onclick="depthModify(this)">수정하기</div>
                    <div class="delete_btn" onclick="depthDelete(this)">제거하기</div>
                </div>`;

    console.log(html);

    todoSubLi.insertAdjacentHTML("beforeend", html);
}


////////////////////////////////////////////////////////
// 통신하는 부분
let render = (category) => {
    const todoListUl = document.getElementById("todo__list");

    for (const index in category){
        console.log(category[index]);
        let html = `<li id="todo_li_${category[index].idx}">
                    <div id="todo_text_${category[index].idx}">${category[index].name}</div>
                    <div class="modbtn">
                        <div class="add_btn" id="depth_add_btn_${category[index].idx}" onclick="depthInputAddNetwork(${category[index].idx})">추가하기</div>
                        <div class="modify_btn" id="modify_btn_${category[index].idx}" onclick="categoryModifyNetwork(${category[index].idx})">수정하기</div>
                        <div class="delete_btn" id="delete_btn_${category[index].idx}" onclick="categoryDeleteNetwork(${category[index].idx})">제거하기</div>
                    </div>
                </li>`;
        todoListUl.insertAdjacentHTML("beforeend", html);

        if(category[index].subCategory.length !== 0){
            const todoLi = document.getElementById(`todo_li_${category[index].idx}`);
            for (const subIndex in category[index].subCategory){
                /// subIndex의 타입이 string
                if(subIndex === '0'){
                    console.log('fdfdfd');
                    let html = `<li id="list_sub_${category[index].idx}">
                        <ul class="list_sub_ul" id="list_sub_ul_${category[index].idx}"></ul>
                     </li>`;

                    console.log(html);
                    todoLi.insertAdjacentHTML("afterend", html);
                }
                const listSubUl = document.getElementById(`list_sub_ul_${category[index].idx}`);
                let html = `<li class="todo_sub_li">
                    <div class="depth_text">${category[index].subCategory[subIndex].name}</div>
                    <div class="modbtn">
                        <div class="modify_btn" onclick="depthModifyNetwork(this, ${category[index].subCategory[subIndex].idx})">수정하기</div>
                        <div class="delete_btn" onclick="depthDeleteNetwork(this, ${category[index].subCategory[subIndex].idx})">제거하기</div>
                    </div>
                </li>`;
                listSubUl.insertAdjacentHTML("beforeend", html);
            }
        }

    }
}

/// 카테고리 등록 통신하는버전
function addCategory() {

    const category = document.querySelector('.todoItem').value;

    let data = {name : category}

    fetch(`http://121.145.8.135:8080/v1/api/admin/product/category/main`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.code === 200){
                console.log(res.content);
                const todoListUl = document.getElementById("todo__list");

                let html = `<li id="todo_li_${res.content.idx}">
                    <div id="todo_text_${res.content.idx}">${res.content.name}</div>
                    <div class="modbtn">
                        <div class="add_btn" id="depth_add_btn_${res.content.idx}" onclick="depthInputAddNetwork(${res.content.idx})">추가하기</div>
                        <div class="modify_btn" id="modify_btn_${res.content.idx}" onclick="categoryModifyNetwork(${res.content.idx})">수정하기</div>
                        <div class="delete_btn" id="delete_btn_${res.content.idx}" onclick="categoryDeleteNetwork(${res.content.idx})">제거하기</div>
                    </div>
                </li>`;
                todoListUl.insertAdjacentHTML("beforeend", html);
            } else {
                alert("잠시 후 다시 시도해주세요");
            }
        });
}

function categoryModifyNetwork(idx) {
    let todoLi = document.getElementById(`todo_li_${idx}`);
    let text = document.getElementById(`todo_text_${idx}`).innerText;
    console.log(text);
    let html = `<input type="text" id="category_modify_input_${idx}" value="${text}"/>
                <div class="modbtn">
                    <div class="btn_confirm" id="btn_confirm_${idx}">확인</div>
                    <div class="btn_cancel" id="btn_cancel_${idx}">취소</div>
                </div>`;

    // 자식 노드 전부 삭제
    while (todoLi.hasChildNodes()) {
        todoLi.removeChild(todoLi.firstChild);
    }

    todoLi.insertAdjacentHTML("beforeend", html);

    let btnConfirm = document.getElementById(`btn_confirm_${idx}`);
    btnConfirm.addEventListener("click", ev => modifyConfirmNetwork(idx));

    let btnCancel = document.getElementById(`btn_cancel_${idx}`);
    btnCancel.addEventListener("click", ev => modifyCancelNetwork(idx, text));
}

function modifyConfirmNetwork(idx) {
    let todoLi = document.getElementById(`todo_li_${idx}`);
    let modifyInputValue = document.getElementById(`category_modify_input_${idx}`).value;


    let data = {idx : idx, name : modifyInputValue}

    console.log(data);

    fetch(`http://121.145.8.135:8080/v1/api/admin/product/category/main`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.code === 200){
                console.log(res.content);
                while (todoLi.hasChildNodes()) {
                    todoLi.removeChild(todoLi.firstChild);
                }

                let html = `<div id="todo_text_${res.content.idx}">${res.content.name}</div>
                    <div class="modbtn">
                        <div class="add_btn" id="depth_add_btn_${res.content.idx}" onclick="depthInputAddNetwork(${res.content.idx})">추가하기</div>
                        <div class="modify_btn" id="modify_btn_${res.content.idx}" onclick="categoryModifyNetwork(${res.content.idx})">수정하기</div>
                        <div class="delete_btn" id="delete_btn_${res.content.idx}" onclick="categoryDeleteNetwork(${res.content.idx})">제거하기</div>
                    </div>`;

                todoLi.insertAdjacentHTML("beforeend", html);
            } else {
                alert("잠시 후 다시 시도해주세요");
            }
        });
}

function modifyCancelNetwork(index, value) {
    let todoLi = document.getElementById(`todo_li_${index}`);
    while (todoLi.hasChildNodes()) {
        todoLi.removeChild(todoLi.firstChild);
    }

    let html = `<div id="todo_text_${index}">${value}</div>
                    <div class="modbtn">
                        <div class="add_btn" id="depth_add_btn_${index}" onclick="depthInputAddNetwork(${index})">추가하기</div>
                        <div class="modify_btn" id="modify_btn_${index}" onclick="categoryModifyNetwork(${index})">수정하기</div>
                        <div class="delete_btn" id="delete_btn_${index}" onclick="categoryDeleteNetwork(${index})">제거하기</div>
                    </div>`;

    todoLi.insertAdjacentHTML("beforeend", html);
}

function categoryDeleteNetwork(idx) {
    fetch(`http://121.145.8.135:8080/v1/api/admin/product/category/main/${idx}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.code === 200){
                console.log(res);
                let todoLi = document.getElementById(`todo_li_${idx}`);
                todoLi.remove();
                let listSub = document.getElementById(`list_sub_${idx}`);
                if(listSub != null){
                    listSub.remove();
                }
            } else {
                alert("잠시 후 다시 시도해주세요");
            }
        });
}


/// 하위 카테고리
function depthInputAddNetwork(idx) {
    let todoLi = document.getElementById(`todo_li_${idx}`);
    let listSub = document.getElementById(`list_sub_${idx}`);
    if (listSub == null) {
        let html = `<li id="list_sub_${idx}">
                        <ul class="list_sub_ul"></ul>
                     </li>`;
        todoLi.insertAdjacentHTML("afterend", html);
        listSub = document.getElementById(`list_sub_${idx}`);
    }

    let listSubUl = listSub.getElementsByClassName('list_sub_ul')[0];

    console.log(listSubUl);

    let html = `<li class="todo_sub_li" id="todo_sub_li_${idx}">
                            <input type="text" class="depth_input"/>
                            <div class="modbtn">
                                <div class="btn_confirm" id="btn_confirm_${idx}" onclick="depthAddNetwork(${idx})">확인</div>
                                <div class="btn_cancel" id="btn_cancel_${idx}" onclick="depthCancelNetwork(this)">취소</div>
                            </div>
                </li>`

    listSubUl.insertAdjacentHTML("beforeend", html);
}


function depthAddNetwork(idx) {

    let todoSubLi = document.getElementById(`todo_sub_li_${idx}`);
    let inputValue = todoSubLi.getElementsByClassName('depth_input')[0].value;

    let data = {name : inputValue, categoryIdx : idx};

    fetch(`http://121.145.8.135:8080/v1/api/admin/product/category/sub`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.code === 200){
                console.log(res.content);
                let html = `<li class="todo_sub_li" id="todo_sub_li_${res.content.idx}">
                    <div class="depth_text">${res.content.name}</div>
                    <div class="modbtn">
                        <div class="modify_btn" onclick="depthModifyNetwork(this, ${res.content.idx})">수정하기</div>
                        <div class="delete_btn" onclick="depthDeleteNetwork(this, ${res.content.idx})">제거하기</div>
                    </div>
                </li>`;

                todoSubLi.insertAdjacentHTML("afterend", html);
                todoSubLi.remove();
            } else {
                alert("잠시 후 다시 시도해주세요");
            }
        });
}

function depthCancelNetwork(e) {
    let todoSubLi = e.parentNode.parentNode;
    let listSubUl = todoSubLi.parentNode;
    todoSubLi.remove();
    if (!listSubUl.hasChildNodes()) {
        let listSubLi = listSubUl.parentNode;
        listSubLi.remove();
    }
}

function depthModifyNetwork(e, idx) {
    let todoSubLi = e.parentNode.parentNode;
    let value = todoSubLi.getElementsByClassName('depth_text')[0].innerText;
    console.log(value);

    while (todoSubLi.hasChildNodes()) {
        todoSubLi.removeChild(todoSubLi.firstChild);
    }

    let html = `<input type="text" class="depth_input" value="${value}"/>
                <div class="modbtn">
                    <div class="confirm_btn">확인</div>
                    <div class="cancel_btn">취소</div>
                </div>`
    todoSubLi.insertAdjacentHTML("beforeend", html);

    let btnConfirm = todoSubLi.getElementsByClassName('confirm_btn')[0];
    btnConfirm.addEventListener("click", ev => depthModifyConfirmNetwork(todoSubLi, idx));

    let btnCancel = todoSubLi.getElementsByClassName('cancel_btn')[0];
    btnCancel.addEventListener("click", ev => depthModifyCancelNetwork(todoSubLi, value, idx));
}

function depthModifyConfirmNetwork(todoSubLi, idx) {
    let modifyInputValue = todoSubLi.getElementsByClassName('depth_input')[0].value;
    console.log(modifyInputValue);

    let data = {idx : idx, name : modifyInputValue};

    fetch(`http://121.145.8.135:8080/v1/api/admin/product/category/sub`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.code === 200){
                console.log(res.content);
                while (todoSubLi.hasChildNodes()) {
                    todoSubLi.removeChild(todoSubLi.firstChild);
                }
                let html = `<div class="depth_text">${res.content.name}</div>
                    <div class="modbtn">
                        <div class="modify_btn" onclick="depthModifyNetwork(this, ${res.content.idx})">수정하기</div>
                        <div class="delete_btn" onclick="depthDeleteNetwork(this, ${res.content.id})">제거하기</div>
                    </div>`;

                todoSubLi.insertAdjacentHTML("beforeend", html);
            } else {
                alert("잠시 후 다시 시도해주세요");
            }
        });
}

function depthModifyCancelNetwork(todoSubLi, value, idx) {
    console.log('취소');
    while (todoSubLi.hasChildNodes()) {
        todoSubLi.removeChild(todoSubLi.firstChild);
    }

    let html = `<div class="depth_text">${value}</div>
                <div class="modbtn">
                    <div class="modify_btn" onclick="depthModifyNetwork(this, ${idx})">수정하기</div>
                    <div class="delete_btn" onclick="depthDeleteNetwork(this, ${idx})">제거하기</div>
                </div>`;

    console.log(html);

    todoSubLi.insertAdjacentHTML("beforeend", html);
}

function depthDeleteNetwork(e, idx) {
    fetch(`http://121.145.8.135:8080/v1/api/admin/product/category/sub/${idx}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.code === 200){
                console.log(res);
                let todoSubLi = e.parentNode.parentNode;
                let listSubUl = todoSubLi.parentNode;
                todoSubLi.remove();
                if (!listSubUl.hasChildNodes()) {
                    let listSubLi = listSubUl.parentNode;
                    listSubLi.remove();
                }
            } else {
                alert("잠시 후 다시 시도해주세요");
            }
        });
}

window.onload = () => {
    fetch(`http://121.145.8.135:8080/v1/api/product/category`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.code === 200){
                console.log(res.content);
                render(res.content);
            } else {
                alert("잠시 후 다시 시도해주세요");
            }
        });
}