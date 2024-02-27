let live = document.querySelector('.live');
let livePop = document.querySelector('.live-popup');
let page = document.querySelector('.page');
let liveComfirm = document.querySelector('.live-confirm');
let liveDelete = document.querySelector('.live-delete');
let changeInfo = document.querySelector('.changeInfo');
let starTime;
let endTime;
let timeLength;
/* 
    直播间填写信息弹窗出入动画
*/
live.addEventListener('click', function () {
    livePop.style.opacity = '1';
    page.classList.add('active');
});

liveDelete.addEventListener('click', function () {
    page.classList.remove('active');
    livePop.style.opacity = '0';
});

let liveFile = document.querySelector('.live-file');
let livePicture = document.querySelector('.live-picture');
// 获取节目标题
let liveName = document.querySelector('.live-name input');
// 获取节目介绍
let liveIntro = document.querySelector('textarea.live-intro');
let myRadioId = getCookie('myRadioId');
// 连麦中弹窗出现
let inPhonePopup = document.querySelector('.in-phone-popup');
let mediaRecorder = null;
var chunks = [];
liveFile.onchange = function () {
    let formData = new FormData()
    // 上传数据
    formData.append("fileName", this.value)
    // FileReader可以读取文件的内容
    let fileReader = new FileReader()
    // 转换成base64编码
    fileReader.readAsDataURL(this.files[0])
    fileReader.onload = function () {
        console.log(this.result)
        livePicture.src = this.result;
        // 以逗号划分类型和内容
        let arr = this.result.split(',')
        // 截取类型
        let mime = arr[0].match(/:(.*);/)[1]
        // 将base64格式的字符转回原本的字符格式
        let bstr = window.atob(arr[1])
        let n = bstr.length,
            u8arr = new Uint8Array(n)
        while (n--) {
            // 将ascll码值储存到无符号数组中
            u8arr[n] = bstr.charCodeAt(n)
        }

        /* 
            确认直播信息
        */
        // 获取直播间页面
        let livingRoom = document.querySelector('.living-room');
        // 获取直播间节目名
        let livingName = document.querySelector('.living-info h2');
        // 获取节目封面
        let programImg = document.querySelector('.program-img img');
        // 获取直播间背景图
        let livingRoomBg = document.querySelector('.living-room-bg');
        // 获取在线人数节点
        let onlinePeople = document.querySelector('.online-people');
        // 初始化在线人数
        let onlineNum = 0;
        // 获取连麦列表
        let microphoneList = document.querySelector('.microphone-list');
        // 获取退出直播间图标
        let livingBack = document.querySelector('.living-back');
        // 获取 热聊 && 禁言 切换栏
        let changeSaying = document.querySelector('.change-saying');
        // 获取直播间右侧导航栏
        let livingNav = document.querySelector('.living-nav');
        let liveStationName = document.querySelector('.living-station-name');
        let authorHead = document.querySelector('.author-info img');
        let authorName = document.querySelector('.author-info span');
        const urlHeader = 'http://106.55.197.233:666/upload/';

        // 开始直播按钮
        let startLive = document.querySelector('.startLive');
        // 结束直播按钮
        let finishLive = document.querySelector('.finish-live');
        // 单击确认后，进入直播间页面
        liveComfirm.onclick = () => {
            // 渲染直播间信息
            livingName.innerText = liveName.value;
            programImg.src = livePicture.src;
            authorHead.src = `${urlHeader}${getCookie('headPortrait')}`;
            // authorName.innerHTML = `${getCookie('')}`;
            livingRoomBg.style.background = 'url(' + livePicture.src + ') no-repeat center';
            //填写信息弹窗收起 
            page.classList.remove('active');
            // 直播页面出现
            livingRoom.style.display = 'block';
            livingBack.style.display = 'none';
            selectLi[1].style.display = 'block';
            selectLi[2].style.display = 'block';
            changeSaying.style.display = 'block';
            livingNav.style.display = 'block';
            // 单击 修改信息 出现填写信息弹窗
            changeInfo.addEventListener('click', function () {
                livePop.style.opacity = '1';
                page.classList.add('active');
            });
            sealAjax({
                url: 'http://106.55.197.233:666/cityofstar/radio/getRadioInfo',
                data: { userId: `${userId}`, radioId: `${getCookie('myRadioId')}` },
            }).then(res => {
                console.log(res);
                liveStationName.innerHTML = `${res.data.radio.radioName}`;
                authorName.innerHTML = `${res.data.username}`;
            });
        }

        startLive.onclick = () => {
            let dataBlob = new Blob([u8arr], { type: mime });
            let form = new FormData();
            form.append('radioId', myRadioId);
            console.log(dataBlob)
            form.append('showCover', dataBlob);
            form.append('showName', liveName.value);
            form.append('showIntroduction', liveIntro.value);
            let xhr = new XMLHttpRequest();
            xhr.open('post', 'http://106.55.197.233:666/cityofstar/radioShow/startLivingShow');
            xhr.send(form);


            let hostWebsocket = null;
            let hostPC = null;
            let clients = new Map();//保存客户端的peerConnection对象
            const hostWsUrl = 'ws://106.55.197.233:666/cityofstar/station/' + getCookie('myRadioId');
            let station = document.querySelector('.living-audio');
            hostWebsocket = new WebSocket(hostWsUrl);
            let msg = null;

            let stationConnectVideo = document.querySelector('.client-connected');
            let stationConnect = null;
            //连接上服务端时
            hostWebsocket.onopen = async function (e) {

                initLocalStream(station);

                console.log("初始化成功！");
                console.log("创建直播间成功");
            }

            // 定义一个存放听众id的数组
            let arr = [];
            //监听消息
            hostWebsocket.onmessage = function (getMessage) {
                msg = JSON.parse(getMessage.data);
                console.log(msg);
                switch (msg.operate) {
                    case 'join':
                        hostPC = createRTCPeerConnection();
                        initAddTrack(hostPC,station);
                       
                        clients.set(msg.userId, hostPC);
                        createOffer(hostPC,msg.userId,'offer',hostWebsocket);
                        createIceCandidate(hostPC,msg.userId,'candidate',hostWebsocket);
                        break;
                    case 'answer':
                        hostPC.setRemoteDescription(new RTCSessionDescription(JSON.parse(msg.data)));
                        break;
                    case 'leave':
                        console.log("用户离开直播间");
                        onlineNum--;
                        console.log(clients);
                        // clients.get(msg.userId).close();
                        let microphoneLi1 = document.querySelectorAll('.microphone-list>li');
                        // 听众退出直播间时，删除其连麦Li
                        for(let i = 0;i < microphoneLi1.length;i++){
                            if(microphoneLi1[i].userId === msg.userId){
                                microphoneList.removeChild(microphoneLi1[i]);
                            }
                        }
                        onlinePeople.innerText = `在线听众${onlineNum}人`;
                        break;
                    case 'stop':
                        console.log("主播关闭了直播间.....");
                        hostWebsocket.close();
                        station.srcObject = null;
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
                        if(bulletList.offsetHeight >= 508){
                            // 删除第一个子节点
                           bulletList.removeChild(bulletLis[0]);
                        }
                        break;
                    case 'connected':
                        arr.push(JSON.parse(msg.data).userId);
                        onlineNum++;
                        // 渲染在线人数
                        onlinePeople.innerText = `在线听众${onlineNum}人`;
                        /* 
                            渲染连麦
                        */
                        microphoneList.innerHTML +=`<li>
                                                        <img src="http://106.55.197.233:666/upload/${JSON.parse(msg.data).userHead}" alt="主播">
                                                        <div class="content">
                                                            <h4>${JSON.parse(msg.data).username}</h4>
                                                        </div>
                                                        <svg t="1667120296780" class="icon connect-phone" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14703" width="200" height="200"><path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m93.44-456.32L576 596.48c-43.264-13.44-96.256-64-156.928-153.6l21.504-23.808a57.728 57.728 0 0 0 1.792-75.136l-59.776-72.96a57.472 57.472 0 0 0-78.72-9.856l-20.352 15.104a113.92 113.92 0 0 0-41.984 123.008A587.648 587.648 0 0 0 358.4 619.136Q448.896 725.504 625.536 768a111.232 111.232 0 0 0 118.784-46.464l15.488-23.168a57.728 57.728 0 0 0-10.368-75.648l-66.304-57.088a57.6 57.6 0 0 0-77.696 2.048zM305.92 307.2l20.352-15.104a19.2 19.2 0 0 1 26.24 3.328l59.776 72.96a19.328 19.328 0 0 1 0 25.6l-41.984 45.056 8.192 12.8c73.728 111.36 139.264 173.312 199.168 184.704l9.856 1.92 44.672-43.136a19.072 19.072 0 0 1 25.6-0.768l66.304 57.216a18.944 18.944 0 0 1 3.456 25.6l-15.36 23.296a73.216 73.216 0 0 1-77.952 30.464C524.8 704 442.368 658.432 387.968 594.304a546.432 546.432 0 0 1-109.824-205.952A75.52 75.52 0 0 1 305.92 307.2z m233.856 98.048a74.624 74.624 0 0 1 17.024-1.92 76.8 76.8 0 0 1 76.8 76.8 75.008 75.008 0 0 1-0.896 12.032 11.008 11.008 0 0 0-1.152 5.248v0.768a17.792 17.792 0 0 0 19.584 16.384c10.112-0.768 19.584-5.504 19.584-16.128v-0.896a111.488 111.488 0 0 0 1.28-17.408 115.2 115.2 0 0 0-115.2-115.2 120.192 120.192 0 0 0-15.232 1.024 20.864 20.864 0 0 0-18.432 20.608c0 10.24 6.528 19.072 16.64 18.304zM710.4 499.2c0 10.368 11.776 15.36 21.76 14.592a16 16 0 0 0 16.64-17.024v-7.936-8.192a192 192 0 0 0-192-192h-13.568A21.504 21.504 0 0 0 521.984 307.2a18.176 18.176 0 0 0 17.792 19.584 150.144 150.144 0 0 1 17.024-0.896 153.6 153.6 0 0 1 153.6 153.6 148.992 148.992 0 0 1-1.152 19.712z" fill="#705df2" p-id="14704" data-spm-anchor-id="a313x.7781069.0.i18" class="selected"></path></svg>
                                                    </li>
                                                    `
                        // 获取连麦图标
                        let connectPhone = document.querySelectorAll('.connect-phone');
                        let microphoneLi = document.querySelectorAll('ul.microphone-list>li');
                        // microphoneLi[microphoneLi.length-1].userId = JSON.parse(msg.data).userId;
                        console.log(microphoneLi[microphoneLi.length-1].userId)
                        for(let i = 0; i < microphoneLi.length;i++){
                            // microphoneLi[i].num = i;

                            // 单击连麦
                            connectPhone[i].onclick = ()=>{
                                // console.log(JSON.parse(msg.data).userId);
                                // console.log(microphoneLi[i].userId);
                                console.log(i)
                                console.log(arr[i])
                                console.log('邀请连麦');
                                stationConnect =  createRTCPeerConnection();
                                console.log("初始化本地码流");
                                initOnTrack(stationConnect,stationConnectVideo);
                                // console.log(microphoneLi[i].userId);
                                hostWebsocket.send(JSON.stringify(
                                    {
                                        operate: 'invite',
                                        userId: arr[i],
                                        data: {}
                                    }
                                ))
                            }
                        }
                       
                        break;
                    case 'connectedOffer':
                        console.log(msg.data);
                        stationConnect.setRemoteDescription(new RTCSessionDescription(JSON.parse(msg.data)));
                        createAnswer(stationConnect,msg.userId,'connectedAnswer',hostWebsocket);
                        break;
                    case 'connectedCandidate':
                        var candidateMsg = JSON.parse(msg.data);
                        if(candidateMsg.candidate){
                            console.log('收到连麦candidate');                          
                            var candidate = new RTCIceCandidate({
                                sdpMLineIndex: candidateMsg.label,
                                candidate: candidateMsg.candidate,
                            });
                            // console.log(candidate);
                            stationConnect.addIceCandidate(candidate)
                            .then(() => {
                                console.log("Successed to add ice candidate");
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                        }
                        break;
                    case 'reject':
                        // 获取拒绝连麦弹窗
                        let rejectPopup = document.querySelector('.reject-popup');
                        // 获取确定按钮
                        let confirm = document.querySelector('.reject-popup span');
                        // confirm("对方拒绝了你的连麦");
                        // 拒绝弹窗出现
                        rejectPopup.style.opacity = '1';
                        rejectPopup.style.transform = 'scale(1)';
                        rejectPopup.style.pointerEvents = "all";

                        // 单击确定，拒绝弹窗消失
                        confirm.onclick = () =>{
                            rejectPopup.style.transform = 'scale(0.7)';
                            rejectPopup.style.pointerEvents = "none";
                            let timer = setTimeout(function () {
                                rejectPopup.style.opacity = '0';
                            }, 87);
                        }
                        break;
                    case 'connectUser':
                        let hostHead = document.querySelector('.host-box img');
                        let clientHead = document.querySelector('.client-box img');
                        let hostName = document.querySelector('.host-box p');
                        let clientName = document.querySelector('.client-box p');
                        hostHead.src = `http://106.55.197.233:666/upload/${JSON.parse(msg.data).hostHead}`;
                        hostName.innerHTML = `${JSON.parse(msg.data).hostname}`;
                        clientHead.src = `http://106.55.197.233:666/upload/${JSON.parse(msg.data).userHead}`;
                        clientName.innerHTML = `${JSON.parse(msg.data).username}`;
                        inPhonePopup.style.opacity = '1';
                        inPhonePopup.style.transform = 'scale(1.1)';
                        inPhonePopup.style.pointerEvents = "all";
                        break;
                    case 'finish':
                        // 停止播连麦用户的声
                        stationConnectVideo.srcObject = null;
                        // 普通听众连麦中弹窗消失
                        let timer = setTimeout(function () {
                           inPhonePopup.style.opacity = '0';
                       }, 87);
                       inPhonePopup.style.transform = 'scale(0.7)';
                       inPhonePopup.style.pointerEvents = "none";
                       break;
                    
                }

            }

            // 主播单击结束连麦，连麦用户弹窗消失
            let finishPhone = document.querySelector('.finish-phone');
            finishPhone.onclick = () =>{
                hostWebsocket.send(JSON.stringify(
                    {
                        operate:'finish',
                        userId:msg.userId,
                        data:{}
                    }
                ));
                // 停止收连麦用户的声
                stationConnectVideo.srcObject = null;
                // 弹窗消失
                let timer = setTimeout(function () {
                    inPhonePopup.style.opacity = '0';
                }, 87);
                inPhonePopup.style.transform = 'scale(0.7)';
                inPhonePopup.style.pointerEvents = "none";

            }

            /* 
                发送弹幕信息
            */
            let chatInput = document.querySelector('.chat-box input');
            chatInput.onkeydown = function (event) {
                // 按下enter
                if (event.keyCode == 13) {
                       msg = {
                        operate:'chat',
                        userId:getCookie('userId'),
                        data:{
                            text:chatInput.value
                        }
                    }
                    hostWebsocket.send(JSON.stringify(msg));
                    // 清空input内容
                    chatInput.value = '';
                }
            }
            // 结束直播按钮出现
            finishLive.style.display = 'block';

             /* 
                结束直播退出直播界面
            */
           

            finishLive.onclick = () => {
                hostWebsocket.send(JSON.stringify(
                    {
                        operate: 'stop',
                        userId: `${getCookie('userId')}`,
                        data: {}
                    }
                ))
                // 直播页面消失
                livingRoom.style.display = 'none';
                // 结束直播按钮消失
                finishLive.style.display = 'none';
                endTime = Date.now();
                timeLength =Math.round((endTime - starTime)/1000)
                mediaRecorder.stop();
                mediaRecorder.onstop = (e) => {

                    var blob = new Blob(chunks, {
                        type: "audio/mpeg",
                    });

                    // let audioURL = window.URL.createObjectURL(blob);
                    // const audioSrc = document.querySelector('.audio-player');
                    // audioSrc.src = audioURL;
                    const formData = new FormData();
                    formData.append('showContent', blob);
                    formData.append('radioId', myRadioId);
                    formData.append('timeLength', timeLength);
                    console.log(formData);
                    let xhr = new XMLHttpRequest();
                    xhr.open('post', 'http://106.55.197.233:666/cityofstar/radioShow/stopLivingShow');
                    xhr.send(formData);
                    xhr.onreadystatechange = () =>{
                        if(xhr.readyState === 4){
                            let res = JSON.parse(xhr.response)
                            //渲染结束直播页面
                            let liveConfirmWrapper = document.querySelector('.live-confirm-wrapper');
                            let liveConfirmPopup = document.querySelector('.live-confirm-popup');
                            // 直播结束确认弹窗出现
                            liveConfirmWrapper.style.display = 'block';
                            liveConfirmPopup.style.transform = "scale(1)";
                            liveConfirmPopup.style.opacity = "1";
                            liveConfirmPopup.style.pointerEvents = "all";

                            // 渲染直播结束信息确认弹窗
                            let newText = document.querySelector('.new-text');
                            let recordTime = document.querySelector('.record-time');
                            let newPictureImg = document.querySelector('.new-picture img');
                            let newFile = document.querySelector('.new-file');
                            newText.value = `${res.data.showName}`;
                            // newText.setAttribute("placeholder", `${res.data.showName}`);
                            newPictureImg.src = `http://106.55.197.233:666/upload/${res.data.showCover}`;
                            recordTime.innerHTML = `${res.data.timeLength}`
                            let showId = res.data.showId;
                            newFile.onchange = function(){
                                let formData = new FormData()
                                // 上传数据
                                formData.append("fileName", this.value)
                                // FileReader可以读取文件的内容
                                let fileReader = new FileReader()
                                // 转换成base64编码
                                fileReader.readAsDataURL(this.files[0])
                                fileReader.onload = function () {
                                    newPictureImg.src = this.result;
                                    // 以逗号划分类型和内容
                                    let arr = this.result.split(',')
                                    // 截取类型
                                    let mime = arr[0].match(/:(.*);/)[1]
                                    // 将base64格式的字符转回原本的字符格式
                                    let bstr = window.atob(arr[1])
                                    let n = bstr.length,
                                        u8arr = new Uint8Array(n)
                                    while (n--) {
                                        // 将ascll码值储存到无符号数组中
                                        u8arr[n] = bstr.charCodeAt(n)
                                    }

                                    
                                    
                                }
                            }
                            // 单击确认后，上传信息
                            let defineBtn = document.querySelector('.define-btn');
                            defineBtn.onclick = ()=>{
                                // if(newText.value = ''){
                                //     newText.value = res.data.showName;
                                // }
                                let dataBlob = new Blob([u8arr], { type: mime });
                                let form = new FormData();
                                form.append('showId', showId);
                                console.log(dataBlob)
                                form.append('field', dataBlob);
                                form.append('value', newText.value);
                                let xhr = new XMLHttpRequest();
                                xhr.open('post', 'http://106.55.197.233:666/cityofstar/radioShow/updateShow');
                                xhr.send(form);
                                
                                // 直播确定信息弹窗消失
                                liveConfirmWrapper.style.display = 'none';
                                liveConfirmPopup.style.transform = 'scale(0.7)';
                                liveConfirmPopup.style.pointerEvents = "none";
                                let timer = setTimeout(function () {
                                    liveConfirmPopup.style.opacity = '0';
                                }, 87);
                            }
                        }

                       
                    }

                }
            }
        }

       
    }

}



/* 
    弹幕圆角适配
*/
let bullet = document.querySelectorAll('.bullet');
for (let i = 0; i < bullet.length; i++) {
    // 字数超出一行时，改变圆角大小
    if (bullet[i].offsetHeight > 30) {
        bullet[i].style.borderRadius = '10px';
    }
}

/* 
    直播间选项切换内容
*/
//获取 热聊&&连麦&&更多 选择项
let selectItem = document.querySelectorAll('ul.select-list>li');
let livingItem = document.querySelectorAll('.living-item');
let line = document.querySelectorAll('.line');
for (let i = 0; i < selectItem.length; i++) {
    selectItem[i].addEventListener('click', function (e) {
        for (let j = 0; j < livingItem.length; j++) {
            livingItem[j].style.display = 'none';
            line[j].className = 'underscore line';
        }
        livingItem[i].style.display = 'block';
        line[i].className = 'current-line line';
        // 取消冒泡，单击热聊时不会自动点赞
        e.stopPropagation();
    });
}

/* 
    直播点赞
*/
let handHeart = document.querySelector('.hand-heart');
let heartNum = 1;
handHeart.onclick = (e) => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '❤';
    handHeart.appendChild(heart);
    console.log(heartNum)
    if (heartNum % 2) {
        heart.style.animationName = 'heartUp';
    } else {
        heart.style.animationName = 'heartJump';
    }
    heartNum++;
    // 取消冒泡，单击热聊时不会自动点赞
    e.stopPropagation();
}

/* 
    喊话 && 禁言 切换
*/
let changeSwiper = document.querySelector('.change-swiper');
let changeNum = 0;
let chatBox = document.querySelector('.chat-box');
let chatInput = document.querySelector('.chat-box input');
let noSaying = document.querySelector('.no-saying');
// 获取弹幕列表
let bulletList = document.querySelector('.bullet-list');
changeSwiper.onclick = () => {
    // 热聊
    if (changeNum % 2) {
        changeSwiper.style.left = '0';
        changeSwiper.innerText = '热聊';
        chatInput.setAttribute('placeholder', '和大家聊聊吧');
        chatBox.style.pointerEvents = 'auto';
        bulletList.style.display = 'block';
        noSaying.style.display = 'none';
    } else {
        // 禁言
        changeSwiper.style.left = '16px';
        changeSwiper.innerText = '禁言';
        chatInput.setAttribute('placeholder', '全体禁言中');
        chatBox.style.pointerEvents = 'none';
        bulletList.style.display = 'none';
        noSaying.style.display = 'block';
    }
    changeNum++;
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
    // 开始计时
    starTime = Date.now();
    mediaRecorder = new MediaRecorder(hostStream);
    mediaRecorder.start();
    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
    };
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

