let userId = getCookie('userId');
let userHead = document.querySelector('.user img');
userHead.src = `http://106.55.197.233:666/upload/${getCookie('headPortrait')}`;
/* 
    切换关注列表
*/

let concernHeader = document.querySelector(".concern-header");
let concernBox = document.querySelector(".concern-box");
let concernCon = document.querySelector(".concern-con");
let concernList = document.querySelector(".concern-list");
let concernBtn = document.querySelector(".concern-back svg");
// 查看更多
concernHeader.onclick = () => {
    concernBox.style.left = "0";
    concernCon.style.display = "none";
    concernList.style.display = "block";
    concernBtn.style.display = "block";
}

//返回
concernBtn.onclick = () => {
    concernBox.style.left = "-372px";
    concernCon.style.display = "block";
    concernList.style.display = "none";
    concernBtn.style.display = "none";
}

/* 
    存储myRadioId
*/
sealAjax({
    url: 'http://106.55.197.233:666/cityofstar/radio/getUserRadioId',
    data: { userId: `${userId}` }
}).then(res => {
    // console.log(res)
    // 设置cookie
    setCookie('myRadioId', res.data);
});

/* 
    图片懒加载
*/
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.backgroundImage = 'url(' + img.dataset.src + ')'; // 将真实的图片地址赋给 src 属性
            observer.unobserve(img); // 停止观察该图片
        }
    });
})

/* 
    渲染正在直播
*/
const urlHeader = 'http://106.55.197.233:666/upload/';
let liveList = document.querySelector('.live-list');
let pickList = document.querySelector('.pick-list');
// 获取直播间页面
let livingRoom = document.querySelector('.living-room');
// 获取退出直播间图标
let livingBack = document.querySelector('.living-back');
// 获取直播间切换列表的每一栏
let selectLi = document.querySelectorAll('ul.select-list>li');
let changeSaying = document.querySelector('.change-saying');
let livingNav = document.querySelector('.living-nav');
sealAjax({
    url: 'http://106.55.197.233:666/cityofstar/radioShow/getLivingShow',
    data: { userId: `${userId}` }
}).then(res => {
    // console.log(res);
    for (i in res.data) {
        liveList.innerHTML += `<li class="lazy-image">
                                    <a href="javascript:;">
                                        <h3>${res.data[i].showName}</h3>
                                        <span>by ${res.data[i].radioName}</span>
                                        <div class="play-btn live-btn">
                                            <svg t="1664865984965" class="icon live-action" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2724" width="200" height="200"><path d="M744.727273 551.563636L325.818182 795.927273c-30.254545 18.618182-69.818182-4.654545-69.818182-39.563637v-488.727272c0-34.909091 39.563636-58.181818 69.818182-39.563637l418.909091 244.363637c30.254545 16.290909 30.254545 62.836364 0 79.127272z" p-id="2725" data-spm-anchor-id="a313x.7781069.0.i2" class="selected" fill="#ffffff"></path></svg>
                                            <svg t="1665642973387" class="icon live-stop" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1733" width="200" height="200"><path d="M442.181818 709.818182c0 37.236364-30.254545 69.818182-69.818182 69.818182s-69.818182-30.254545-69.818181-69.818182v-395.636364c0-37.236364 30.254545-69.818182 69.818181-69.818182s69.818182 30.254545 69.818182 69.818182v395.636364z m279.272727 0c0 37.236364-30.254545 69.818182-69.818181 69.818182s-69.818182-30.254545-69.818182-69.818182v-395.636364c0-37.236364 30.254545-69.818182 69.818182-69.818182s69.818182 30.254545 69.818181 69.818182v395.636364z" p-id="1734" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#ffffff"></path></svg>
                                        </div>
                                    </a>
                                </li>
                                  `
        let liveLi = document.querySelectorAll('.live-list li');
        // liveLi[i].style.backgroundImage = `url(${urlHeader}${res.data[i].showCover})`;
        liveLi[i].setAttribute('data-src',`${urlHeader}${res.data[i].showCover}`);

        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach((img) => {
            observer.observe(img); // 开始观察每个图片元素
        });

        //获取正在直播音频按钮
        // let playBtn = document.querySelectorAll(".play-btn");
        // let playerProgram = document.querySelector('.player-program');
        // let playerAnchor = document.querySelector('.player-anchor');
        // let inforImg = document.querySelector('.info-top img');
        // let video = document.querySelector(".video");
        // let flag = 0;
        // for(let i =0;i<playBtn.length;i++){
        //     playBtn[i].addEventListener('click',function(){
        //         sealAjax({
        //             url: 'http://106.55.197.233:666/cityofstar/radioShow/getShow',
        //             data: {radioShowId: `${res.data[i].radioId}` }
        //         }).then(res => {
        //            console.log(res)
        //            playerAnchor.innerText = res.data.radioName;
        //            playerProgram.innerText = res.data.showName;
        //            video.src=`http://106.55.197.233:666/upload/${res.data.showContent}`;
        //            inforImg.src = `http://106.55.197.233:666/upload/${res.data.showCover}`;
        //            if(flag % 2){
        //             video.pause();
        //            }else{
        //             video.play();
        //            }
        //            flag++;
        //         })
        //     })
        for (let i = 0; i < liveLi.length; i++) {
            liveLi[i].onclick = () => {
                setCookie('otherRadioId', res.data[i].radioId);
                sealAjax({
                    url: 'http://106.55.197.233:666/cityofstar/radioShow/joinLiving',
                    data: { userId: `${userId}`, radioId: `${res.data[i].radioId}` },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(res => {
                    console.log(res)

                    let userId = getCookie('userId');
                    let id = userId + ',' + getCookie('otherRadioId');
                    /* 
                        渲染直播间详细信息
                    */
                    // 获取直播间封面
                    let programImg = document.querySelector('.program-img img');
                    programImg.src = `${urlHeader}${res.data.showCover}`;
                    let livingInfo = document.querySelector('.living-info');
                    livingInfo.innerHTML = `<h2>${res.data.showName}</h2>
                                            <svg t="1667034365663" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="2337" width="200" height="200">
                                                <path
                                                    d="M836.778667 273.749333H271.530667l96.085333-96.085333c13.312-13.312 13.312-34.986667 0-48.298667s-34.986667-13.312-48.298667 0l-166.229333 166.058667c-0.512 0.512-0.853333 1.194667-1.365333 1.706667a102.570667 102.570667 0 0 0-37.376 79.018666v419.84c0 56.490667 45.909333 102.4 102.4 102.4h619.690666c56.490667 0 102.4-45.909333 102.4-102.4v-419.84c0.341333-56.490667-45.568-102.4-102.058666-102.4z m34.133333 522.24c0 18.773333-15.36 34.133333-34.133333 34.133334H217.088c-18.773333 0-34.133333-15.36-34.133333-34.133334v-419.84c0-18.773333 15.36-34.133333 34.133333-34.133333h619.690667c18.773333 0 34.133333 15.36 34.133333 34.133333v419.84z"
                                                    p-id="2338" data-spm-anchor-id="a313x.7781069.0.i2" class="selected" fill="#f5f5f5e6"></path>
                                                <path
                                                    d="M383.317333 438.954667c-76.458667 0-138.581333 62.122667-138.581333 138.581333 0 76.458667 62.122667 138.581333 138.581333 138.581333 76.288 0 138.581333-62.122667 138.581334-138.581333-0.170667-76.458667-62.293333-138.581333-138.581334-138.581333z m0 208.725333c-38.741333 0-70.314667-31.573333-70.314666-70.314667s31.573333-70.314667 70.314666-70.314666 70.314667 31.573333 70.314667 70.314666-31.573333 70.314667-70.314667 70.314667zM757.930667 477.866667h-136.533334c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133333h136.533334a34.133333 34.133333 0 1 0 0-68.266666zM757.930667 619.52h-136.533334c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133334h136.533334a34.133333 34.133333 0 1 0 0-68.266667z"
                                                    p-id="2339" data-spm-anchor-id="a313x.7781069.0.i3" class="" fill="#1afa29"></path>
                                            </svg>
                                            <span class="living-station-name">${res.data.radioName}</span>
                                            <div class="author-info">
                                                <img src="${urlHeader}${res.data.hostHead}" alt="主播头像">
                                                <span>${res.data.hostName}</span>
                                                <svg t="1664803543522" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg" p-id="7940" width="200" height="200">
                                                    <path
                                                        d="M522.9568 823.9104h118.6304c103.168 0 186.7776-83.6096 186.7776-186.7776V486.4c0-44.1344-35.7888-79.9232-79.9232-79.9232h-118.6304c-103.168 0-186.7776 83.6096-186.7776 186.7776v150.7328c0 44.1344 35.7888 79.9232 79.9232 79.9232z"
                                                        fill="#FFBE0A" p-id="7941"></path>
                                                    <path
                                                        d="M512 945.408c-20.3776 0-40.8064-7.7824-56.32-23.296l-80.8448-80.896H260.4544c-43.9296 0-79.6672-35.7376-79.6672-79.6672V647.168l-80.8448-80.8448a79.17056 79.17056 0 0 1-23.3472-56.32c0-21.2992 8.2944-41.2672 23.3472-56.32l80.8448-80.8448V258.5088c0-43.9296 35.7376-79.6672 79.6672-79.6672h114.3808L455.68 97.9968c15.0528-15.0528 35.0208-23.3472 56.32-23.3472 21.248 0 41.2672 8.2944 56.32 23.3472l80.8448 80.8448h114.3808c43.9296 0 79.6672 35.7376 79.6672 79.6672v114.3808l80.896 80.8448c31.0272 31.0272 31.0272 81.5616 0 112.64l-80.896 80.8448v114.3808c0 43.9296-35.7376 79.6672-79.6672 79.6672h-114.3808L568.32 922.112c-15.5136 15.5648-35.9424 23.296-56.32 23.296zM260.4544 250.5216c-4.4032 0-7.9872 3.584-7.9872 7.9872v129.2288c0 9.5232-3.7888 18.6368-10.496 25.344L150.6304 504.4224c-1.9456 1.9456-2.3552 4.1472-2.3552 5.632s0.4096 3.6864 2.3552 5.632l91.3408 91.3408a35.84512 35.84512 0 0 1 10.496 25.344v129.2288c0 4.4032 3.584 7.9872 7.9872 7.9872H389.632c9.5232 0 18.6368 3.7888 25.344 10.496L506.368 871.424c3.1232 3.1232 8.1408 3.1232 11.264 0l91.3408-91.3408a35.84512 35.84512 0 0 1 25.344-10.496h129.2288c4.4032 0 7.9872-3.584 7.9872-7.9872v-129.2288c0-9.5232 3.7888-18.6368 10.496-25.344l91.392-91.3408c3.1232-3.1232 3.1232-8.1408 0-11.264l-91.392-91.392a35.84512 35.84512 0 0 1-10.496-25.344V258.5088c0-4.4032-3.584-7.9872-7.9872-7.9872h-129.2288c-9.5232 0-18.6368-3.7888-25.344-10.496L517.632 148.6848c-1.9456-1.9456-4.1472-2.3552-5.632-2.3552s-3.6864 0.4096-5.632 2.3552L414.976 240.0256a35.84512 35.84512 0 0 1-25.344 10.496H260.4544z"
                                                        fill="#13227a" p-id="7942" data-spm-anchor-id="a313x.7781069.0.i13" class="selected"></path>
                                                    <path
                                                        d="M481.8432 666.4192c-9.1136 0-17.8688-3.4304-24.5248-9.728l-104.3456-98.048c-14.4384-13.568-15.1552-36.2496-1.5872-50.6368 13.568-14.4384 36.2496-15.1552 50.6368-1.5872l76.2368 71.6288 134.5536-166.0928c12.4416-15.36 35.0208-17.7664 50.432-5.2736 15.36 12.4416 17.7664 35.0208 5.2736 50.432l-158.8224 196.096a35.76832 35.76832 0 0 1-25.3952 13.2096c-0.8704-0.0512-1.6896 0-2.4576 0z"
                                                        fill="#13227a" p-id="7943" data-spm-anchor-id="a313x.7781069.0.i14" class="selected"></path>
                                                </svg>
                                            `
                    let clientPC = null;
                    let clientWebsocket = null;
                    let clientVideo = document.querySelector('.client-audio');
                    let msg = null;
                   
                    //连麦变量
                    let connectedPC = null;         
                    let connectedAudio =  document.querySelector('.living-connected');//获取专属video
                    let onlineUserPC = new Map();
                    const clientWsUrl = 'ws://106.55.197.233:666/cityofstar/client/' + id;
                    clientWebsocket = new WebSocket(clientWsUrl);

                    clientWebsocket.onopen = function () {
                        clientPC = createRTCPeerConnection();

                        initOnTrack(clientPC,clientVideo);

                        clientWebsocket.send(JSON.stringify(
                            {
                                operate: 'join',
                                userId: userId, 
                                data: {

                                }
                            }
                        ));
                        initLocalStream(connectedAudio);
                        
                        // 直播页面出现
                        livingRoom.style.display = 'block';
                        livingBack.style.display = 'block';
                        selectLi[1].style.display = 'none';
                        selectLi[2].style.display = 'none';
                        changeSaying.style.display = 'none';
                        livingNav.style.display = 'none';
                    }

                    //初始化监听码流标签
                    let receiveAudio = document.querySelector('.client-connected');
                    // 连麦中弹窗出现
                    let inPhonePopup = document.querySelector('.in-phone-popup');
                    // 获取直播间页面
                    let livingRoom = document.querySelector('.living-room');
                    let hostHead = document.querySelector('.host-box img');
                    let clientHead = document.querySelector('.client-box img');
                    let hostName = document.querySelector('.host-box p');
                    let clientName = document.querySelector('.client-box p');
                    let finishPhone = document.querySelector('.finish-phone');
                    clientWebsocket.onmessage = function (getMessage) {
                        console.log(getMessage);
                        msg = JSON.parse(getMessage.data);
                        switch (msg.operate) {
                            case 'offer':
                                clientPC.setRemoteDescription(new RTCSessionDescription(msg.data))
                                createAnswer(clientPC,msg.userId,'answer',clientWebsocket);
                                break;
                            case 'candidate':
                                addIceCandidate(clientPC,msg);
                                break;
                            case 'stop':
                                // 直播页面消失
                                livingRoom.style.display = 'none';
                                console.log("主播关闭了直播间");
                                clientVideo.srcObject = null;
                                clientPC.close();
                                break;
                            case 'chat':
                                console.log(msg.data);
                                console.log(msg.userId);
                                var chatMessage = JSON.parse(msg.data);
                                var bulletLi = document.createElement('li');
                                //渲染我自己的弹幕
                                if (msg.userId == getCookie('userId')) {
                                    bulletLi.classList.add('my-bu');
                                }
                                var bullet = document.createElement('p');
                                bullet.classList.add('bullet');
                                bullet.innerHTML = `<span>${chatMessage.username}：${JSON.parse(chatMessage.text).text}</span>`;
                                bulletLi.appendChild(bullet);
                                bulletList.appendChild(bulletLi);

                                // 当超出弹幕框高度时，后边出现的弹幕挤掉前面的弹幕
                                let bulletLis = document.querySelectorAll('.bullet-list>li');
                                if (bulletList.offsetHeight >= 508) {
                                    // 删除第一个子节点
                                    bulletList.removeChild(bulletLis[0]);
                                }
                                break;
                            case 'invite':
                                // 连麦请求弹窗出现
                                let microphonePopup = document.querySelector('.microphone-popup');
                                let agreephone = document.querySelector('.agree-phone');
                                let rejectPhone = document.querySelector('.reject-phone');
                                microphonePopup.style.opacity = '1';
                                microphonePopup.style.transform = 'scale(1)';
                                microphonePopup.style.pointerEvents = "all";
                                // 同意连麦
                                agreephone.onclick = ()=>{
                                    connectedPC = createRTCPeerConnection();
                    
                                    console.log("初始化连麦成功！");
                                    console.log("创建连麦成功");
                                    initAddTrack(connectedPC,connectedAudio);
                                    createOffer(connectedPC,msg.userId,'connectedOffer',clientWebsocket);
                                    createIceCandidate(connectedPC,msg.userId,'connectedCandidate',clientWebsocket);
                                    clientWebsocket.send(JSON.stringify(
                                        {
                                            operate:'agree',
                                            userId:msg.userId,//cookie
                                            data:{}
                                        }
                                    ));

                                    // 弹窗消失
                                    let timer = setTimeout(function () {
                                        microphonePopup.style.opacity = '0';
                                    }, 87);
                                    microphonePopup.style.transform = 'scale(0.7)';
                                    microphonePopup.style.pointerEvents = "none";
                                }

                                // 拒绝连麦
                                rejectPhone.onclick = ()=>{
                                    clientWebsocket.send(JSON.stringify(
                                        {
                                            operate:'reject',
                                            userId:msg.userId,
                                            data:{}
                                        }
                                    ))

                                    // 邀请弹窗消失
                                    let timer = setTimeout(function () {
                                        microphonePopup.style.opacity = '0';
                                    }, 87);
                                    microphonePopup.style.transform = 'scale(0.7)';
                                    microphonePopup.style.pointerEvents = "none";

                                }
                                break;
                            case 'connectedAnswer':
                                connectedPC.setRemoteDescription(new RTCSessionDescription(msg.data));
                                break;
                            case 'agree':
                                console.log(msg);
                                console.log(msg.data);
                                msg.data = msg.data.replace("[","");
                                msg.data = msg.data.replace("]","");
                                msg.data = msg.data.split(", ");
                                console.log(msg.data);

                                //拿到所有在线人的id
                                for(var i = 0; i < msg.data.length;i++){
                                    console.log(msg.data[i]);
                                    if(msg.data[i] != getCookie('userId')){
                                        var PC = createRTCPeerConnection();
                                        onlineUserPC.set(msg.data[i],PC);
                                        initAddTrack(PC,connectedAudio); 
                                        createOffer(PC,msg.data[i],'PCOffer',clientWebsocket);
                                        createIceCandidate(PC,msg.data[i],'PCCandidate',clientWebsocket);
                                    }
                                }
                                // 单击结束连麦，连麦用户弹窗消失
                                finishPhone.onclick = () =>{
                                    clientWebsocket.send(JSON.stringify(
                                        {
                                            operate:'finish',
                                            userId:msg.userId,
                                            data:{}
                                        }
                                    ));
                                    // 停止收连麦用户的声
                                    connectedAudio.srcObject = null;
                                    // 弹窗消失
                                    let timer = setTimeout(function () {
                                        inPhonePopup.style.opacity = '0';
                                    }, 87);
                                    inPhonePopup.style.transform = 'scale(0.7)';
                                    inPhonePopup.style.pointerEvents = "none";

                                }
                                break;
                            case 'PCOffer':
                                receivePC = createRTCPeerConnection();
                                initOnTrack(receivePC,receiveAudio);
                                receivePC.setRemoteDescription(new RTCSessionDescription(msg.data))
                                
                                createAnswer(receivePC,msg.userId,'PCAnswer',clientWebsocket);
                                break;
                            case 'PCAnswer':
                                onlineUserPC.get(msg.userId).setRemoteDescription(new RTCSessionDescription(msg.data));
                                break;
                            case 'PCCandidate':
                                addIceCandidate(receivePC,msg);
                                break;
                            case 'connectUser':
                                hostHead.src = `http://106.55.197.233:666/upload/${JSON.parse(msg.data).hostHead}`;
                                hostName.innerHTML = `${JSON.parse(msg.data).hostname}`;
                                clientHead.src = `http://106.55.197.233:666/upload/${JSON.parse(msg.data).userHead}`;
                                clientName.innerHTML = `${JSON.parse(msg.data).username}`;
                                // 普通听众连麦中弹窗出现
                                inPhonePopup.style.opacity = '1';
                                inPhonePopup.style.transform = 'scale(1.1)';
                                inPhonePopup.style.pointerEvents = "all";
                               
                                finishPhone.style.display = 'none';
                                break;
                            case 'finish':
                                // 停止播连麦用户的声
                                receiveAudio.srcObject = null;
                                 // 普通听众连麦中弹窗消失
                                 let timer = setTimeout(function () {
                                    inPhonePopup.style.opacity = '0';
                                }, 87);
                                inPhonePopup.style.transform = 'scale(0.7)';
                                inPhonePopup.style.pointerEvents = "none";
                                break;
                            case 'connectedUser':
                                hostHead.src = `http://106.55.197.233:666/upload/${JSON.parse(msg.data).hostHead}`;
                                hostName.innerHTML = `${JSON.parse(msg.data).hostname}`;
                                clientHead.src = `http://106.55.197.233:666/upload/${JSON.parse(msg.data).userHead}`;
                                clientName.innerHTML = `${JSON.parse(msg.data).username}`;
                                inPhonePopup.style.opacity = '1';
                                inPhonePopup.style.transform = 'scale(1.1)';
                                inPhonePopup.style.pointerEvents = "all";
                                break;

                        }
                    }

                    /* 
                        发送弹幕信息
                    */
                    let chatInput = document.querySelector('.chat-box input');
                    chatInput.onkeydown = function (event) {
                        // 按下enter
                        if (event.keyCode == 13) {
                            msg = {
                                operate: 'chat',
                                userId: getCookie('userId'),
                                data: {
                                    text: chatInput.value
                                }
                            }

                            clientWebsocket.send(JSON.stringify(msg));
                            // 清空input内容
                            chatInput.value = '';
                        }
                    }

                    /* 
                        听众单击退出按钮，离开直播间
                    */
                    livingBack.onclick = () => {
                        msg = {
                            operate: 'leave',
                            userId: getCookie('userId'),
                            data: {}
                        }
                        //离开
                        clientVideo.srcObject = null;
                        clientWebsocket.send(JSON.stringify(msg));
                        clientWebsocket.close();
                        livingRoom.style.display = 'none';
                    }
                });
            }
        }
    }
//封装
//初始化本地码流
//加在发起直播或连麦的一方
async function initLocalStream(playTag){
    //约束条件
    const constraints= {
        audio: true,
        video: false
    };
    var hostStream = await navigator.mediaDevices.getUserMedia(constraints);
        //将获取到的流绑定到video标签上
    playTag.srcObject = hostStream;    
}
//初始化需要传输流的一方
function initAddTrack(PC,playTag){
    playTag.srcObject.getTracks().forEach(track => {
        PC.addTrack(track,playTag.srcObject)
    })
}
//初始化需要接收流的一方
function initOnTrack(pc,playTag){
    pc.ontrack = event => {
        const [remoteStream] = event.streams
        playTag.srcObject = remoteStream
    }
}
//创建offer
//由直播或连麦方创建
function createOffer(pc,userId,operate,webSocket){
    //开始创建offer
    const offerOptions = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 0
    };

    pc.createOffer(offerOptions).then(function(e){ 
        //存入本地描述  
        pc.setLocalDescription(e)
       
        webSocket.send(JSON.stringify(
             {
                operate:operate,
                userId:userId,
                data:e
            }
        ));
    })
}
//创建iceCandidate
//由直播或连麦方创建
function createIceCandidate(pc,userId,operate,webSocket){
    //开始创建candidate
    pc.onicecandidate = function(e){
        if(e.candidate){
            webSocket.send(JSON.stringify(
                {
                    operate:operate,
                    userId:userId,
                    data:{
                        type:'candidate',
                        candidate:e.candidate.candidate,
                        label:e.candidate.sdpMLineIndex,
                        id:e.candidate.sdpMid
                    }
                }
            ));
        }
    };
}
//由听众创建
function createAnswer(pc,userId,operate,webSocket){

    pc.createAnswer().then(function(e){
        pc.setLocalDescription(e);
        webSocket.send(JSON.stringify(
             {
                 operate:operate,
                 userId:userId,
                 data:e
             }
        ));
    })
}
//创建RTC
function createRTCPeerConnection(){
    var pc = new RTCPeerConnection(
        {
            iceServers:[                        
                {
                    urls:'stun:stun.voiparound.com:3478'
                }
            ]
        }  
    );
    return pc;
}
//添加候选信息
//观众添加
function addIceCandidate(pc,message){
    if(message.data.candidate){
        // console.log('收到candidate');                          
        var candidate = new RTCIceCandidate({
            sdpMLineIndex: message.data.label,
            candidate: message.data.candidate,
        });
        // console.log(candidate);
        pc.addIceCandidate(candidate)
        .then(() => {
            console.log("Successed to add ice candidate");
        })
        .catch((err) => {
            console.error(err);
        });
    }
}






    //     liveLi[i].addEventListener('click', function () {
    //         console.log(i)
    //         window.location.href = "station.html";

    //     });

    //     /* 
    //         播放器播放对应音频
    //     */
    //     //获取正在直播音频按钮
    //     let liveBtn = document.querySelectorAll(".live-btn");
    //     let liveAction = document.querySelectorAll(".live-action");
    //     let liveStop = document.querySelectorAll(".live-stop");

    //     playBtnChange(liveBtn, liveStop, liveAction);
    // }


});

/* 
    渲染精选节目
*/
sealAjax({
    url: 'http://106.55.197.233:666/cityofstar/radioShow/getChoseShow',
    data: { userId: `${userId}` }
}).then(res => {
    console.log(res)
    for (let i = 0; i < 4; i++) {
        pickList.innerHTML += ` <li>
                                    <a href="javascript:;">
                                    <h3>${res.data[i].showName}</h3>
                                    <span>by ${res.data[i].radioName}</span>
                                    <div class="play-btn program-btn">
                                        <svg t="1664865984965" class="icon program-action" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2724" width="200" height="200"><path d="M744.727273 551.563636L325.818182 795.927273c-30.254545 18.618182-69.818182-4.654545-69.818182-39.563637v-488.727272c0-34.909091 39.563636-58.181818 69.818182-39.563637l418.909091 244.363637c30.254545 16.290909 30.254545 62.836364 0 79.127272z" p-id="2725" data-spm-anchor-id="a313x.7781069.0.i2" class="selected" fill="#ffffff"></path></svg>
                                        <svg t="1665642973387" class="icon program-stop" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1733" width="200" height="200"><path d="M442.181818 709.818182c0 37.236364-30.254545 69.818182-69.818182 69.818182s-69.818182-30.254545-69.818181-69.818182v-395.636364c0-37.236364 30.254545-69.818182 69.818181-69.818182s69.818182 30.254545 69.818182 69.818182v395.636364z m279.272727 0c0 37.236364-30.254545 69.818182-69.818181 69.818182s-69.818182-30.254545-69.818182-69.818182v-395.636364c0-37.236364 30.254545-69.818182 69.818182-69.818182s69.818182 30.254545 69.818181 69.818182v395.636364z" p-id="1734" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#ffffff"></path></svg>
                                    </div>
                                    </a>
                                </li>
                                `
    }
    let pickLi = document.querySelectorAll('.pick-list li');
    for (let i = 0; i < pickLi.length; i++) {
        pickLi[i].style.backgroundImage = `url(${urlHeader}${res.data[i].showCover})`;
        pickLi[i].onclick = () => {
            setCookie('otherRadioId', res.data[i].radioId);
            window.location.href = "station.html";
        }
    }
});

/* 
    从 我的电台 进入电台页面
*/
let mine = document.querySelector('.mine');
mine.onclick = () => {
    setCookie('otherRadioId', getCookie('myRadioId'));
}


/* 
    渲染热门主播
*/
// 获取热门主播每一栏
let card = document.querySelectorAll('.card');
function concernHost(){
    sealAjax({
        url: 'http://106.55.197.233:666/cityofstar/radio/getHotRadioInfo',
        data: { userId: `${userId}` }
    }).then(res => {
        // console.log(res)
        for (i in res.data) {
            card[i].innerHTML = ` <div class="img">
                                    <img src="${urlHeader}${res.data[i].userHeadPortrait}" alt="主播头像">
                                </div>
                                <div class="details">
                                    <span class="name">${res.data[i].username}</span>
                                    <p>${res.data[i].radioTag}</p>
                                </div>
                                <a href="javascript:;" class="card-concern">关注</a> 
                                `
            card[i].radioId = res.data[i].radioId;
        }
    
        let cardHead = document.querySelectorAll('.img img');
        let tag = document.querySelectorAll('.details p');
        for (i in res.data) {
            if (res.data[i].userHeadPortrait == undefined) {
                cardHead[i].src = './images/default-head.png';
            }
            if (res.data[i].radioTag == undefined) {
                tag[i].innerText = '留下你的电台标签吧';
            }
        }
    
    
    
        let cardBtn = document.querySelectorAll('.card-concern');
        // 添加关注主播
        for (let i = 0; i < cardBtn.length; i++) {
            cardBtn[i].addEventListener('click', function () {
                sealAjax({
                    url: 'http://106.55.197.233:666/cityofstar/radio/addCollectedRadio',
                    data: { userId: `${userId}`, radioId: `${card[i].radioId}` }
                }).then(res => {
                    // 重新渲染
                    concernList.innerHTML = ``;
                    renewConcernList();
                    cardBtn[i].innerText = '已关注';
                    cardBtn[i].style.pointerEvents = 'none';
                });
            })
        }
    });
}

concernHost();


/* 
    渲染关注列表
*/

function renewConcernList() {
    sealAjax({
        url: 'http://106.55.197.233:666/cityofstar/radio/getCollectInfo',
        data: { userId: `${userId}` }
    }).then(res => {
        // 先清空
        concernList.innerHTML = ``;
        // 再渲染
        for (i in res.data) {
            concernList.innerHTML += `<li>
                                        <img src="${urlHeader}${res.data[i].radioOwner.headPortrait}" alt="主播">
                                        <div class="content">
                                            <h4>${res.data[i].radio.radioName}</h4>
                                            <p>${res.data[i].radioOwner.username}</p>
                                        </div>
                                        <button>取消关注</button>
                                    </li>
                                    `
        }

        let concernNumber = document.querySelector('.concern-number strong');
        concernNumber.innerText = `${res.data.length}`;
        // 获取关注列表的每一栏
        let cancelBtn = document.querySelectorAll(".concern-list button");
        for (let i = 0; i < cancelBtn.length; i++) {
            cancelBtn[i].radioId = `${res.data[i].radio.radioId}`;
            cancelBtn[i].onclick = () => {
                sealAjax({
                    url: 'http://106.55.197.233:666/cityofstar/radio/delCollectedRadio',
                    data: { userId: `${userId}`, radioId: `${cancelBtn[i].radioId}` },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    renewConcernList();
                    concernHost();
                });
            }
        }

    })

}
renewConcernList();


/* 
    渲染有声条
*/
let vocalBar = document.querySelectorAll('.vocal-bar');
sealAjax({
    url: 'http://106.55.197.233:666/cityofstar/voice/getRandomVoice',
}).then(res => {
    for (i in res.data) {
        vocalBar[i].innerHTML = `<div class="vocal-header">
                                    <img src="${urlHeader}${res.data[i].userHeadPortrait}" alt="主播头像">
                                    <span>陌生人，你好</span>
                                    <div class="time">${res.data[i].voice.voiceTime}</div>
                                </div>
                                <div class="vocal"></div>
                                <audio class ="vocal-audio" src="${urlHeader}${res.data[i].voice.voiceContent}"></audio>
                                <div class="vocal-play">
                                    <svg t="1664865984965" class="icon vocal-action" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2724" width="200" height="200"><path d="M744.727273 551.563636L325.818182 795.927273c-30.254545 18.618182-69.818182-4.654545-69.818182-39.563637v-488.727272c0-34.909091 39.563636-58.181818 69.818182-39.563637l418.909091 244.363637c30.254545 16.290909 30.254545 62.836364 0 79.127272z" p-id="2725" data-spm-anchor-id="a313x.7781069.0.i2" class="selected" fill="#ffffff"></path></svg>
                                    <svg t="1665642973387" class="icon vocal-stop" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1733" width="200" height="200"><path d="M442.181818 709.818182c0 37.236364-30.254545 69.818182-69.818182 69.818182s-69.818182-30.254545-69.818181-69.818182v-395.636364c0-37.236364 30.254545-69.818182 69.818181-69.818182s69.818182 30.254545 69.818182 69.818182v395.636364z m279.272727 0c0 37.236364-30.254545 69.818182-69.818181 69.818182s-69.818182-30.254545-69.818182-69.818182v-395.636364c0-37.236364 30.254545-69.818182 69.818182-69.818182s69.818182 30.254545 69.818181 69.818182v395.636364z" p-id="1734" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#ffffff"></path></svg>
                                </div>
                                `
    }

    let vocalPlay = document.querySelectorAll('.vocal-play');
    let vocalAudio = document.querySelectorAll('.vocal-audio');
    let vocalAction = document.querySelectorAll('.vocal-action');
    let vocalStop = document.querySelectorAll('.vocal-stop');
    function vocalBtnChange(objBtn, stopIcon, actionIcon, vocalPlayer) {
        let vocalFlag = [];
        // 有声条音频播放
        for (let i = 0; i < objBtn.length; i++) {
            vocalFlag[i] = 0;
            // 单击播放键时播放音频
            objBtn[i].addEventListener('click', function () {
                // 全部音乐暂停
                for (let j = 0; j < objBtn.length; j++) {
                    if (i == j) {
                        continue;
                    }
                    if (vocalFlag[j] % 2) {
                        vocalPlayer[j].pause();
                        stopIcon[j].style.display = 'none';
                        actionIcon[j].style.display = 'block';
                        vocalFlag[j]++;
                    }
                }

                if (vocalFlag[i] % 2) {
                    stopIcon[i].style.display = 'none';
                    actionIcon[i].style.display = 'block';
                    vocalFlag[i]++;
                    // 暂停音频
                    vocalPlayer[i].pause();
                } else {
                    // 切换图标
                    stopIcon[i].style.display = 'block';
                    actionIcon[i].style.display = 'none';
                    vocalFlag[i]++;
                    // 播放音频
                    vocalPlayer[i].play();
                }
            })
        }
    }

    vocalBtnChange(vocalPlay, vocalStop, vocalAction, vocalAudio);

});

/* 
    渲染热度排行
*/
// 获取热度排行
let rankingList = document.querySelector('.ranking-list');
sealAjax({
    url: 'http://106.55.197.233:666/cityofstar/radioShow/getHotShow',
    data: { userId: `${userId}` }
}).then(res => {
    // console.log(res)
    for (i in res.data) {
        rankingList.innerHTML += ` <li>
                                    <div class="rank">0${parseInt(i) + 1}</div>
                                    <img src="${urlHeader}${res.data[i].showCover}" alt="">
                                    <div class="rank-info">
                                        <h3>${res.data[i].showName}</h3>
                                        <p>by ${res.data[i].radioName}</p>
                                    </div>
                                    <div class="time">${res.data[i].showTimeLength}</div>
                                    <svg t="1664883452317" class="icon love" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6992" width="200" height="200"><path d="M535.9 216.7l-22.9 23-22.9-23.1c-89.2-89.7-234.3-90.1-323.9-0.8l-0.8 0.8c-89.7 90.1-89.7 235.8 0 326L476 859.3c20.1 20.4 52.9 20.7 73.4 0.7l0.7-0.7 310.7-316.7c89.7-90.1 89.7-235.8 0-326-89.2-89.7-234.3-90.1-323.9-0.9l-1 1z" p-id="6993" fill="#bfbfbf"></path></svg>
                                    <div class="rank-play">
                                        <svg t="1664865984965" class="icon action" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2724" width="200" height="200"><path d="M744.727273 551.563636L325.818182 795.927273c-30.254545 18.618182-69.818182-4.654545-69.818182-39.563637v-488.727272c0-34.909091 39.563636-58.181818 69.818182-39.563637l418.909091 244.363637c30.254545 16.290909 30.254545 62.836364 0 79.127272z" p-id="2725" data-spm-anchor-id="a313x.7781069.0.i2" class="selected" fill="#ffffff"></path></svg>
                                        <svg t="1665642973387" class="icon stop" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1733" width="200" height="200"><path d="M442.181818 709.818182c0 37.236364-30.254545 69.818182-69.818182 69.818182s-69.818182-30.254545-69.818181-69.818182v-395.636364c0-37.236364 30.254545-69.818182 69.818181-69.818182s69.818182 30.254545 69.818182 69.818182v395.636364z m279.272727 0c0 37.236364-30.254545 69.818182-69.818181 69.818182s-69.818182-30.254545-69.818182-69.818182v-395.636364c0-37.236364 30.254545-69.818182 69.818182-69.818182s69.818182 30.254545 69.818181 69.818182v395.636364z" p-id="1734" data-spm-anchor-id="a313x.7781069.0.i0" class="selected" fill="#ffffff"></path></svg>
                                    </div>
                                </li>
                            `
    }

    /* 
        热度排行点赞
    */

    let love = document.querySelectorAll(".ranking-list svg.love ");
    let lovePath = document.querySelectorAll(".ranking-list svg.love>path");
    let loveFlag = [];

    for (let i = 0; i < love.length; i++) {
        loveFlag[i] = 0;
        love[i].addEventListener('click', function () {

            // 由灰变红
            if (loveFlag[i] % 2) {
                lovePath[i].style.fill = '#bfbfbf';
                loveFlag[i]++;
                //由红变灰 
            } else {
                lovePath[i].style.fill = '#FC455D';
                loveFlag[i]++;
            }

        })
    }

});

let container = document.querySelectorAll('.container');
let st = container[0].getBoundingClientRect().top;
let backTop = document.querySelector(".back-top");
// 页面滚动事件
window.addEventListener('scroll', function () {
    // 页面滚动到第二板块的时候
    if (window.pageYOffset >= st) {
        console.log('1')
        //侧边导航栏出现
        backTop.style.display = "block";
    }else{
        console.log('2')
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













