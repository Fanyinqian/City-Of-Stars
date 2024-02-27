let page = document.getElementById('page');
let btn = document.getElementById('btn');

// 初始化index
var isclick = true;
// 设置页面对应的index
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


// 右边向左翻动动画效果
function runNext(index) {
    runPage[index].classList.add('runClass');
    // 设置index
    zIndexNext(index, runPage[index]);
}
// 右边向左翻动页面后的层级设置--下一页
function zIndexNext(index, element) {
    // if (index >= 0) {
    element.style.zIndex = 2000;
    one[index].style.zIndex = 1000 + index * 2;
    two[index].style.zIndex = 1000 + index * 2 - 1;
    // };
    zIndexNextSetTimeOut1 = setTimeout(function () {
        // if (index == 0) {
        // element.css('z-index', 3 + 2 * index);
        element.style.zIndex = 1000 + index * 2;
        // };
        // element.children('div').css('z-index', 2 + 2 * index);
        one[index].style.zIndex = 1000 + index * 2 - 1;
        two[index].style.zIndex = 1000 + index * 2;
        // element.children('img').css('z-index', 3 + 2 * index);
        isclick = true;
        zIndexNextSetTimeOut2 = setTimeout(function () {
            element.style.zIndex = index * 2 + 2;
            one[index].style.zIndex = index * 2 + 2;
            two[index].style.zIndex = index * 2 + 3;
        }, 500);
    }, 1000);
}


function runLast(index) {
    runPage[index].classList.remove('runClass');
    zIndexLast(index, runPage[index]);
    console.log(index);
}

function zIndexLast(index, element) {
    element.style.zIndex = 2000;
    one[index].style.zIndex = 1000 + index * 2 - 1;
    two[index].style.zIndex = 1000 + index * 2;
    zIndexLastSetTimeOut1 = setTimeout(function () {
        element.style.zIndex = 1000 + index * 2;
        // };
        // element.children('div').css('z-index', 2 + 2 * index);
        one[index].style.zIndex = 1000 + index * 2;
        two[index].style.zIndex = 1000 + index * 2 - 1;
        isclick = true;
        zIndexLastSetTimeOut2 = setTimeout(function () {
            element.style.zIndex = runPage.length * 2 + 1 - index * 2;
            one[index].style.zIndex = runPage.length * 2 + 1 - index * 2;
            two[index].style.zIndex = runPage.length * 2 - index * 2;
        }, 500);
    }, 1000);
}