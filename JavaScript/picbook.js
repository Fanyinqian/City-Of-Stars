let button = document.getElementById('bookshelf_button');
var bookshelf = document.getElementById('bookshelf');
button.onclick = () => {
    bookshelf.classList.toggle('ani');
}

let first = document.getElementById('first');
var last = document.getElementById('last');
// console.log(first);
// 页码
var pageNum = 0;
let runPage = document.getElementsByClassName('runPage');
let one = document.getElementsByClassName('one');
let two = document.getElementsByClassName('two');
let nextBtn = document.getElementById('nextBtn');
let lastBtn = document.getElementById('lastBtn');
let bookBox = document.getElementById('bookBox');



// 初始化index
var isclick = true;
console.log(images.length);

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
let page = document.getElementById('page');
let btn = document.getElementById('btn');
// 下一页
nextBtn.onclick = () => {
    if (pageNum < runPage.length) {
        if (isclick) {
            isclick = false;
            runNext(pageNum);
            pageNum++;
        }
    };
    console.log(pageNum);
}
// 右边向左翻动动画效果
function runNext(index) {
    runPage[index].classList.add('runClass');
    // 设置index
    zIndexNext(index, runPage[index]);
}

function zIndexNext(index, element) {
    // if (index >= 0) {
    element.style.zIndex = 2000;
    one[index].style.zIndex = 1000 + index * 2;
    two[index].style.zIndex = 1000 + index * 2 - 1;
    // };
    setTimeout(function () {
        // if (index == 0) {
        // element.css('z-index', 3 + 2 * index);
        element.style.zIndex = 1000 + index * 2;
        // };
        // element.children('div').css('z-index', 2 + 2 * index);
        one[index].style.zIndex = 1000 + index * 2 - 1;
        two[index].style.zIndex = 1000 + index * 2;
        // element.children('img').css('z-index', 3 + 2 * index);
        isclick = true;
        setTimeout(function () {
            element.style.zIndex = index * 2 + 2;
            one[index].style.zIndex = index * 2 + 2;
            two[index].style.zIndex = index * 2 + 3;
        }, 500);
    }, 1000);
}
// 上一页 左边向右翻动去到下一页
lastBtn.addEventListener('click', () => {
    if (pageNum >= 1) {
        if (isclick) {
            isclick = false;
            pageNum--;
            runLast(pageNum);
        }
    };
    console.log(pageNum);
})

function runLast(index) {
    runPage[index].classList.remove('runClass');
    zIndexLast(index, runPage[index]);
}

function zIndexLast(index, element) {
    // if (index == 0) {
    //     element.style.zIndex = 7 - 2 * index;
    // };
    element.style.zIndex = 2000;
    one[index].style.zIndex = 1000 + index * 2 - 1;
    two[index].style.zIndex = 1000 + index * 2;
    setTimeout(function () {
        element.style.zIndex = 1000 + index * 2;
        // };
        // element.children('div').css('z-index', 2 + 2 * index);
        one[index].style.zIndex = 1000 + index * 2;
        two[index].style.zIndex = 1000 + index * 2 - 1;
        isclick = true;
        setTimeout(function () {
            element.style.zIndex = runPage.length * 2 + 1 - index * 2;
            one[index].style.zIndex = runPage.length * 2 + 1 - index * 2;
            two[index].style.zIndex = runPage.length * 2 - index * 2;
            // console.log(123);
        }, 500);
    }, 1000);
}