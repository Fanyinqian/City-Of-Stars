var picbookId = {}
var picbookSelfId = {}
// 返回上一页的按钮
let last_html = document.getElementById('last_html');
last_html.onclick = () => {
    window.history.back(-1);
}
// 收起书架按钮
let button = document.getElementById('bookshelf_button');
var bookshelf = document.getElementById('bookshelf');
button.onclick = () => {
    bookshelf.classList.toggle('ani');
}
// 获取第一行书架
var bookline1 = document.getElementById('bookline1');
show_cover1_ajax();
// 获取所有的精选绘本
let book_wrap_all = document.getElementById('book_wrap_all');
let show_all_picbook_wrap = document.getElementById('show_all_picbook_wrap');
let show_all_picbook_nice_wrap = document.getElementById('show_all_picbook_nice_wrap');
document.getElementById('show_click_nice_wrap').addEventListener('click', () => {
    if (show_all_picbook_nice_wrap.style.display == 'none') {
        show_all_picbook_nice_wrap.style.display = 'block';
        show_all_picbook_wrap.style.display = 'none';
        // event.stopPropagation();
    } else {
        show_all_picbook_nice_wrap.style.display = 'none';
    }
})

// 渲染书架第一行
function show_cover1_ajax() {
    bookline1_str = '';
    sealAjax({
        url: "http://106.55.197.233:666/cityofstar/pictureBook/getPickedPictureBookList",
        type: "get",
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        console.log(res.data);
        var line1_cover_images = res.data;
        // console.log(line1_cover_images);
        let book_wrap_all_str = '';
        for (let i = 0; i < line1_cover_images.length; i++) {
            picbookId['picid' + i] = line1_cover_images[i].pictureBookId;
            book_wrap_all_str += `
            <div class="new_book_item item_nice_book">
                <div class="image">
                    <img src="${head+line1_cover_images[i].bookCover}" alt="">
                </div>
                <div class="name">
                    ${line1_cover_images[i].pictureBookName}
                </div>
            </div>
            `;
        }
        book_wrap_all.innerHTML = book_wrap_all_str;
        let item_nice_book = document.getElementsByClassName('item_nice_book');
        // 点击每一个精选绘本会显示响应的图片
        for (let i = 0; i < item_nice_book.length; i++) {
            item_nice_book[i].addEventListener('click', () => {
                ajfun_showbook(item_nice_book[i], i);
                bookshelf.classList.add('ani');
                // show_all_picbook_wrap.style.display = 'none';
                // show_all_picbook_nice_wrap.style.display = 'none';
                console.log(i);
            })
        }
        // 绑定精选绘本的点击事件
        // console.log(line1_cover_images[4].bookCover);
        line1_cover_str = '';
        // if (line1_cover_images != '') {
        for (var i = 0; i < 4; i++) {
            if (line1_cover_images[i] == null) {
                return;
            }
            console.log(i);
            line1_cover_str += `
    <div class="card item_picbook"'>
        <div class="imgBox">
            <img src="http://106.55.197.233:666/upload/${line1_cover_images[i].bookCover}" alt="">
        </div>
        <div class='details'>
            ${line1_cover_images[i].pictureBookName}
        </div>
    </div>
    `;
            // picbookId['picid' + i] = line1_cover_images[i].pictureBookId;
        }
        bookline1.innerHTML = line1_cover_str;
        init();
    });
}
let bookId = {};
let bookName = {};
let click_submit_sure = null;
// 消息弹框
let change_success = document.getElementById('change_success');
let change_seccess_box = document.getElementById('change_seccess_box');
// 获取第二行书架
var bookline2 = document.getElementById('bookline2');
show_cover2_ajax();
// 显示全部个人绘本
let nice_book_wrap = document.getElementById('nice_book_wrap');
let show_click_wrap = document.getElementById('show_click_wrap');
// let show_all_picbook_wrap = document.getElementById('show_all_picbook_wrap');
show_click_wrap.addEventListener('click', () => {
    console.log(show_all_picbook_wrap);
    if (show_all_picbook_wrap.style.display == 'none') {
        show_all_picbook_wrap.style.display = 'block';
        show_all_picbook_nice_wrap.style.display = 'none';
    } else {
        show_all_picbook_wrap.style.display = 'none';
    }
    // console.log(888);
})
// 渲染书架第二行
function show_cover2_ajax() {
    select_option_book.innerHTML = '';
    sealAjax({
        url: "http://106.55.197.233:666/cityofstar/pictureBook/getPictureBookList",
        type: "get",
        data: {
            userId: getCookie('userId')
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        console.log(res.data);
        if (res.data == undefined) {
            return;
        }
        // 删除之前的
        // console.log(res.data);
        var len = item_selfbook.length;
        for (j = len - 1; j >= 0; j--) {
            if (item_selfbook[j] != undefined) {
                item_selfbook[j].remove();
            }
        }

        line2_cover_images = res.data;
        // console.log(line2_cover_images);

        // 渲染申请精选绘本的第一本
        let select_option_str = '';
        let nice_book_str = '';
        for (let j = 0; j < line2_cover_images.length; j++) {
            bookId["bookId" + j] = line2_cover_images[j].pictureBookId;
            bookName["bookName" + j] = line2_cover_images[j].pictureBookName;

            select_option_str += `
                    <div class="book_name">${line2_cover_images[j].pictureBookName}</div>
                `;
            // 全部的个人绘本的渲染
            nice_book_str += `
                <div class="new_book_item item_per_picbook">
                <div class="image">
                    <img src="${head+line2_cover_images[j].bookCover}" alt="">
                </div>
                <div class="name">
                    ${line2_cover_images[j].pictureBookName}
                </div>
            </div>
                `;
        }
        // 全部的个人绘本的渲染
        nice_book_wrap.innerHTML = nice_book_str;
        let item_per_picbook = document.getElementsByClassName('item_per_picbook');
        for (let i = 0; i < item_per_picbook.length; i++) {
            item_per_picbook[i].addEventListener('click', () => {
                bookshelf.classList.remove('ani');
                // show_all_picbook_wrap.style.display = 'none';
                // show_all_picbook_nice_wrap.style.display = 'none';
                addbookpage(i);
            })
        }
        // 点击确定精选绘本事件
        let submit_addbook_sure = document.getElementById('submit_addbook_sure');
        let submit_addbook_textarea = document.getElementById('submit_addbook_textarea');
        if (click_submit_sure !== null) {
            submit_addbook_sure.removeEventListener('click', click_submit_sure);
            console.log("remove");
        }

        // 绑定输入框事件
        submit_addbook_textarea.addEventListener('focus', () => {
            submit_addbook_sure.addEventListener('click', click_submit_sure);
        })

        // 点击确定按钮发送申请绘本精选
        click_submit_sure = function click_submit_sure() {
            let value = submit_addbook_textarea.value;
            let book_name = choice_bookname.innerHTML;
            console.log("click");
            if (value != "") {
                console.log(value);
                console.log(book_name);

                for (let j = 0; j < line2_cover_images.length; j++) {
                    // 判断是哪一本绘本
                    if (book_name == bookName["bookName" + j]) {
                        sealAjax({
                            url: 'http://106.55.197.233:666/cityofstar/backstage/submit',
                            type: 'post',
                            data: {
                                pictureBookId: bookId["bookId" + j],
                                reason: value
                            }
                        }).then(res => {
                            if (res.code == 200) {
                                console.log("用户将绘本提交到精选");
                                change_success.classList.add('change')
                                change_success.innerHTML = "申请成功";
                                change_seccess_box.style.display = 'flex';
                                setTimeout(() => {
                                    change_success.classList.remove('change')
                                    change_seccess_box.style.display = 'none';
                                }, 2000)
                                submit_addbook_close.click()
                                submit_addbook_textarea.value = "";
                                choice_bookname.value = "请选择"
                            }
                            if (res.code == 500) {
                                console.log("该绘本正在审核中，请勿重复提交");
                                change_success.classList.add('change')
                                change_success.innerHTML = "正在审核中";
                                change_seccess_box.style.display = 'flex';
                                setTimeout(() => {
                                    change_success.classList.remove('change')
                                    change_seccess_box.style.display = 'none';
                                }, 2000)
                            }

                        })
                    }
                }

            } else {
                console.log("请完善资料2");
                change_success.classList.add('change')
                change_success.innerHTML = "请完善资料";
                change_seccess_box.style.display = 'flex';
                setTimeout(() => {
                    change_success.classList.remove('change')
                    change_seccess_box.style.display = 'none';
                }, 1000)
            }
        }

        select_option_book.innerHTML = select_option_str;
        // 绑定申请绘本点击事件
        let book_name = document.getElementsByClassName('book_name');
        let choice_bookname = document.getElementById('choice_bookname');
        for (let i = 0; i < book_name.length; i++) {
            book_name[i].addEventListener('click', () => {
                console.log(book_name[i].innerHTML);
                choice_bookname.innerHTML = book_name[i].innerHTML;
            })
        }
        // 只上传最后两本
        for (var i = line2_cover_images.length - 1; i > line2_cover_images.length - 3; i--) {
            if (i < 0) {
                break;
            }
            // console.log(i);
            line2_cover_str = '';
            var line_cover_div2 = document.createElement('div');
            line_cover_div2.classList.add("card");
            line_cover_div2.classList.add("item_selfbook");
            // 设置id

            line_cover_div2.classList.remove("last_html");
            line2_cover_str = `
            <div class="imgBox">
                <img src="http://106.55.197.233:666/upload/${line2_cover_images[i].bookCover}" alt="">
            </div> 
            <div class='details'>
            ${line2_cover_images[i].pictureBookName}
            </div>
            `;

            // 存储用户的书本的id 
            picbookSelfId['picid' + (line2_cover_images.length - i - 1)] = line2_cover_images[i].pictureBookId;
            console.log('picid' + (line2_cover_images.length - i - 1) + "=" + line2_cover_images[i].pictureBookId);

            line_cover_div2.innerHTML = line2_cover_str;
            bookline2.insertBefore(line_cover_div2, addbook_button);
        }
        let new_book_item = document.getElementsByClassName('new_book_item');
        for (let i = 0; i < new_book_item.length; i++) {
            new_book_item[i].addEventListener('click', () => {
                console.log(i);
            })
        }
        // 绑定全部绘本点击事件
        init2();
    })
}



// 页码
var pageNum = 0;
// 运动的页面
let runPage = document.getElementsByClassName('runPage');
// 正面
let one = document.getElementsByClassName('one');
// 反面
let two = document.getElementsByClassName('two');
// 下一页按钮
let nextBtn = document.getElementById('nextBtn');
// 上一页按钮
let lastBtn = document.getElementById('lastBtn');
// 书的节点，用来添加页数
var bookBox = document.getElementById('bookBox');
// 图片编辑大盒子--控制是否显示
let addbook_contain_bg = document.getElementById('addbook_contain_bg');

// 设置前面的路径
let head = "http://106.55.197.233:666/upload/";

// 存放绘本页的二维数组
let images = [];
// 获取书架上面的书，用来点击响应
var item_picbook = document.getElementsByClassName('item_picbook');
// 获取书架上面的书，用来点击响应

var item_selfbook = document.getElementsByClassName('item_selfbook');
// 获取第一页的图片，用来直接修改路径
let first_img = document.getElementById('first_img');

// 获取绘本的内容
function ajfun_showbook(e, i) {
    // 当用户点击对应的书架上面的书本的时候
    // item_picbook[i].addEventListener('click', () => {
    // 收起书架
    bookshelf.classList.toggle('ani');
    // 让书本的页码直接变成0
    pageNum = 0;
    console.log(picbookId['picid' + i]);
    console.log(i);
    // 调用ajax请求
    sealAjax({
        // 请求路径
        url: "http://106.55.197.233:666/cityofstar/pictureBookImg/getPictureBookImgList",
        type: "get",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        // 传书本对应的id
        data: {
            pictureBookId: picbookId['picid' + i]
        }
    }).then(res => {
        console.log(res.data);
        // 将上一本书的页码清空
        var toremove = document.querySelectorAll('.runPage');
        for (let index = 0; index < toremove.length; index++) {
            toremove[index].parentNode.removeChild(toremove[index]);
        }
        // 获取图片信息存入images数组
        images = res.data;
        // console.log(images);
        // 判断如果不为空则进行渲染
        // if (images.pictureBookImgUrl.pageSize > 0)
        if (images != null) {
            // console.log("init");
            // console.log(images.pictureBookImgUrl.length);
            for (var index = 0; index < images.pictureBookImgUrl.length; index++) {
                // 调用新增函数页数
                show_init(index);
                // console.log("init");
            }

        }
        // 设置第一张图片
        first_img.setAttribute('src', head + images.pictureBook.bookCover);
        // 将页面的内容放进绘本里面渲染出来
        function show_init(index) {
            // 新建div
            var runPage_div = document.createElement('div');
            // 添加class
            runPage_div.classList.add("runPage");
            runPage_div.classList.add("bookPage");
            // 添加一页的正反面
            runPage_div.innerHTML = `
                    <div class="bookWord runPage_div one">
                        <img src="${head + images.pictureBookImgUrl[index][0]}" alt="">
                    </div>
                    <div class="two_box">
                        <img src="${head + images.pictureBookImgUrl[index][1]}" class="runPage_img two" style="transform: rotateY(180deg);"/>
                    </div>`;
            // 插入
            bookBox.insertBefore(runPage_div, last);
            // 设置页面层级
            setIndex();
        }
    })
}

// init();
// 绑定点击事件
function init() {
    console.log("调用init");
    for (var index = 0; index < 4; index++) {
        item_click_fun(index);
    }
}

function item_click_fun(index) {
    item_picbook[index].onclick = function () {
        ajfun_showbook(item_picbook[index], index);
    };
}
// init2();
function init2() {
    console.log("调用init2");
    for (var i = 0; i < item_selfbook.length; i++) {
        if (i >= 2) {
            break;
        }
        item_click_fun2(i);
        console.log(i);
    }
}

function item_click_fun2(index) {
    item_selfbook[index].onclick = function () {
        addbookpage(index);
    };
}