let page = 0;
let first = false;
let last = false;
let totalPages = 0;

window.onload = () => {
    fetch(`http://121.145.8.135:8080/v1/api/admin/member?page=${page}`, {
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
                    memberLoading(e);
                });

            } else {
                alert("잠시 후 다시 시도해주세요");
            }
        });
}

const memberLoading = (member) => {
    let memberTb = document.getElementById('member_tb');
    let html = `<tr>
                                        <td headers="mb_list_chk" class="td_chk" rowspan="2">
                                            <input type="checkbox" name="chk[]" value="0" id="chk_${member.idx}">
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>${member.name}</td>
                                        <td><a href="" lang="en">${member.username}</a> </td>
                                        <td lang="en">
                                            ${member.phone}</td>
                                        <td lang="en">${member.createDate}</td>
                                    </tr>`;
    memberTb.insertAdjacentHTML("beforeend", html);
}