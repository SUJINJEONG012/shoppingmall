import {headerRender} from "/js/header_top.js";

let page = 0;
let first = false;
let last = false;
let totalPages = 0;

window.onload = () => {
    console.log('샵페이지');
    headerRender();
    console.log("로딩");
    fetch(`http://121.145.8.135:8080/v1/api/product?page=${page}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.code === 200){
                console.log(res.content);
                console.log(res.content.content);
                page = res.content.number;
                first = res.content.first;
                last = res.content.last;
                totalPages = res.content.totalPages;
                res.content.content.forEach((e)=>{
                    itemLoading(e);
                });

            } else {
                alert("잠시 후 다시 시도해주세요");
            }
        });
}

const itemLoading = (item) => {
    let listContainer = document.getElementById('list_container');
    let html = `<div class="thumbnail-list" id="item_${item.idx}">
                            <a href="../../shoppingmall/page/detail/product_detail.html?idx=${item.idx}">
                                <img src="${item.fileDTO.files[0].url}" alt="의류옷">

                                <div class="thumbnail-over-text">
                                    <ul>
                                        <li class="thumbnail-name" lang="en">${item.name}
                                        </li>
                                        <li class="thumbnail-price" lang="en">${item.price.toLocaleString()}won</li>
                                    </ul>
                                </div>
                            </a>
                        </div>`;
    listContainer.insertAdjacentHTML("beforeend", html);
}