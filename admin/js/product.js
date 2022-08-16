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

    let html = `<li id="todo_li_${index}">${todo}
                    <div class="modbtn">
                        <div class="add_btn" id="depth_add_btn_${index}" onclick="depthInputAdd(${index})">추가하기</div>
                        <div class="modify_btn" id="modify_btn_${index}" onclick="depthModify(${index})">수정하기</div>
                        <div class="delete_btn" id="delete_btn_${index}" onclick="depthDelete(${index})">제거하기</div>
                    </div>
                </li>`;
    todoListUl.insertAdjacentHTML("beforeend", html);





}








function depthInputAdd(num) {
    const refLi = document.getElementById(`todo_li_${num}`);
    let listSub = document.getElementById(`list_sub_${num}`);
    if (listSub == null) {
        let html = `<div id="list_sub_${num}">
                        <ul class="list_sub_ul">
                        </ul>
                     </div>`;
        refLi.insertAdjacentHTML("afterend", html);
        listSub = document.getElementById(`list_sub_${num}`);
    }

    let listSubUl = listSub.getElementsByClassName('list_sub_ul')[0];

    let html = `<li id="list_sub_li">
                        <div class="depth_input_container">
                            <input type="text" class="depth_input"/>
                            <button type="button" class="input__button" onclick="depthAdd(this)">
                                <i class="fas fa-plus-circle"></i>
                            </button>
                        </div>
                </li>`

    listSubUl.insertAdjacentHTML("beforeend", html);
}






function depthAdd(e) {
    // console.log(e);
    let parentDiv = e.parentNode;
    // console.log(parentDiv)
    let inputValue = parentDiv.getElementsByClassName('depth_input')[0].value;
    // console.log(inputValue);

    let html = `<li id="todo_sub_li_${index}">${inputValue}
                    <div class="modbtn">
                        <div class="modify_btn" id="modify_btn_${index}">수정하기</div>
                        <div class="delete_btn" id="delete_btn_${index}">제거하기</div>
                    </div>
                </li>`;

    parentDiv.insertAdjacentHTML("afterend", html);
    parentDiv.remove();
}