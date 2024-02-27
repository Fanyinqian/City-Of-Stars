var minifigure = document.querySelector('.minifigure');
var faces = document.querySelector('.faces');
var upperBody = document.querySelector('.upper-body');
var lowerBody = document.querySelector('.lower-body');
var explode = document.querySelector('.explode');
var randomize = document.querySelector('.randomize');
// 第几个表情
var expressionRangeInput = document.querySelector('.expression-range');
var colorRangeInput = document.querySelectorAll('.color-range');
var upperHue = document.getElementById('upper-hue');
var upperSaturation = document.getElementById('upper-saturation');
var upperLightness = document.getElementById('upper-lightness');
var lowerHue = document.getElementById('lower-hue');
var lowerSaturation = document.getElementById('lower-saturation');
var lowerLightness = document.getElementById('lower-lightness');

// let upperHueVal = parseInt(upperHue.value);
explode.addEventListener('click', explodeMinifigure);
randomize.addEventListener('click', randomizeInputs);
// 设置几个表情
expressionRangeInput.addEventListener('input', setExpression);

for (var i = 0; i < colorRangeInput.length; i++) {
    colorRangeInput[i].addEventListener('input', setColors);
}

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}

function explodeMinifigure() {
    // 点击保存
    // 修改表情
    let expressionVal = parseInt(expressionRangeInput.value);
    sealAjax({
        url: 'http://106.55.197.233:666/cityofstar/userIp/update',
        data: {
            userId: getCookie("userId"),
            filedName: 'ipHead',
            value: expressionVal
        },
        Header: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        // showIp();
    })
    // 修改颜色
    changecolorAjax(upperHue.value, 'ipLowHue')
    changecolorAjax(upperSaturation.value, 'ipLowLightness')
    changecolorAjax(upperLightness.value, 'ipLowSaturation')
    changecolorAjax(lowerHue.value, 'ipUpHue')
    changecolorAjax(lowerSaturation.value, 'ipUpLightness')
    changecolorAjax(lowerLightness.value, 'ipUpSaturation')
};

// 随机切换
function randomizeInputs() {
    var randomExpression = getRandomNum(0, 5);
    var randomUpperHue = getRandomNum(0, 360);
    var randomUpperSaturation = getRandomNum(0, 100);
    var randomUpperLightness = getRandomNum(0, 90);
    var randomLowerHue = getRandomNum(0, 360);
    var randomLowerSaturation = getRandomNum(0, 100);
    var randomLowerLightness = getRandomNum(0, 90);

    expressionRangeInput.value = randomExpression * 100;
    console.log(expressionRangeInput.value);
    upperHue.value = randomUpperHue;
    // console.log('upperHue.value', upperHue.value);
    upperSaturation.value = randomUpperSaturation;
    upperLightness.value = randomUpperLightness;
    lowerHue.value = randomLowerHue;
    lowerSaturation.value = randomLowerSaturation;
    lowerLightness.value = randomLowerLightness;

    setExpression();
    setColors();
};
// 设置表情
function setExpression() {
    let expressionVal = parseInt(expressionRangeInput.value);
    console.log(expressionVal);
    faces.style.transform = 'translateX(-' + expressionVal + '%)';
};

function setColors() {
    console.log("setcolor");
    let upperHueVal = parseInt(upperHue.value);
    // changecolorAjax(upperHueVal, upperHue.value, 'ipLowHue')
    let upperSaturationVal = parseInt(upperSaturation.value);
    // changecolorAjax(upperSaturationVal, upperSaturation.value, 'ipLowLightness')
    let upperLightnessVal = parseInt(upperLightness.value);
    // changecolorAjax(upperLightnessVal, upperLightness.value, 'ipLowSaturation')
    let lowerHueVal = parseInt(lowerHue.value);
    // changecolorAjax(lowerHueVal, lowerHue.value, 'ipUpHue')
    let lowerSaturationVal = parseInt(lowerSaturation.value);
    // changecolorAjax(lowerSaturationVal, lowerSaturation.value, 'ipUpLightness')
    let lowerLightnessVal = parseInt(lowerLightness.value);
    // changecolorAjax(lowerLightnessVal, lowerLightness.value, 'ipUpSaturation')

    upperBody.style.color = 'rgb(' + upperHueVal + ',' + upperSaturationVal + ',' + upperLightnessVal + ')';
    lowerBody.style.color = 'rgb(' + lowerHueVal + ',' + lowerSaturationVal + ',' + lowerLightnessVal + ')';
};
// 渲染ip小人
showIp();

function showIp() {
    // 获取ip人的n个东西
    sealAjax({
        url: 'http://106.55.197.233:666/cityofstar/userIp/getUserIp',
        data: {
            userId: getCookie('userId')
        }
    }).then(res => {
        console.log(res.data);
        let idpeople = res.data;
        // 第几个表情
        let expressionID = parseInt(idpeople.ipHead);
        // 表情的input
        expressionRangeInput.value = expressionID;
        faces.style.transform = 'translateX(-' + expressionID + '%)';
        // 颜色的input
        upperHue.value = idpeople.ipLowHue;
        upperSaturation.value = idpeople.ipLowLightness
        upperLightness.value = idpeople.ipLowSaturation
        lowerHue.value = idpeople.ipUpHue
        lowerSaturation.value = idpeople.ipUpLightness
        lowerLightness.value = idpeople.ipUpSaturation
        upperBody.style.color = 'rgb(' + idpeople.ipLowHue + ',' + idpeople.ipLowLightness + ',' + idpeople.ipLowSaturation + ')';
        lowerBody.style.color = 'rgb(' + idpeople.ipUpHue + ',' + idpeople.ipUpLightness + ',' + idpeople.ipUpSaturation + ')';
    })
}


function changecolorAjax(str, value) {
    // if (str1 != str2) {
    sealAjax({
        url: 'http://106.55.197.233:666/cityofstar/userIp/update',
        data: {
            userId: getCookie("userId"),
            filedName: value,
            value: str
        },
        Header: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        console.log("修改成功");
    })
}