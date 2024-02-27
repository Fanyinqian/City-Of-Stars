let clickBtn = document.querySelector('.click');
let interact = document.querySelector('.is-not-interacting');
let chapter = document.querySelectorAll('.chapter');
let nav = document.querySelector('.nav');
// 获取关闭按钮
let close = document.querySelector('.close');
clickBtn.onclick = () => {
    interact.className = "is-interacting";
    let timer = setTimeout(function () {
        chapter[0].classList.add('is-active');
    }, 1300);
    nav.style.opacity = '0';
}

close.onclick = () => {
    interact.className = "is-not-interacting";
    for (let i = 0; i < chapter.length; i++) {
        chapter[i].classList.remove('is-active');
    }
    let timerAppear = setTimeout(function () {
        nav.style.opacity = '1';
    }, 1000);
}



let preArrow = document.querySelector('.is-previous');
let nextArrow = document.querySelector('.is-next');
// 获取楼层数
let digit = document.querySelectorAll('.digit');
let canvas = document.querySelector('.canvas');
// 定义一个楼层标识
let level = 0;
// 为 到达下一层楼按钮 绑定单击响应函数
nextArrow.addEventListener('click', function () {
    preArrow.className = 'sibling is-previous is-active';
    level++;
    // 楼层数字改变
    renewLevelNumber();
    renewChapter();
    // 到达最顶层时
    if (level == digit.length - 1) {
        nextArrow.className = 'sibling is-next';
    }
    switch (level) {
        case 1:
            canvas.style.backgroundPosition = '0px -2380px';
            break;
        case 2:
            canvas.style.backgroundPosition = '192px -1990px';
            break;
        case 3:
            canvas.style.backgroundPosition = '0px -1650px';
            break;
    }

});

// 为 返回上一层楼按钮 绑定单击响应函数
preArrow.addEventListener('click', function () {
    nextArrow.className = 'sibling is-next is-active';
    level--;
    //楼层数字改变
    renewLevelNumber();
    renewChapter();
    // 到达最底层时
    if (level == 0) {
        preArrow.className = 'sibling is-previous';
    }

    switch (level) {
        case 0:
            canvas.style.backgroundPosition = '192px -2780px';
            break;
        case 1:
            canvas.style.backgroundPosition = '0px -2350px';
            break;
        case 2:
            canvas.style.backgroundPosition = '192px -1990px';
            break;
    }


})

//定义改变楼层数字函数
function renewLevelNumber() {
    for (let i = 0; i < digit.length; i++) {
        if (i < level) {
            digit[i].className = 'digit is-before';
        } else if (i > level) {
            digit[i].className = 'digit is-after';


        } else {
            digit[i].className = 'digit is-current';

        }
    }
}

//定义改变章节内容函数 
function renewChapter() {
    for (let i = 0; i < digit.length; i++) {
        if (i == level) {
            let timerDelay = setTimeout(function () {
                chapter[i].classList.add('is-active');
            }, 1000);
        } else {
            chapter[i].className = `chapter chapter-0${i + 1}`;
        }
    }

}


let userHead = document.querySelector('.user img');
let user = document.querySelector('.user')
let userId = getCookie('userId');
let loginInBtn = document.querySelector('.top-navigation .button');
sealAjax({
    url: 'http://106.55.197.233:666/cityofstar/user/isUserLogin',
    data: {
        userId: `${userId}`
    }
}).then(res => {
    // 登录成功时
    if (res.code == '200') {
        // 赋予头像
        userHead.src = `http://106.55.197.233:666/upload/${getCookie('headPortrait')}`;
        loginInBtn.style.opacity = '0';
        loginInBtn.style.pointerEvents = 'none';
        let navItem = document.querySelectorAll('.nav a');
        navItem[1].href = 'stars.html';
        navItem[2].href = 'psychology3.html';
        navItem[3].href = 'share.html';
        user.style.pointerEvents = 'all';
    } else {
        console.log("未成功");
        user.style.pointerEvents = 'none';
        let navItem = document.querySelectorAll('.nav a');
        let popInner = document.querySelector('.pop-inner');
        for(let i = 1; i < navItem.length; i++){
            navItem[i].addEventListener('click', () => {
                popInner.innerText = '请先选择登录或者注册';
                popupAppear();
            })
        }
    }
});



/* 
    出现弹窗函数
*/
function popupAppear() {
    popup = document.querySelector('.popup');
    popup.style.transform = 'scale(1)';
    popup.style.opacity = '1';
    popup.style.pointerEvents = 'all';
}

/* 
    取消弹框
*/
let bars = document.querySelector('.bars');
bars.onclick = () => {
    popup.style.transform = 'scale(0.7)';
    popup.style.opacity = '0';
    popup.style.pointerEvents = 'none';
}