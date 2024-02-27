/* 
    视觉差部分
*/
//获取id节点函数
function $(id) {
    return document.getElementById(id);
}

//获取关键节点
let stars = $('stars');
let moon = $('moon');
let tree_behind = $('tree_behind');
let text = $('text');
let btn = $('btn');
let cloud_front = $('cloud_front');
let starPeople = document.querySelectorAll('.star-people');
//给窗口添加鼠标滚动事件
window.addEventListener('scroll', function () {
    let value = window.scrollY;
    // 关键点：形成星河向左流转的效果
    stars.style.left = value * 0.25 + 'px';
    moon.style.top = value * 1.2 + 'px';
    // 关键点：山的top改变值一定要比月亮小，才能有月亮追赶山的效果
    tree_behind.style.top = value * 0.5 + 'px';
    //关键点：前面的山top值不需要改变，才更能体现出视觉差
    cloud_front.style.top = value * 0 + 'px';
    //关键点：月亮来之前字基本已经到左边
    text.style.marginBottom = value * 3.8 + 'px';
    starPeople[0].style.bottom = value * 0.5 + 'px';
    starPeople[1].style.bottom = value * 0.5 + 'px';
    starPeople[2].style.bottom = value * 0.5 + 'px';
    starPeople[3].style.bottom = value * 0.5 + 'px';
    starPeople[4].style.bottom = value * 0.5 + 'px';
})

/* 
    点击黑白夜按钮切换
*/
let lightBtn = document.querySelector('.light-btn');
let box = document.querySelector('.box');
let body = document.body;
let day = document.querySelector('.day');
let night = document.querySelector('.night');
let treeBg = document.querySelector('.tree-bg');
let section = document.querySelector('.day-section');
let visualization = document.querySelector('.visualization');
let deleteIcon = document.querySelectorAll('.delete-icon');
// 默认情况下按钮为关闭状态
box.state = false;
box.onclick = function () {
    if (box.state) {
        // 白天状态
        lightBtn.className = 'light-btn';
        body.style.background = 'linear-gradient(#9ca3e8 10vh,#8db2d6 30vh,#F7FBC3, #dc9375,#F2F4FF 200vh)';
        cloud_front.src = './images/cloud-day.png';
        moon.style.mixBlendMode = 'normal';
        moon.src = './images/sun.png';
        stars.style.display = 'none';
        day.style.display = 'block';
        night.style.display = 'none';
        treeBg.style.display = 'none';
        section.className = 'day-section';
        visualization.style.display = 'block';
    } else {
        // 黑夜状态
        lightBtn.className = 'dark-btn';
        body.style.background = 'linear-gradient(#2b1055,#7597de)';
        cloud_front.src = './images/cloud-night.png';
        moon.style.mixBlendMode = 'screen';
        moon.src = './images/moon.png';
        stars.style.display = 'block';
        day.style.display = 'none';
        night.style.display = 'block';
        treeBg.style.display = 'block';
        section.className = '';
        visualization.style.display = 'none';
    }
    box.state = !box.state;
}

let wishWrapper = document.querySelector('.wish-wrapper');
let opactyFlag = 'close';
/* 
     渲染许愿条
*/
function renewWish() {
    sealAjax({
        url: 'http://106.55.197.233:666/cityofstar/wish/get',
        data: { size: 11 },
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    }).then(res => {
        for (i in res.data.wishContext) {
            wishWrapper.innerHTML += ` <div class="wish">
                                            <img src="./images/wish-note.png" alt="">
                                            <p class="wish-text">
                                            ${res.data.wishContext[i]}
                                            </p>
                                    </div>
                                    `
        }

        wishAppear();

    });



}

renewWish();


// 判断许愿条出现与消失，第一次渲染时消失，后面刷新一直出现
function wishAppear() {
    let wish = document.querySelectorAll('.wish');
    if (opactyFlag == 'close') {
        cardItem[2].onclick = () => {
            for (let i = 0; i < wish.length; i++) {
                wish[i].style.opacity = '1';
            }
            opactyFlag = 'open';
        }
    } else {
        for (let i = 0; i < wish.length; i++) {
            wish[i].style.opacity = '1';
        }
    }
}

/* 
  鼠标移入路标时，路牌发生变化
*/
let cardItem = document.querySelectorAll('.card-item');
let wishingCardBg = document.querySelector('.wishing-card img');
for (let i = 0; i < cardItem.length; i++) {
    cardItem[i].onmouseenter = () => {
        wishingCardBg.src = './images/wishing-card-' + (i + 1) + '.png';
    }
    cardItem[i].onmouseleave = () => {
        wishingCardBg.src = './images/wishing-card.png';
    }
}

/* 
   刷新愿望
*/
cardItem[1].onclick = () => {
    wishWrapper.innerHTML = ``;
    renewWish();
}

/* 
    弹窗权限选择框
*/
let permission = document.querySelector('.permission');
let permissionList = document.querySelector('.permission-list');
let showItem = document.querySelector('.show-item');
let open = document.querySelector('.open');
let private = document.querySelector('.private');
let wishInput = document.querySelector('.input-wrapper input');
// 默认为公开
wishInput.status = 0;
permission.onmouseenter = () => {
    permissionList.style.height = '66px';
}
permission.onmouseleave = () => {
    permissionList.style.height = '0';
}

// 公开
open.onclick = () => {
    showItem.innerText = open.innerText;
    permissionList.style.height = '0';
    wishInput.status = 0;
}

// 私密
private.onclick = () => {
    showItem.innerText = private.innerText;
    permissionList.style.height = '0';
    wishInput.status = 1;
}

/* 
    单击许愿添加许愿条
*/
// 弹窗
let wishPopup = document.querySelector('.wish-popup');
cardItem[0].onclick = () => {
    wishPopup.style.opacity = '1';
    wishPopup.style.transform = 'translateY(-50%) scale(1)';
    wishPopup.style.pointerEvents = "all";
}

deleteIcon[2].onclick = () =>{
    // 弹窗消失
    wishPopup.style.opacity = '0';
    wishPopup.style.transform = 'translateY(-50%) scale(0.7)';
    wishPopup.style.pointerEvents = "none";
    // 清空输入框内容
    wishInput.value = '';
}

let sendBtn = document.querySelector('.send-btn button');
// 为发送按钮绑定单击响应函数
sendBtn.onclick = () => {
    if (wishInput.value == '') {
        // alert('请输入内容')
    } else {
        sealAjax({
            url: 'http://106.55.197.233:666/cityofstar/wish/add',
            data: { wishContext: wishInput.value, userId: `${userId}`, status: wishInput.status },
            type: 'post'
        }).then(res => {
            let wishText = document.querySelectorAll('.wish-text');
            // 用户允许公开时
            if (wishInput.status == 0) {
                wishText[0].innerText = wishInput.value;
            }
            // 弹窗消失
            wishPopup.style.opacity = '0';
            wishPopup.style.transform = 'translateY(-50%) scale(0.7)';
            wishPopup.style.pointerEvents = "none";
            // 清空输入框内容
            wishInput.value = '';
        });
    }

}


/* 
    查看我的许愿树
*/
cardItem[3].onclick = () => {
    sealAjax({
        url: 'http://106.55.197.233:666/cityofstar/wish/getUser',
        data: { userId: `${userId}`, size: 11 }
    }).then(res => {
        console.log(res)
        wishWrapper.innerHTML = ``;
        for (i in res.data.wishContext) {
            wishWrapper.innerHTML += ` <div class="wish">
                                            <img src="./images/wish-note.png" alt="">
                                            <p class="wish-text">
                                            ${res.data.wishContext[i]}
                                            </p>
                                    </div>
                                    `
        }

        wishAppear();
    });
}

/* 
    更改头像
*/
let userId = getCookie('userId');
let userHead = document.querySelector('.user img');
userHead.src = `http://106.55.197.233:666/upload/${getCookie('headPortrait')}`;

/* 
    渲染EMO云
*/
let allClinch = document.querySelector('.all-clinch');
function showEmoCloud() {
    sealAjax({
        type: 'post',
        url: 'http://106.55.197.233:666/cityofstar/annoyThing/getRandomAnnoyThingList',
        data: { userId: `${userId}` }
    }).then(res => {
        // 清空EMO云内容
        allClinch.innerHTML = ``;
        console.log(res);
        for (i in res.data) {
            allClinch.innerHTML += `<div class="clinch-wrapper">
                                        <img src="./images/clinch.png" alt="" class="clinch">
                                        <img src="./images/emotion-${res.data[i].userStatus}.png" alt="" class="emo">
                                        <p>${res.data[i].thingContent}</p>
                                    </div>
                                `
        }

        /* 
            单击任意EMO云发送聊天邀请
        */
        // 获取聊天邀请确认弹窗
        let invitePopup = document.querySelector('.invite-popup');
        let agreeInvite = document.querySelector('.agree-invite');
        let rejectInvite = document.querySelector('.reject-invite');
        let clinchWrapper = document.querySelectorAll('.clinch-wrapper');
        for (let i = 0; i < clinchWrapper.length; i++) {
            if (res.data[i].thingContent.length >= 4) {
                clinchWrapper[i].classList.add('long');
            }
            clinchWrapper[i].onclick = () => {
                // 聊天邀请弹窗出现
                invitePopup.style.opacity = '1';
                invitePopup.style.transform = 'scale(1)';
                invitePopup.style.pointerEvents = "all";
                // 确定发送聊天邀请
                agreeInvite.onclick = () => {
                    // 弹窗消失
                    invitePopup.style.transform = 'scale(0.7)';
                    invitePopup.style.pointerEvents = 'none';
                    let inviteTimer = setTimeout(function () {
                        invitePopup.style.opacity = '0';
                    }, 87);

                    sealAjax({
                        type: 'post',
                        url: 'http://106.55.197.233:666/cityofstar/invitation/sendChatInvitation',
                        data: { userId: userId,receiveUserId: res.data[i].userId,message:`${res.data[i].thingContent}`}
                    }).then(res => {
                        console.log(res);
                    });
                } 

                // 取消聊天邀请，弹窗消失
                rejectInvite.onclick = () => {
                    invitePopup.style.transform = 'scale(0.7)';
                    invitePopup.style.pointerEvents = 'none';
                    let inviteTimer = setTimeout(function () {
                        invitePopup.style.opacity = '0';
                    }, 87);
                }
            }
        }
    });
}

showEmoCloud();

/* 
    自动刷新图标旋转
*/
let refreshBtn = document.querySelectorAll(".refresh-wrapper");
let refresh = document.querySelectorAll(".refresh");
let flag = true;
for (let i = 0; i < refreshBtn.length; i++) {
    refreshBtn[i].onclick = function () {
        //节流
        if (!flag) {
            return;
        }
        refresh[i].className = "refresh hopt";

        // 重新渲染EMO云
        showEmoCloud();

        //关闭节流阀
        flag = false;
        //延迟一定的时候开启节流阀
        setTimeout(function () {
            refresh[i].className = "refresh";
            flag = true;
        }, 400);

    }

}


/* 
    选择状态
*/
let selectStatus = document.querySelector('.select-status');
let statusLi = document.querySelectorAll('.status-pop li');
let selectSvg = document.querySelectorAll('.select-status svg');
let currentStatus = document.querySelector('.current-status');
// 默认状态值
let statusCode = 1;
for (let i = 0; i < statusLi.length; i++) {
    statusLi[i].onclick = () => {
        selectSvg[0].style.display = 'none';
        selectSvg[1].style.display = 'none';
        // 灰色底色消失
        selectStatus.style.backgroundColor = 'transparent';
        currentStatus.style.display = 'block';
        // 改变图片路径为选择状态图片
        currentStatus.src = './images/emotion-' + (i + 1) + '.png';
        // 更改状态值
        statusCode = i + 1;
    }
}

/* 
    弹窗打开和关闭
*/
let cloudPop = document.querySelector('.cloud-pop');
let clearCloudPop = document.querySelector('.clear-cloud-pop');
let writeDown = document.querySelector('.write-down');
let clearUp = document.querySelector('.clear-up');
let myEmo = document.querySelector('.my-emo');
// 获取确定按钮
let agree = document.querySelector('.agree');
let emoInput = document.querySelector('.emo-input');
// 写下烦恼
writeDown.onclick = () => {
    // 清空上次留下的内容，变为默认样式
    // selectSvg[0].style.display = 'block';
    // selectSvg[1].style.display = 'block';
    // 灰色底色出现
    selectStatus.style.backgroundColor = 'rgba(241, 243, 244, 8)';
    currentStatus.style.display = 'none';
    // 清空Input内容
    emoInput.value = '';

    // 弹窗出现
    cloudPop.style.opacity = '1';
    cloudPop.style.transform = 'scale(1)';
    cloudPop.style.pointerEvents = "all";

    // 单击确定按钮
    agree.onclick = () => {
        if(emoInput.value == ''){
            return;
        }
        
        /* 
            渲染 发布Emo云
        */
        sealAjax({
            type: 'post',
            url: 'http://106.55.197.233:666/cityofstar/annoyThing/addAnnoyThing',
            data: { userId: `${userId}`, thingContext: emoInput.value, statusCode: statusCode }
        }).then(res => {
            console.log(res);

            // 弹窗关闭
            cloudPop.style.transform = 'scale(0.7)';
            cloudPop.style.pointerEvents = 'none';
            let timer = setTimeout(function () {
                cloudPop.style.opacity = '0';
            }, 87);
        });
    }

    deleteIcon[0].onclick = () => {
        cloudPop.style.transform = 'scale(0.7)';
        cloudPop.style.pointerEvents = 'none';
        let timer = setTimeout(function () {
            cloudPop.style.opacity = '0';
        }, 87);
    }
}

// 扫除EMO
clearUp.onclick = () => {
    // 弹窗出现
    clearCloudPop.style.opacity = '1';
    clearCloudPop.style.transform = 'scale(1)';
    clearCloudPop.style.pointerEvents = "all";

    /* 
        渲染我的EMO云
    */
    function showMyEmo() {
        sealAjax({
            url: 'http://106.55.197.233:666/cityofstar/annoyThing/getMyAnnoyThingList',
            data: { userId: `${userId}` }
        }).then(res => {
            console.log(res);
            // 清空原本列表内容
            myEmo.innerHTML = ``;
            for (i in res.data) {
                myEmo.innerHTML += `<li>
                                    <img src="./images/emo-cloud.png" alt="星结" class="emo-cloud">
                                    <a href="javascript:;">
                                        <img src="./images/emotion-${res.data[i].userStatus}.png" alt="生气" class="emo-img">
                                        <p>${res.data[i].thingContent}</p>
                                    </a>
                                    <svg t="1667981723572" class="icon delete-emo" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="13289" width="200" height="200">
                                        <path
                                            d="M358.925672 596.814688v30.450522c0 17.248849 13.985526 31.233352 31.233352 31.233352 17.248849 0 31.233352-13.985526 31.233352-31.233352v-30.450522c0-17.248849-13.985526-31.233352-31.233352-31.233352-17.248849 0-31.233352 13.985526-31.233352 31.233352zM602.506317 596.814688v30.450522c0 17.248849 13.985526 31.233352 31.233352 31.233352s31.233352-13.985526 31.233351-31.233352v-30.450522c0-17.248849-13.984503-31.233352-31.233351-31.233352s-31.233352 13.985526-31.233352 31.233352zM437.047937 699.686636c-14.650675 9.104355-19.155269 28.360931-10.04989 43.01263 11.015891 17.73185 41.238216 47.740304 84.651982 47.740304 43.195801 0 73.79368-29.780257 85.059258-47.379077 9.216919-14.391778 5.03262-33.338293-9.237385-42.742477-14.270005-9.393951-33.576723-5.409197-43.159985 8.739035-0.12689 0.188288-13.049201 18.915815-32.661888 18.915815-19.028379 0-30.93864-17.274432-31.772634-18.530028-9.175987-14.412244-28.259624-18.788925-42.829458-9.756202zM907.576407 160.082952H699.352015v-26.882254c0-40.145325-32.692586-72.807213-72.878844-72.807213h-229.046626c-40.186258 0-72.878844 32.661887-72.878844 72.807213v26.882254H116.323309c-17.248849 0-31.233352 13.984503-31.233352 31.233352s13.984503 31.233352 31.233352 31.233351h791.253098c17.248849 0 31.233352-13.984503 31.233352-31.233351s-13.985526-31.233352-31.233352-31.233352z m-270.692119 0H387.014404v-26.882254c0-5.607718 4.768607-10.340509 10.411117-10.340509h229.046627c5.64251 0 10.411117 4.732791 10.411117 10.340509v26.882254z"
                                            p-id="13290" data-spm-anchor-id="a313x.7781069.0.i6" class="selected" fill="#d81e06"></path>
                                        <path
                                            d="M824.286446 259.279185c-17.248849 0-31.233352 13.984503-31.233352 31.233352v530.07261c0 40.089044-32.692586 72.705905-72.878844 72.705906H303.725466c-40.186258 0-72.878844-32.616862-72.878844-72.705906v-530.07261c0-17.248849-13.984503-31.233352-31.233352-31.233352s-31.233352 13.984503-31.233352 31.233352v530.07261c0 74.535577 60.71378 135.172609 135.345548 135.172609h416.448784c74.632791 0 135.345548-60.637032 135.345548-135.172609v-530.07261c0-17.248849-13.984503-31.233352-31.233352-31.233352z"
                                            p-id="13291" data-spm-anchor-id="a313x.7781069.0.i5" class="selected" fill="#d81e06"></path>
                                        <path
                                            d="M355.781052 259.279185c-17.248849 0-31.233352 13.984503-31.233351 31.233352v167.494758c0 17.248849 13.985526 31.233352 31.233351 31.233352 17.248849 0 31.233352-13.985526 31.233352-31.233352v-167.494758c0-17.248849-13.984503-31.233352-31.233352-31.233352zM699.352015 458.007295v-167.494758c0-17.248849-13.984503-31.233352-31.233351-31.233352s-31.233352 13.984503-31.233352 31.233352v167.494758c0 17.248849 13.985526 31.233352 31.233352 31.233352s31.233352-13.984503 31.233351-31.233352zM511.949858 489.240647c17.248849 0 31.233352-13.985526 31.233352-31.233352v-167.494758c0-17.248849-13.985526-31.233352-31.233352-31.233352s-31.233352 13.984503-31.233352 31.233352v167.494758c-0.001023 17.248849 13.984503 31.233352 31.233352 31.233352z"
                                            p-id="13292" data-spm-anchor-id="a313x.7781069.0.i7" class="selected" fill="#d81e06"></path>
                                    </svg>
                                </li>
                                `
            }

            let myEmoLi = document.querySelectorAll('ul.my-emo>li');
            let deleteEmo = document.querySelectorAll('.delete-emo');
            for (let i = 0; i < myEmoLi.length; i++) {
                // 将thingId储存起来
                myEmoLi[i].thingId = res.data[i].thingId;
                deleteEmo[i].onclick = () => {
                    sealAjax({
                        type: 'post',
                        url: 'http://106.55.197.233:666/cityofstar/annoyThing/delAnnoyThing',
                        data: { thingId: myEmoLi[i].thingId }
                    }).then(res => {
                        // console.log(res);
                        showMyEmo();
                    });
                }
            }


        });
    }

    showMyEmo();

    deleteIcon[1].onclick = () => {
        clearCloudPop.style.transform = 'scale(0.7)';
        clearCloudPop.style.pointerEvents = 'none';
        let timer = setTimeout(function () {
            clearCloudPop.style.opacity = '0';
        }, 87);
    }
}


let knotWrapper = document.querySelector('.knot-wrapper');
let st = knotWrapper.getBoundingClientRect().top;
let backTop = document.querySelector(".back-top");
// 页面滚动事件
window.addEventListener('scroll', function () {
    // 页面滚动到第二板块的时候
    if (window.pageYOffset >= st) {
        //侧边导航栏出现
        backTop.style.display = "block";
    } else {
        //侧边导航栏消失
        backTop.style.display = "none";
    }
});

//回到顶部
backTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
});

/* 
    渲染星星小人的故事
*/
// 获取星星小人容器
let starPeopleWrapper = document.querySelector('.star-people-wrapper');
const urlHeader = 'http://106.55.197.233:666/upload/';
sealAjax({
    url: 'http://106.55.197.233:666/cityofstar/star/get',
    data: { page: 1, size: 5 }
}).then(res => {
    console.log(res);
    for (i in res.data) {
        starPeople[i].innerHTML = `<img src="${urlHeader}${res.data[i].starImg}" alt="默认星星小人" class="star-default">
                                    <img src="${urlHeader}${res.data[i].hoverImg}" alt="发光星星小人" class="star-hover">
                                    <div class="story-box">
                                        <h1>${res.data[i].storyTitle}：</h1>
                                        <p>${res.data[i].storyContext}</p>
                                        <span>@${res.data[i].username}</span>
                                    </div> 
                                    `
    }

});


/* 
    渲染词云
*/
let wrap = document.getElementById('wrap');
let wordCloudsWrapper = document.querySelector('.word-clouds-wrapper');
sealAjax({
    url: 'http://106.55.197.233:666/cityofstar/annoyThing/getWordCloudData',
}).then(res => {
    console.log(res);
    for (i in res.data) {
        wrap.innerHTML += `<a href="javascript:;" class="tag">
                            <img src="./images/emotion-${res.data[i].userStatus}.png" alt="">
                            ${res.data[i].thingContent}
                          </a>  
                        `
    }

    let tags = document.querySelectorAll('.tag');

    /* 
        词云星球
    */
    const _baseAngle = Math.PI / 360, R = 200;
    let speed = 1;
    // 定义弧度
    let angleX = speed * _baseAngle;
    let angleY = -speed * _baseAngle;
    let _focalLength = R * 1.5;

    // 初始化
    function Initialization(options) {
        this.options = options;
        this.container = options.container;
        this.dataArr = options.data;
        this.init();
    }

    Initialization.prototype.init = function () {
        let len = this.dataArr.length;
        let newTags = [];

        for (let i = 0; i < len; i++) {
            var angleA = Math.acos((2 * (i + 1) - 1) / len - 1);
            var angleB = angleA * Math.sqrt(len * Math.PI);
            var z = R * Math.cos(angleA);
            var y = R * Math.sin(angleA) * Math.sin(angleB);
            var x = R * Math.sin(angleA) * Math.cos(angleB);
            // var color = '#' + Math.floor(Math.random()* 0xffffff).toString(16);
            // this.dataArr[i].style.color = color;
            var newTag = new Tag(this.dataArr[i], x, y, z, this.options);
            newTag.move();
            newTags.push(newTag);
            this.animate();
        }
        this.newTags = newTags;
    }

    Initialization.prototype.rotateX = function () {
        let cos = Math.cos(angleX);
        let sin = Math.sin(angleX);
        this.newTags.forEach((tag) => {
            let y = tag.y * cos - tag.z * sin;
            let z = tag.z * cos + tag.y * sin;
            tag.y = y;
            tag.z = z;
        });
    }

    Initialization.prototype.rotateY = function () {
        let cos = Math.cos(angleY);
        let sin = Math.sin(angleY);
        this.newTags.forEach((tag) => {
            let x = tag.x * cos - tag.z * sin;
            let z = tag.z * cos + tag.x * sin;
            tag.x = x;
            tag.z = z;
        });
    }

    Initialization.prototype.animate = function () {
        var that = this;
        setInterval(function () {
            that.rotateX();
            that.rotateY();
            that.newTags.forEach((tag) => {
                tag.move();
            })
        }, 20);
    }

    function Tag(data, x, y, z, options) {
        this.options = options;
        this.dataArr = options.data;
        this.data = data;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    Tag.prototype.move = function () {
        var len = this.dataArr.length;
        var scale = _focalLength / (_focalLength - this.z);
        var alpha = (this.z + R) / (2 * R);
        this.data.style.left = 1.7 * this.x + 'px';
        this.data.style.top = 1.6 * this.y + 'px';
        this.data.style.fontSize = 12 * scale + 'px';
        this.data.querySelector('img').style.transform = 'scale(' + scale * 0.5 + ')';
        this.data.style.opacity = alpha + 0.5;
    }


    let options = {
        data: tags,
        container: wrap
    }
    
    let tagCloud = new Initialization(options);
    wordCloudsWrapper.addEventListener('mousemove', function (e) {
        angleY = 0.1 * (e.clientX / document.body.getBoundingClientRect().width - 0.5) * speed * _baseAngle;
        angleX = 0.1 * (e.clientY / document.body.getBoundingClientRect().height - 0.5) * speed * _baseAngle;
    });
});








/* 
    柱形图
*/
const emotions = [
    "开心",
    "毫无波澜",
    "生气",
    "担心",
    "棒",
    "疲惫",
    "不开心",
    "无语",
    "扑通~❤"
];
const datas = [];
sealAjax({
    type:'post',
    url: 'http://106.55.197.233:666/cityofstar/user/getStatusCount',
    headers: {
        'Content-Type': 'multipart/form-data'
    },
}).then(res => {
    console.log(res);
    for(i in res.data){
        datas.push(res.data[i].y);
    }

    function draw() {
        // 获取画布
        var canvas = document.getElementById("bar-chart");
        var ctx = canvas.getContext("2d");
    
        // 获取canvas宽和高
        let cWidth = canvas.width;
        let cHeight = canvas.height;
    
        // 设置填充色
        ctx.fillStyle = "#e0e3ed";
        ctx.fillRect(0, 0, cWidth, cHeight);
    
        // 计算9个柱子的位置
        // canvas 内边距
        let padding = 40;
    
        // 柱子宽度
        let width = 8;
    
        // 柱子最大高度
        let maxHeight = (cHeight - padding * 2) / 2;
    
        // 柱子最小高度
        let minHeight = maxHeight / 2;
    
        // 柱子间距
        let barGap = (cWidth - 2 * padding - 9 * width) / 8;
    
        // 柱子圆角
        let radius = 5;
    
        // y坐标起始于canvas二分之一的位置
        let y = cHeight * 2/3 ;
        console.log(minHeight,maxHeight);
        for (let i = 0; i < 9; i++) {
            console.log(datas[i]);
            console.log(cHeight *1/4,'1/4')
            // 固定深蓝部分约占据四分之一高度
            let height2 = cHeight *1/4 - 5;
            //柱子上半部分高度，随机产生[minHeight, maxHeight]区间的数字
            // let height1 = Math.floor(
            //     (maxHeight - minHeight + 1) * datas[i] + minHeight
            // );
            console.log(cHeight);
            let height1 = cHeight * datas[i];
            console.log('height1',height1);
            // 同样的，下半部分高度
            // let height2 = Math.floor(
            //     Math.random() *
            //     (maxHeight - minHeight + 1) +
            //     minHeight
            // );

            // 计算每个柱子起始x坐标的位置
            let x = padding + (barGap + width) * i;
    
            // 画柱图
            drawBar(
                ctx,
                x,
                y,
                width,
                height1,
                height2,
                radius
            );
    
            // 画情绪解释
            ctx.fillStyle = "#747D8C";
            ctx.textAlign = "center";
    
            // 设置文字粗细，大小，字体名
            ctx.font = "500 13px sans-serif";
            // 在柱子中间画文字
            ctx.fillText(
                emotions[i],
                x + width / 2,
                y + height2 + 30
            );
    
            // 画比例数
            ctx.fillStyle = "#2b1065";
            ctx.textAlign = "center";
    
            // 设置文字粗细，大小，字体名
            ctx.font = "500 13px sans-serif";
            // 在柱子中间画文字
            ctx.fillText(
                datas[i],
                x + width / 2,
                y - maxHeight + 30
            );
    
        }
    }
    
    function drawBar(ctx,x,y,width,height1,height2,radius) {
        //画上半部分，四条边，两个圆角
        ctx.beginPath();
        // 路径从哪开始
        ctx.moveTo(x, y);
        // 到哪个点
        ctx.lineTo(x, y - height1 + radius);
        // 顺时针画半圆
        ctx.arcTo(
            x,
            y - height1,
            x + radius,
            y - height1,
            radius
        );
        ctx.lineTo(
            x + width - radius,
            y - height1
        );
        ctx.arcTo(
            x + width,
            y - height1,
            x + width,
            y - height1 + radius,
            radius
        );
        ctx.lineTo(x + width, y);
        ctx.lineTo(x, y);
        
        ctx.fillStyle = "#54A0FF";
        ctx.fill();
    
        // 下半部分
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + height2 - radius);
        ctx.arcTo(
            x,
            y + height2,
            x + radius,
            y + height2,
            radius
        );
        ctx.lineTo(
            x + width - radius,
            y + height2
        );
        ctx.arcTo(
            x + width,
            y + height2,
            x + width,
            y + height2 - radius,
            radius
        );
        ctx.lineTo(x + width, y);
        ctx.lineTo(x, y);
        ctx.fillStyle = "#341F97";
        
        ctx.fill();
    }
    
    draw();
});
console.log('datas',datas);
// const datas = [
//     "20.33%",
//     "17.45%",
//     "65%",
//     "12%",
//     "56%",
//     "21%",
//     "23%",
//     "24%",
//     "25%",
// ]



