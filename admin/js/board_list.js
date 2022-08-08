let page = 0;
let first = false;
let last = false;
let totalPages = 0;

window.onload = () => {
    fetch(`http://121.145.8.135:8080/v1/api/notice?page=${page}`, {
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
                    noticeLoading(e);
                });

            } else {
                alert("잠시 후 다시 시도해주세요");
            }
        });
}

const noticeLoading = (notice) => {
    let noticeTb = document.getElementById('notice_tb');
    let html = `<tr>
                                        <td headers="mb_list_chk" class="td_chk" rowspan="2">
                                            <input type="checkbox" name="chk[]" value="0" id="chk_${notice.idx}">
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>${notice.title}</td>
                                        <td lang="en">
                                            ${notice.memberDTO.username}</td>
                                        <td lang="en">${notice.createDate}</td>
                                        <td></td>
                                    </tr>`;
    noticeTb.insertAdjacentHTML("beforeend", html);
}