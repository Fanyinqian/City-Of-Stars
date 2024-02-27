/* 
    导航栏背景音乐播放
*/
let music = document.querySelector(".music")
let musicAction = document.querySelector(".music-action");
let musicStop = document.querySelector(".music-stop");
let musicAudio = document.querySelector(".music-audio");
// 判断音乐播放状态
let musicState = false; 

if(localStorage.getItem('musicProgress')!= null){
    musicAudio.currentTime = localStorage.getItem('musicProgress');
    // 字符串转为布尔值
    musicState = JSON.parse(localStorage.getItem('musicState'));
    if(musicState){
        // musicAudio.play();
        musicStop.style.display = "inline-block";
        musicAction.style.display = "none";
        
    }else{
        musicAudio.pause();
        musicStop.style.display = "none";
        musicAction.style.display = "inline-block";
    }
}

music.addEventListener('click',JudgeMusicState);

function JudgeMusicState(){
    if(musicState){
        // 关闭音乐，改变状态
        musicAudio.pause();
        musicState = false;
        // 改变图标
        musicStop.style.display = "none";
        musicAction.style.display = "inline-block";
        //清除缓存
        window.localStorage.removeItem('musicProgress');
        window.localStorage.removeItem('musicState');
        
    }else{
        // 开启音乐，改变状态
        musicAudio.play();
        musicState = true;
        // 改变图标
        musicStop.style.display = "inline-block";
        musicAction.style.display = "none";
    }
}


window.addEventListener('pagehide',containProgress);
function containProgress(){
    let progress = musicAudio.currentTime;

    window.localStorage.setItem('musicProgress',`${progress}`);
    window.localStorage.setItem('musicState',`${musicState}`);
}

