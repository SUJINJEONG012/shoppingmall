'use strict';

const todoArray = []; //할 일들을 배열로 선언

const main__titles = document.querySelector('.main__title');
const add = document.querySelector('.add');

let todoList = document.getElementById('todo__list').value;

let inputButton = document.querySelector('.input__button');
inputButton.addEventListener('click', addTodo);
// addEventListener(이벤트유형, 이벤트인터페이스를 구현할 "객체" 또는 "함수")


// search을 클릭하면  search에  active 클래스를 토글
main__titles.addEventListener('click', () => {
    add.classList.toggle('active');
    input.focus();
})




function addTodo() {
    //input에 입력한 todo
    const todo = document.querySelector('.todoItem').value;



    //리스트 보여주는 변수 생성
    const li = document.createElement("li");
    const modifyBtn = document.createElement('div');
    const deleteBtn = document.createElement('div');
    modifyBtn.classList = 'modify_btn';
    deleteBtn.className = 'delete_btn'; //클래스이름 생성

    // li.id ='test';

    //할일 목록 추가 값
    document.getElementById("todo__list").appendChild(li).innerText = todo;

    //수정 하기 버튼
    li.appendChild(modifyBtn);
    modifyBtn.textContent = '수정하기';


    //삭제 하기 버튼
    li.appendChild(deleteBtn);
    deleteBtn.textContent = '제거하기';


    deleteBtn.addEventListener('click', dleeteTodo)
    // todoList.removeEventListener(li);


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
