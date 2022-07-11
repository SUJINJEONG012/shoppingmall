'use strict';

//클릭이벤트 스크립트
// const tabs = document.querySelectorAll('.tabs > li');
// const tabContents = document.querySelectorAll('[data-tab-content]');
// //아코디언,
// const acc = document.querySelectorAll('.accordion');


// tabs.forEach(tab => {
//     tab.addEventListener('click', () => {
//         const target = document.querySelector(tab.dataset.tabTarget)
//         tabContents.forEach(tabContent => {
//             tabContent.classList.remove('active')
//         });

//         tabs.forEach(tab => {
//             tab.classList.remove('active')
//         });
//         target.classList.add('active')
//         tab.classList.add('active')
//     })
// })






//아코디언
/*<div class="accordion">쇼핑몰정보</div>
<div class="panel">
    <ul>
        <li><a href="">내용1</a></li>
    </ul>
</div>*/
// for (let i = 0; i < acc.length; i++) {
//     acc[i].addEventListener("click", function () {
//         this.classList.toggle("active");
//         let panel = this.nextElementSibling;
//         if (panel.style.maxHeight) {
//             panel.style.maxHeight = null;
//         } else {
//             panel.style.maxHeight = panel.scrollHeight + "px";
//         }
//     });
// }