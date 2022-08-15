'use strict';

const todoArray = []; //할 일들을 배열로 선언
let todoList = document.getElementById('todo__list').value;

let inputButton = document.querySelector('.input__button');
inputButton.addEventListener('click', addTodo);
// addEventListener(이벤트유형, 이벤트인터페이스를 구현할 "객체" 또는 "함수")

function addTodo() {
    //input에 입력한 todo
    const todo = document.querySelector('.todoItem').value;

    // if(todo === '' || todo === null){
    //     alert('할일 리스트를 입력해주세요.');
    //     document.querySelector('.todoItem').value = '';
    //     document.querySelector('.todoItem').focus();
    //     return;

    // }else if(todo !== '' || todo !== null){
    //     alert('할일 리스트가 추가되었습니다.');
    //     todoArray.push(todo);
    //     document.querySelector('.todoItem').value ='';
    //     document.querySelector('.todoItem').focus();
    //     console.log(todo);


    // }

    //리스트 보여주는 변수 생성
    const li = document.createElement("li");
    const deleteBtn = document.createElement('button');
    // li.id ='test';

    //할일 목록 추가 값
    document.getElementById("todo__list").appendChild(li).innerText = todo;

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
