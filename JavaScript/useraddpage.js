var item_selfbook = document.getElementsByClassName('item_selfbook');
var bookshelf = document.getElementById('bookshelf');

var pageaddNum = 0;

// 下一页
nextBtn.onclick = () => {
    if (pageNum < runPage.length) {
        if (isclick) {
            isclick = false;
            // 向左翻动页面
            runNext(pageNum);
            pageNum++;
        }
    };
}
// 上一页 左边向右翻动去到下一页
lastBtn.addEventListener('click', () => {
    if (pageNum >= 1) {
        if (isclick) {
            isclick = false;
            pageNum--;
            runLast(pageNum);
        }
    };
})

var letindex;

function addbookpage(i) {
    var recordpage = 0;
    // 收起书架
    nextBtn.addEventListener('click', () => {
        if (recordpage < runPage.length) {
            recordpage++;
        }
    });
    lastBtn.addEventListener('click', () => {
        if (recordpage >= 1) {
            recordpage--;
        }
    });
    // 删除上一本书的页数
    var toremove = document.querySelectorAll('.runPage');
    for (let index = 0; index < toremove.length; index++) {
        toremove[index].parentNode.removeChild(toremove[index]);
    }
    // setIndex();
    console.log(i);
    addbook(i);
    // 设置封面
    // 发送ajax请求
    // first_img.setAttribute('src', `./img/addpic2.png`);

    function addbook(index) {
        var bookBox = document.getElementById('bookBox');
        var last = document.getElementById('last');
        // 显示原有的页面
        bookshelf.classList.toggle('ani');
        // 让书本的页码直接变成0
        pageNum = 0;
        recordpage = 0;

        letindex = index;
        console.log(picbookSelfId['picid' + index]);
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
                pictureBookId: picbookSelfId['picid' + index]
            }
        }).then((res) => {
            console.log(letindex);
            // 将上一本书的页码清空
            var toremove = document.querySelectorAll('.runPage');
            for (let index = 0; index < toremove.length; index++) {
                toremove[index].parentNode.removeChild(toremove[index]);
            }
            // 获取图片信息存入images数组
            images = res.data;
            console.log(images);
            // console.log(images);
            // 判断如果不为空则进行渲染
            if (images.pictureBook.pageSize > 0) {
                // if (images.pictureBookImgUrl.pageSize > 0) {
                // console.log("init");
                console.log(images.pictureBookImgUrl.length);
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
                // first_img.setAttribute('src', head + images.pictureBook.bookCover);
                // 新建div
                var runPage_div = document.createElement('div');
                // 添加class
                runPage_div.classList.add("runPage");
                runPage_div.classList.add("bookPage");
                var own_page_src1;
                var own_page_src2;

                var own_page_0 = images.pictureBookImgUrl[index][0];
                var own_page_1 = images.pictureBookImgUrl[index][1];
                // 如果反面为空
                // if (own_page_1 == null) {
                //     own_page_src2 = "./images/bookRight.png";
                //     console.log("null");
                // } else {
                //     own_page_src2 = head + own_page_1;
                // }
                // 添加一页的正反面
                runPage_div_str = '';
                runPage_div_str += `
                    <div class="bookWord runPage_div one own_page_img">
                        <img src="${head + own_page_0}" alt="">
                    </div>`
                if (own_page_1 == null) {
                    runPage_div_str += `
                    <div class="two_box own_page_img">
                        <label for="addbook_inputPic2" class="addbook_inputPic">
                            <img src="./images/addpic2.png" class="runPage_img two own_page_img" id="addbook_inputPic_img2" style="z-index: 2;">
                            <input type="file" id="addbook_inputPic2" style="display:none">
                        </label>
                        </div>
                        `
                } else {
                    runPage_div_str += `
                    <div class="two_box own_page_img">
                        <img src="${head + own_page_1}" class="runPage_img two" style="transform: rotateY(180deg);"/>
                    </div>`;
                }

                runPage_div.innerHTML = runPage_div_str;
                // 插入
                bookBox.insertBefore(runPage_div, last);
                // 设置页面层级
                setIndex();
            }

            // 让书本的页码直接变成0
            var runPage_div = document.createElement('div');
            runPage_div.classList.add("runPage");
            runPage_div.classList.add("bookPage");
            runPage_div.innerHTML = `
                <div class="bookWord runPage_div one own_page">
                    <label for='addbook_inputPic' class='addbook_inputPic' style='z-index:999'>
                    <img src="./images/addpic2.png" alt="" id='addbook_inputPic_img1' class='own_page_img'>
                    <input type='file' id='addbook_inputPic' style='display:none'>
                </div>
                <div class="two_box own_page">
                    <label for='addbook_inputPic2' class='addbook_inputPic'>
                    <img src="./images/addpic2.png" class="runPage_img two own_page_img" id='addbook_inputPic_img2'>
                    <input type='file' id='addbook_inputPic2' style='display:none' >
                </div>`;
            // 插入
            bookBox.insertBefore(runPage_div, last);
            setIndex();
            console.log(letindex);
            addbook_input_button(letindex);
        })

        function addbook_input_button(letindex) {

            let runPage = document.getElementsByClassName('runPage');
            let one = document.getElementsByClassName('one');
            let two = document.getElementsByClassName('two');
            for (var i = 0; i < runPage.length; i++) {
                runPage[i].style.zIndex = runPage.length * 2 + 1 - i * 2;
                one[i].style.zIndex = runPage.length * 2 + 1 - i * 2;
                two[i].style.zIndex = runPage.length * 2 - i * 2;
            };
            
            console.log(index);
            let addbook_inputPic = document.getElementById('addbook_inputPic');
            let addbook_inputPic2 = document.getElementById('addbook_inputPic2');
            let addbook_inputPic_img1 = document.getElementById('addbook_inputPic_img1');
            let addbook_inputPic_img2 = document.getElementById('addbook_inputPic_img2');
            var own_page_img = document.getElementsByClassName('own_page_img');
            var image_page = 0;
            // 给反面添加
            addbook_inputPic2.onchange = function (e) {
                console.log("给反面添加");
                console.log(letindex);
                own_page_img = document.getElementsByClassName('own_page_img');
                if (typeof (addbook_inputPic2.files) != 'undefined') {
                    var reader2 = new FileReader();
                    var picfile2 = addbook_inputPic2.files[0];

                    // 获取文件上传对象
                    var formdata_page2 = new FormData();
                    // 图片
                    formdata_page2.append('file', picfile2);
                    // 书本id
                    console.log(picbookSelfId['picid' + letindex]);
                    formdata_page2.append('pictureBookId', picbookSelfId['picid' + letindex]);
                    // 左右
                    formdata_page2.append('position', '右');
                    // 页码
                    formdata_page2.append('pageNum', recordpage);
                    console.log("当前页码");
                    console.log(recordpage);
                    let xhr2 = new XMLHttpRequest();
                    xhr2.open('post',
                        'http://106.55.197.233:666/cityofstar/pictureBookImg/addPictureBookImg', true);
                    xhr2.send(formdata_page2);
                    xhr2.onreadystatechange = () => {
                        if (xhr2.readyState === 4) {
                            if (xhr2.status === 200) {
                                const {
                                    code,
                                    data,
                                    msg
                                } = JSON.parse(xhr2.responseText);
                                // if (typeof callback === "function") {
                                console.log(code);
                                console.log(16666666);
                                if (code == 200) {
                                    image_page = 2 * recordpage;
                                    console.log("设置的src第几个");
                                    console.log(image_page - 1);
                                    // addbook_inputPic_img2.src = URL.createObjectURL(e.target.files[0]);
                                    own_page_img[image_page - 1].src = URL.createObjectURL(e.target
                                        .files[0]);

                                    var a = recordpage;
                                    while (a > 0) {
                                        console.log("运行了n次的向右增加");
                                        console.log(a);
                                        a--;
                                        addzIndexNext(a, runPage[a]);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // 给正面添加
            addbook_inputPic.onchange = function (e) {
                console.log(letindex);
                console.log("给正面添加");
                own_page_img = document.getElementsByClassName('own_page_img');
                // pageaddNum++;
                // var image_src = URL.createObjectURL(e.target.files[0]);
                if (typeof (addbook_inputPic.files) != 'undefined') {
                    var reader = new FileReader();
                    var picfile = addbook_inputPic.files[0];
                    // 获取文件上传对象
                    let formdata_page2 = new FormData();
                    // 图片
                    formdata_page2.append('file', picfile);
                    // 书本id
                    console.log("上传的绘本id");
                    console.log(letindex);
                    console.log(picbookSelfId['picid' + letindex]);
                    formdata_page2.append('pictureBookId', picbookSelfId['picid' + letindex]);
                    // 左右
                    formdata_page2.append('position', '左');
                    // 页码
                    formdata_page2.append('pageNum', recordpage + 1);
                    console.log("当前页码");
                    console.log(recordpage + 1);
                    console.log(formdata_page2.get('file'));
                    console.log(formdata_page2.get('pictureBookId'));
                    console.log(formdata_page2.get('position'));
                    let xhr2 = new XMLHttpRequest();
                    xhr2.open('post',
                        'http://106.55.197.233:666/cityofstar/pictureBookImg/addPictureBookImg', true);
                    xhr2.send(formdata_page2);
                    xhr2.onreadystatechange = () => {
                        if (xhr2.readyState === 4) {
                            if (xhr2.status === 200) {
                                const {
                                    code,
                                    data,
                                    msg
                                } = JSON.parse(xhr2.responseText);
                                // if (typeof callback === "function") {
                                if (code == 200) {
                                    if (recordpage == 0) {
                                        image_page = 0;
                                        console.log(image_page);
                                        own_page_img[0].setAttribute('src', URL.createObjectURL(e.target
                                            .files[0]))
                                    } else {
                                        image_page = 2 * recordpage;
                                        own_page_img[image_page].setAttribute('src', URL
                                            .createObjectURL(e.target.files[0]))
                                    }
                                    addbookinput();
                                    var a = recordpage;
                                    while (a > 0) {
                                        console.log("运行了n次的向右增加");
                                        console.log(a);
                                        a--;
                                        addzIndexNext(a, runPage[a]);
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    }



    function addzIndexNext(index, element) {
        console.log(index);
        element.style.zIndex = index * 2 + 2;
        one[index].style.zIndex = index * 2 + 2;
        two[index].style.zIndex = index * 2 + 3;
    }
    // 添加点击按钮的页数
    function addbookinput() {
        console.log("添加两个添加按钮");
        var runPage_div = document.createElement('div');
        runPage_div.classList.add("runPage");
        runPage_div.classList.add("bookPage");
        runPage_div.innerHTML = `
                <div class="bookWord runPage_div one own_page">
                    <label for='addbook_inputPic' class='addbook_inputPic' style='z-index:999'>
                    <img src="./images/addpic2.png" alt="" id='addbook_inputPic_img1' class='own_page_img'>
                    <input type='file' id='addbook_inputPic' style='display:none'>
                </div>
                <div class="two_box own_page">
                    <label for='addbook_inputPic2' class='addbook_inputPic'>
                    <img src="./images/addpic2.png" class="runPage_img two own_page_img" id='addbook_inputPic_img2'>
                    <input type='file' id='addbook_inputPic2' style='display:none' >
                </div>`;
        // 插入
        bookBox.insertBefore(runPage_div, last);
        setIndex();
        // zIndexLast(pageNum, runPage[pageNum]);
    }
    // 记录在第几页了
}

function setIndex() {
    let runPage = document.getElementsByClassName('runPage');
    let one = document.getElementsByClassName('one');
    let two = document.getElementsByClassName('two');
    for (var i = 0; i < runPage.length; i++) {
        runPage[i].style.zIndex = runPage.length * 2 + 1 - i * 2;
        one[i].style.zIndex = runPage.length * 2 + 1 - i * 2;
        two[i].style.zIndex = runPage.length * 2 - i * 2;
    };
}