
let orderMenu = [];
let totalCount = 0;
let totalPrice = 0;


// 옵션선택시 출력되는 함수
function changeEvent(option) {
    // 선택된 데이터 가져오기
    const s_option = option.value;
    // 데이터 출력
    document.getElementById('result').innerText = s_option;

}



// 토탈 상품 갯수, 토탈 금액 리프레시
const orderInfoRefresh = () => {
    totalCount = 0;
    totalPrice = 0;
    orderMenu.forEach((e) => {
        totalCount += e.count;
        totalPrice += e.price * e.count;
    });
    document.getElementById('totalQuantitySpan').innerText = totalCount;
    document.getElementById('totalPriceSpan').innerText = `${totalPrice.toLocaleString()}원`;
}




// 선택한 메뉴를 화면에 뿌림
const viewSelectMenu = (menu) => {
    let cartArea = document.getElementById('result');
    let html = `<div class="cart_item" id="cart_item">
                            <div class="top">
                                <span>${menu.name}</span>
                                <button type="button" class="delete" onclick="orderDelete(${menu.id})">X</button>
                            </div>
                            <div class="middle">
                                <span>수량</span>
                                <div class="wrap__quantity">
                                    <button type="button" class="plus" onclick="add(${menu.id})">+</button>
                                    <span class="item_quantity" id="order_${menu.id}">${menu.count}</span>
                                    <button type="button" class="minus" onclick="minus(${menu.id})">-</button>
                                </div>
                            </div>
                            <div class="bottom">
                                <span>가격</span>
                                <span id="order_price_${menu.id}">${menu.price.toLocaleString()}원</span>
                            </div>
                        </div>`;
    cartArea.insertAdjacentHTML("beforeend", html);
}

// 메뉴에서 선택
const selectMenu = (id) => {
    let selectMenu = menu.find((e) => e.id == id);
    let orderMenuItem = orderMenu.find((e) => e.id == id);
    if (orderMenuItem == null) {
        selectMenu.count = 1;
        orderMenu.push(selectMenu);
        viewSelectMenu(selectMenu);
    } else {
        orderMenuItem.count++;
        document.getElementById(`order_${id}`).innerText = orderMenuItem.count;
        document.getElementById(`order_price_${id}`).innerText = `${(orderMenuItem.price * orderMenuItem.count).toLocaleString()}원`;
    }
    orderInfoRefresh();
}

// 주문 리스트에서 해당 상품 삭제
const orderDelete = (id) => {
    orderMenu = orderMenu.filter((e) => e.id != id);
    document.getElementById(`cart_item_${id}`).remove();
    orderInfoRefresh();
}

// 주문 내역에서 갯수 증가
const add = (id) => {
    let item = orderMenu.find((e) => e.id == id);
    item.count++;
    document.getElementById(`order_${id}`).innerText = item.count;
    document.getElementById(`order_price_${id}`).innerText = `${(item.price * item.count).toLocaleString()}원`;
    orderInfoRefresh();
}

// 주문 내역에서 갯수 감소
const minus = (id) => {
    let item = orderMenu.find((e) => e.id == id);
    if (item.count > 1) {
        item.count--;
        document.getElementById(`order_${id}`).innerText = item.count;
        document.getElementById(`order_price_${id}`).innerText = `${(item.price * item.count).toLocaleString()}원`;
        orderInfoRefresh();
    }
}

// const goPaymentPage = () => {
//     // 결제 페이지로 이동할 때 order 리스트를 보관하기 위해 로컬스토리지 사용
//     if (orderMenu.length === 0) {
//         alert('메뉴를 적어도 한 개 선택해주세요');
//         return;
//     }
//     localStorage.setItem('orderMenu', JSON.stringify(orderMenu));
//     // 결제 페이지 이동
//     location.href = 'payment.html';
// }

