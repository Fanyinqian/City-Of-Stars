// 自定义绘本
let addbook_img_input = document.querySelector("#addbook_img_input");
let addbook_show_cover = document.querySelector("#addbook_show_cover");
let addbook_file_input_img = document.querySelector('#addbook_file_input_img');

// 获取左边的剪辑视图的框--用来设置大小和位置
let img_container = document.querySelector('#img_container');
// 左边视图里面的图--用来控制大小
let img_container_img = document.querySelector('#img_container_img');
// 阴影外框
let shadow_box = document.getElementById('shadow_box');
// 阴影里面的图
let shadow_box_img = document.querySelector("#shadow_box_img");
// 阴影显现的图
let crop_show_img = document.getElementById('crop_show_img');
// 用来控制移动的外框
let crop_wrap = document.getElementById('crop_wrap');
// 确定按钮
let popup_sure = document.getElementById('popup_sure');


// 弹窗--关闭
let addbook_popup_notification_wrap = document.getElementById('addbook_popup_notification_wrap');
// 关闭
let addbook_popup_close = document.getElementById('addbook_popup_close');
// 关闭
let popup_close = document.getElementById('popup_close');
// 打开
var addbook_button = document.getElementById('addbook_button');
// 申请精选
let addbook_submit = document.getElementById('addbook_submit');

// 用户上传图片--弹窗功能
addbook_img_input.onchange = function (e) {
    // 渲染放到右边
    var input_info = addbook_img_input.files[0];
    var image_src = URL.createObjectURL(e.target.files[0]);
    addbook_show_cover.src = image_src;
    // 选择图片该窗口消失
    addbook_file_input_img.style.display = 'none';
    //初始化FileReader对象
    if (typeof (addbook_img_input.files) != 'undefined') {
        // 剪辑窗口显示
        addbook_contain_bg.style.display = "block";

        var reader = new FileReader();
        reader.readAsDataURL(addbook_img_input.files[0]);

        var picfile = addbook_img_input.files[0];

        let popup_sure_fun = null;
        reader.onload = function (e) {
            var flag = 1;
            var left_width, left_height;
            //初始化JavaScript图片对象
            var image = new Image();
            //FileReader获得Base64字符串
            image.src = e.target.result;
            console.log(image);
            var formdata_cover = new FormData();
            var blob;
            image.onload = function () {
                //获得图片高宽
                var height = this.height;
                var width = this.width;
                console.log("图片高=" + height + "px, 宽=" + width + "px");
                if (height > width) {
                    left_height = 300;
                    left_width = 300 * width / height;
                    if (left_width > 250) {
                        left_width = 250;
                        left_height = 250 * height / width;
                    }
                    console.log(left_width);
                    img_container.style.left = ((250 - left_width) / 2) + 'px';
                    shadow_box.style.width = left_width + 'px';
                    shadow_box.style.height = left_width * 1.25 + 'px';

                    crop_show_img.style.width = left_width + 'px';
                    crop_show_img.style.height = left_width * 1.25 + 'px';
                    // console.log(crop_show_img.style.width);
                    // console.log(crop_show_img.style.height);
                    addbook_show_cover.style.width = "100%";
                    addbook_show_cover.style.height = "auto";
                } else {
                    left_width = 250;
                    left_height = 250 * height / width;
                    if (left_height > 300) {
                        left_height = 300;
                        left_width = 300 * width / height;
                    }
                    img_container.style.top = ((300 - left_height) / 2) + 'px';
                    shadow_box.style.height = left_height + 'px';
                    shadow_box.style.width = left_height * 0.8 + 'px';

                    crop_show_img.style.height = left_height + 'px';
                    crop_show_img.style.width = left_height * 0.8 + 'px';

                    addbook_show_cover.style.height = "100%";
                    addbook_show_cover.style.width = "auto";
                }

                img_container.style.width = left_width + 'px';
                img_container.style.height = left_height + 'px';

                img_container_img.style.width = left_width + 'px';
                img_container_img.style.height = left_height + 'px';
                img_container_img.src = image_src;
                // 剪辑出来的图片--大小--阴影以外的部分
                shadow_box_img.style.width = left_width + 'px';
                shadow_box_img.style.height = left_height + 'px';

                shadow_box_img.src = image_src;

                // 右侧背景图片渲染
                addbook_pre_container.style.backgroundImage = "url(" + image_src + ")";
                drag(crop_show_img);
                stopdrag(crop_show_img)

                // 移动函数
                function drag(obj) {
                    obj.onmousedown = function (event) {
                        //2.这行代码的作用？
                        event = event || window.event;
                        //div的偏移量 鼠标.clientX-元素.offsetLeft
                        //div的偏移量 鼠标.clientY-元素.offsetTop
                        var ol = event.clientX - obj.offsetLeft;
                        var ot = event.clientY - obj.offsetTop;

                        const showPreContainerBCR = addbook_pre_container.getBoundingClientRect();
                        const shadowBoxBCR = shadow_box.getBoundingClientRect();


                        //1.当鼠标在被拖拽元素上按下时，开始拖拽
                        document.onmousemove = function (event) {
                            //设置box1捕获所有鼠标按下的事件
                            //setCapture可以将鼠标事件锁定在指定的元素上，当元素捕获了鼠标事件后，该事件只能作用在当前元素上。
                            obj.setCapture && obj.setCapture();
                            //2.当鼠标移动时被拖拽元素跟随鼠标移动
                            event = event || window.event;
                            var left = event.clientX - ol;
                            var top = event.clientY - ot;

                            if (left_height == 300) {
                                if (top > (300 - crop_show_img.clientHeight)) {
                                    top = 300 - crop_show_img.clientHeight;
                                }
                                if (top < 0) {
                                    top = 0;
                                }

                                var vadio2 = showPreContainerBCR.width / shadowBoxBCR.width;

                                obj.style.top = top + "px";
                                shadow_box.style.top = top + "px";
                                shadow_box_img.style.top = "-" + top + "px";

                                // addbook_show_cover.style.top = "-" + top * addbook_show_cover.height / 250 + "px";
                                addbook_show_cover.style.top = "-" + (vadio2 * top) + "px";

                            }
                            if (left_width == 250) {
                                if (left > (250 - crop_show_img.clientWidth)) {
                                    left = 250 - crop_show_img.clientWidth;
                                }
                                if (left < 0) {
                                    left = 0;
                                }
                                var vadio1 = showPreContainerBCR.width / shadowBoxBCR.width;
                                obj.style.left = left + "px";
                                shadow_box.style.left = left + "px";
                                shadow_box_img.style.left = "-" + left + "px";
                                // 右侧图片移动
                                // addbook_show_cover.style.left = "-" + left * addbook_show_cover.width / 200 + "px";
                                addbook_show_cover.style.left = "-" + (vadio1 * left) + "px";

                            }
                        }

                        //为元素绑定一个鼠标松开函数
                        document.onmouseup = function () {
                            // 3.当鼠标松开时，被拖拽元素固定在当前位置
                            document.onmousemove = null;
                            document.onmouseup = null;
                            //当鼠标松开时取消捕获
                            obj.releaseCapture && obj.releaseCapture();
                        }
                        return false;
                    }
                }

                function stopdrag(obj) {
                    obj.onmouseup = function (e) {
                        var cut_x, cut_y;

                        if (shadow_box.style.left == '') {
                            cut_x = 0;
                        } else {
                            cut_x = parseInt(shadow_box.style.left);
                        }
                        if (shadow_box.style.top == '') {
                            cut_y = 0;
                        } else {
                            cut_y = parseInt(shadow_box.style.top);
                        }

                        var image_cut = new Image();
                        image_cut.src = image_src;
                        console.log(image_cut.src);
                        var canvas = document.getElementById('canvas');
                        canvas.width = 200;
                        canvas.height = 250;
                        var ctx = canvas.getContext('2d');

                        // var scale = 200 / image_cut.width;
                        // console.log(scale);
                        console.log(image_cut.height * 0.8);
                        console.log(image_cut.height);
                        ctx.drawImage(image_cut, image_cut.width * cut_x / 200, image_cut.height * cut_y / 250, image_cut.height * 0.8, image_cut.height, 0, 0, 200, 250);
                        // ctx.drawImage(image_cut, cut_x, cut_y, 200, 250, 0, 0, 500, 500);
                        let imgData = ctx.getImageData(0, 0, 200, 250);

                        var data_img = canvas.toDataURL();
                        data_img = data_img.split(',')[1];
                        data_img = window.atob(data_img);
                        var ia = new Uint8Array(data_img.length);
                        for (var i = 0; i < data_img.length; i++) {
                            ia[i] = data_img.charCodeAt(i);
                        }

                        blob = new Blob([ia], {
                            type: "image/png"
                        });
                        console.log(blob);

                    }
                }
            }
            if (popup_sure_fun !== null) {
                popup_sure.removeEventListener('click', popup_sure_fun)
            }

            popup_sure_fun = function popup_sure_fun() {
                // 获取文件上传对象
                // formdata_cover.append('file', picfile);
                if (blob != undefined) {
                    formdata_cover.append('file', blob);
                } else {
                    formdata_cover.append('file', picfile);
                }


                let bookline2 = document.getElementById('bookline2');
                let input_book_name = document.getElementById('input_book_name');

                formdata_cover.append('pictureBookName', input_book_name.value);
                formdata_cover.append('userId', getCookie('userId'));

                let xhr = new XMLHttpRequest();
                xhr.open('post',
                    'http://106.55.197.233:666/cityofstar/pictureBook/addPictureBook', true);
                xhr.send(formdata_cover);
                // 控制只发一次请求
                if (flag == 1) {
                    flag = 0;
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                const {
                                    code,
                                    data,
                                    msg
                                } = JSON.parse(xhr.responseText);
                                // if (typeof callback === "function") {
                                console.log(code);
                                if (code == 200) {
                                    show_cover2_ajax();
                                    console.log(picbookSelfId['picid0']);
                                    console.log(picbookSelfId['picid1']);
                                    input_book_name.value = '';
                                }
                            }
                        }
                    }



                    // var add_book = document.createElement('div');
                    // add_book.classList.add("card");
                    // add_book.classList.add("item_selfbook");
                    // add_book.innerHTML = `
                    //             <div class="imgBox">
                    //                 <img src="${image.src}" alt="">
                    //             </div>
                    //         `;
                    // bookline2.insertBefore(add_book, addbook_button);



                    addbook_popup_notification_wrap.style.display = "none";
                    addbook_contain_bg.style.display = 'none';
                    addbook_file_input_img.style.display = 'flex';

                    shadow_box_img.src = "";
                    shadow_box.src = null;

                    addbook_pre_container.style.backgroundImage = null;
                    addbook_show_cover.src = "";
                    image.src = "";
                    input_info = "";

                    img_container.style.top = '0px';
                    img_container.style.left = '0px';

                    shadow_box.style.top = "0px";
                    shadow_box.style.left = "0px";

                    shadow_box_img.style.left = "0px";
                    shadow_box_img.style.top = "0px";

                    img_container.style.width = 'auto';
                    img_container.style.height = 'auto';

                    crop_show_img.style.left = "0px";
                    crop_show_img.style.top = "0px";

                    addbook_show_cover.style.top = '0px';
                    addbook_show_cover.style.left = '0px';
                }
                // addbookpage();
                init2();
            }

            popup_sure.addEventListener('click', popup_sure_fun)
        }

    }
}


addbook_popup_close.addEventListener('click', () => {
    addbook_popup_notification_wrap.style.display = "none";
})

popup_close.addEventListener('click', () => {
    addbook_popup_notification_wrap.style.display = "none";
})

addbook_button.addEventListener('click', () => {
    addbook_popup_notification_wrap.style.display = "flex";
})



// 下拉框
let choice_svg = document.getElementById('choice_svg');
let select_option_book = document.getElementById('select_option_book');

choice_svg.addEventListener('click', () => {
    console.log("下拉框");
    select_option_book.style.visibility = 'visible';
    select_option_book.style.opacity = '1';
    event.stopPropagation(); //阻止冒泡
})

window.addEventListener('click', function () {
    select_option_book.style.visibility = 'hidden';
    select_option_book.style.opacity = '0';
});

// 申请绘本精选
let addbook_submit_notification_wrap = document.getElementById('addbook_submit_notification_wrap');
let submit_addbook_close = document.getElementById('submit_addbook_close');

submit_addbook_close.addEventListener('click', () => {
    addbook_submit_notification_wrap.style.display = 'none';
})

addbook_submit.addEventListener('click', () => {
    addbook_submit_notification_wrap.style.display = 'block';
})