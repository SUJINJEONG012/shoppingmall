'use strict';

const todoArray = []; //할 일들을 배열로 선언

const main__titles = document.querySelector('.main__title');
const add__btn = document.querySelector('.add-btn');
const add = document.querySelector('.add');

let groupCate = document.getElementById('group_cate').value;

let inputButton = document.querySelector('.input__button');
inputButton.addEventListener('click', addTodoSlom);


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



function categoryModify(index){
    const todoLi = document.getElementById(`todo_li_${index}`);
    let text = document.getElementById(`todo_text_${index}`).innerText;
    console.log(text);
    let html = `<input type="text" id="category_modify_input_${index}" value="${text}"/>
                <div class="modbtn">
                    <div class="btn_confirm" id="btn_confirm_${index}">확인</div>
                    <div class="btn_cancel" id="btn_cancel_${index}">취소</div>
                </div>`;

    // 자식 노드 전부 삭제
    while(todoLi.hasChildNodes()){
        todoLi.removeChild( todoLi.firstChild );
    }

    todoLi.insertAdjacentHTML("beforeend", html);

    let btnConfirm = document.getElementById(`btn_confirm_${index}`);
    btnConfirm.addEventListener("click", ev => modifyConfirm(index));

    let btnCancel = document.getElementById(`btn_cancel_${index}`);
    btnCancel.addEventListener("click", ev => modifyCancel(index, text));
}

function modifyConfirm(index){
    const todoLi = document.getElementById(`todo_li_${index}`);
    let modifyInputValue = document.getElementById(`category_modify_input_${index}`).value;
    while(todoLi.hasChildNodes()){
        todoLi.removeChild( todoLi.firstChild );
    }

    let html = `<div id="todo_text_${index}">${modifyInputValue}</div>
                    <div class="modbtn">
                        <div class="add_btn" id="depth_add_btn_${index}" onclick="depthInputAdd(${index})">추가하기</div>
                        <div class="modify_btn" id="modify_btn_${index}" onclick="categoryModify(${index})">수정하기</div>
                        <div class="delete_btn" id="delete_btn_${index}" onclick="categoryDelete(${index})">제거하기</div>
                    </div>`;

    todoLi.insertAdjacentHTML("beforeend", html);
}

function modifyCancel(index, value){
    const todoLi = document.getElementById(`todo_li_${index}`);
    while(todoLi.hasChildNodes()){
        todoLi.removeChild( todoLi.firstChild );
    }

    let html = `<div id="todo_text_${index}">${value}</div>
                    <div class="modbtn">
                        <div class="add_btn" id="depth_add_btn_${index}" onclick="depthInputAdd(${index})">추가하기</div>
                        <div class="modify_btn" id="modify_btn_${index}" onclick="categoryModify(${index})">수정하기</div>
                        <div class="delete_btn" id="delete_btn_${index}" onclick="categoryDelete(${index})">제거하기</div>
                    </div>`;

    todoLi.insertAdjacentHTML("beforeend", html);
}

function categoryDelete(index){
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

    let html = `<li id="todo_sub_li">
                            <input type="text" class="depth_input"/>
                            <button type="button" class="input__button" onclick="depthAdd(this)">
                                <i class="fas fa-plus-circle"></i>
                            </button>
                </li>`

    listSubUl.insertAdjacentHTML("beforeend", html);
}


function depthAdd(e) {
    // console.log(e);
    let parentDiv = e.parentNode;
    let todoSubLi = parentDiv.parentNode;
    // console.log(parentDiv)
    let inputValue = parentDiv.getElementsByClassName('depth_input')[0].value;
    // console.log(inputValue);

    let html = `<li id="todo_sub_li">
                    <div class="depth_text">${inputValue}</div>
                    <div class="modbtn">
                        <div class="modify_btn" onclick="depthModify(this)">수정하기</div>
                        <div class="delete_btn" onclick="depthDelete(this)">제거하기</div>
                    </div>
                </li>`;

    todoSubLi.insertAdjacentHTML("afterend", html);
    todoSubLi.remove();
}

function depthDelete(e){
    let todoSubLi = e.parentNode.parentNode;
    let listSubUl = todoSubLi.parentNode;
    todoSubLi.remove();
    if(!listSubUl.hasChildNodes()){
        let listSubLi = listSubUl.parentNode;
        listSubLi.remove();
    }
}

function depthModify(e){
    let todoSubLi = e.parentNode.parentNode;
    let textDiv = todoSubLi.getElementsByClassName('depth_text')[0];
    let value = textDiv.innerText;
    console.log(value);

    while(todoSubLi.hasChildNodes()){
        todoSubLi.removeChild( todoSubLi.firstChild );
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

function depthModifyConfirm(todoSubLi){
    let modifyInputValue = todoSubLi.getElementsByClassName('depth_input')[0].value;
    console.log(modifyInputValue);
    while(todoSubLi.hasChildNodes()){
        todoSubLi.removeChild( todoSubLi.firstChild );
    }

    let html = `<div class="depth_text">${modifyInputValue}</div>
                    <div class="modbtn">
                        <div class="modify_btn" onclick="depthModify(this)">수정하기</div>
                        <div class="delete_btn" onclick="depthDelete(this)">제거하기</div>
                    </div>`;

    todoSubLi.insertAdjacentHTML("beforeend", html);
}

function depthModifyCancel(todoSubLi, value){
    console.log('취소');
    while(todoSubLi.hasChildNodes()){
        todoSubLi.removeChild( todoSubLi.firstChild );
    }

    let html = `<div class="depth_text">${value}</div>
                <div class="modbtn">
                    <div class="modify_btn" onclick="depthModify(this)">수정하기</div>
                    <div class="delete_btn" onclick="depthDelete(this)">제거하기</div>
                </div>`;

    console.log(html);

    todoSubLi.insertAdjacentHTML("beforeend", html);
}