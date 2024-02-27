// 按钮 
let banner_btn_left = document.getElementById('banner_btn_left');
let banner_btn_right = document.getElementById('banner_btn_right');
let banner_show_item = document.getElementsByClassName('banner_show_item');
let banner_show_item_img1 = document.getElementById('banner_show_item_img1');
let banner_show_item_img2 = document.getElementById('banner_show_item_img2');
let banner_show_item1 = document.getElementById('banner_show_item1');
let banner_show_item2 = document.getElementById('banner_show_item2');
let banner_show_box = document.getElementById('banner_show_box');
let banner_info_box = document.getElementsByClassName('banner_info_box');
let banner = document.getElementById('banner');
let count = 0;
let funflag = true;
banner_btn_right.addEventListener('click', () => {
    if (funflag) {
        funflag = false;
        let banner_show_item_first = banner_show_item[0];
        banner_show_item[0].style.width = "0px";
        banner_show_item[0].style.height = "0px";
        banner_show_item[1].style.margin = "0px";
        setTimeout(() => {
            banner_show_item_first.remove();
            banner_show_box.appendChild(banner_show_item_first);
            banner_show_item_first.style.width = "440px";
            banner_show_item_first.style.height = "560px";
            banner_show_item_first.style.marginLeft = '35px';
            funflag = true;
        }, 1000)
        banner_info_box[count].style.opacity = '0';
        count = (count + 1) % 4;
        banner_info_box[count].style.opacity = '1';
    }
})


banner_timer = setInterval(function () {
    banner_btn_right.click();
    // console.log(123);
}, 2000)

banner.addEventListener('mouseover', () => {
    clearInterval(banner_timer);
    // console.log("离开");
})

banner.addEventListener('mouseout', () => {
    // console.log(123);
    banner_timer = setInterval(function () {
        banner_btn_right.click();

    }, 2000)
})