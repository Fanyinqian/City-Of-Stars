/* 
    地图出现与消失
*/
let map = document.querySelector('.map');
let mapWrapper = document.querySelector('.map-wrapper');
let cancelMap = document.querySelector('.cancel-map');
// 地图出现
map.onclick = () =>{
    mapWrapper.style.display = 'block';
    mapWrapper.style.animation = '3s cubic-bezier(.25, 1, .30, 1) circle-in-center both';
    let timer = setTimeout(function () {
    // 滚动条消失
    document.body.style.overflowY = "hidden";
    },350)
}

// 地图消失
cancelMap.onclick = () =>{
    mapWrapper.style.animation = '2.5s cubic-bezier(.25, 1, .30, 1) circle-out-top-right both';
    let timer = setTimeout(function () {
        // 滚动条出现
        document.body.style.overflowY = "inherit";
    },350);
}