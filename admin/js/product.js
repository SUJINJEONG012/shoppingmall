'use strict';

const todoArray = []; //할 일들을 배열로 선언

const main__titles = document.querySelector('.main__title');
const add__btn = document.querySelector('.add-btn');
const add = document.querySelector('.add');

let todoList = document.getElementById('todo__list').value;

let inputButton = document.querySelector('.input__button');
inputButton.addEventListener('click', addTodo);


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

    depInput.classList = 'depth_input';



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


    // addBtn을 클릭하면 addBtn에 active 클래스를 토글
    addBtn.addEventListener('click', () => {
        depInput.classList.toggle('active');
    });



    //수정하기
    modifyBtn.addEventListener('click', modifyTodo);
    function modifyTodo(event) {
        const list = event.target.parentElement;
        if (confirm('정말 수정하시겠습니까?') === true) {
            list.remove();
        } else { //취소
            return;
        }
    }

    //삭제하기함수
    deleteBtn.addEventListener('click', dleeteTodo);
    function dleeteTodo(event) {
        const list = event.target.parentElement;
        if (confirm('정말 삭제하시겠습니까?') === true) {
            list.remove();
        } else { //취소
            return;
        }
    }
    // addEventListener(이벤트유형, 이벤트인터페이스를 구현할 "객체" 또는 "함수")

} //addTodo 함수 끝
