let playoff = document.querySelector(".playoff");
let playon = document.querySelector(".playon");
let video = document.querySelector(".video");
let pre = document.querySelector('.pre');
let next = document.querySelector('.next');
let playerProgram = document.querySelector('.player-program');
let playerAuthor = document.querySelector('.player-anchor');
let programImg = document.querySelector(".info-top img");
let progressUpdate = document.querySelector(".progress-update");
playoff.onclick = function(){
    // 切换按钮
    playoff.style.display = "none";
    playon.style.display = "inline-block";
    playsong();
}

playon.onclick = function(){
    // 切换按钮
    playon.style.display = "none";
    playoff.style.display = "inline-block";
    pausesong();
}

pre.onclick = function(){
	presong();
}
next.onclick = function(){
	nextsong();
}



// 播放音频
function playsong(){
    video.play();
}

// 暂停音频
function pausesong(){
	video.pause();
}

let videoIndex = 0;
let authornameIndex = 0;

// function loadsong(program,authorname){
// 	playerProgram.innerHTML = program;
// 	playerAuthor.innerHTML = authorname;
// 	programImg.src=`images/program-${videoIndex}.jpg`;
// 	video.src=`video/video-${videoIndex+1}.mp3`;
// }
const videos= ["只要我们拥抱，就能互相取暖","拒绝EMO的神奇心理疗法","不要错过最后一班回家的车和爱你的人","请给予理想足够的包容和耐心"];
const authors= ["伴听FM","三亩","EIKO","潘"];
//上一首
function presong(){
    videoIndex--;
	if(videoIndex<=0){
		videoIndex=videos.length-1;
	}
	loadsong(videos[videoIndex],authors[authornameIndex]);
	video.play();
	playoff.style.display="none";
	playon.style.display="inline-block";
}

//下一首
function nextsong(){
	videoIndex++;
	authornameIndex++;
	if(videoIndex>=videos.length-1){
		videoIndex=0;
		authornameIndex=0;
	}
	
	loadsong(videos[videoIndex],authors[authornameIndex]);
	video.play();
	playoff.style.display="none";
	playon.style.display="inline-block";
}

//音频播放完时
video.onended = function(){
	nextsong();
}

//进度条
function updateprogress(e){
	const{duration,currentTime}=e.target;
	const updatetime=(currentTime/duration)*100;
	progressUpdate.style.width=`${updatetime}%`
}
//随音乐播放触发
video.ontimeupdate = updateprogress;

/* 
	热度排行音频播放
*/
// 获取热度排行播放按钮
let rankPlay = document.querySelectorAll(".rank-play");
let action = document.querySelectorAll(".action");
let stop = document.querySelectorAll(".stop");

//获取精选节目音频按钮
let programBtn = document.querySelectorAll(".program-btn");
let programAction = document.querySelectorAll(".program-action");
let programStop = document.querySelectorAll(".program-stop");

//获取正在直播音频按钮
let playBtn = document.querySelectorAll(".play-btn");
let liveAction = document.querySelectorAll(".live-action");
let liveStop = document.querySelectorAll(".live-stop");
// 点击播放按钮，播放对应音频
playBtnChange(rankPlay,stop,action);
playBtnChange(programBtn,programStop,programAction);
playBtnChange(playBtn,liveStop,liveAction);



function playBtnChange(obj,stopIcon,actionIcon){
	let flag = [];
	for(let i = 0;i < obj.length;i++){
		flag[i] = 0;
		obj[i].onclick = () =>{
			// 全部音乐暂停
			for(let j = 0;j < obj.length;j++){
				if(i == j){
					continue;
				}
				if(flag[j] % 2){
					stopIcon[j].style.display = 'none';
					actionIcon[j].style.display = 'block';
					flag[j]++;
				}
			}

			if(flag[i] % 2){
				stopIcon[i].style.display = 'none';
				actionIcon[i].style.display = 'block';
				flag[i]++;
				// 暂停音频
				video.pause()
			}else{
				// 切换图标
				stopIcon[i].style.display = 'block';
				actionIcon[i].style.display = 'none';
				flag[i]++;
				// 播放音频
				playsong();
			} 
		}	
	}
}



