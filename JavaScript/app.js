const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const container = document.querySelector('.container');
let signInBtn = document.querySelector(".sign-in");
let signUpBtn = document.querySelector(".sign-up");
let signUpPass = document.querySelector(".signup-pass");
let comfirmPwd = document.querySelector(".comfirmPwd");
let signInUp = document.querySelector(".signin-signup");
let signInNumber = document.querySelector(".signInNumber");
let signUpNumber = document.querySelector(".signUpNumber");
let signInPass = document.querySelector(".signInPass");
let userName = document.querySelector(".username");
// 获取弹窗
const popup = document.querySelector('.popup');
const inner = document.querySelector('.inner');
sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
    signInUp.style.zIndex = "5";
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
    signInUp.style.zIndex = "15";
});

//单击登录按钮
signInBtn.onclick = function () {
    // 账号和密码不为空时
    if (signInNumber.value != '' && signInPass.value != '') {
        sealAjax({
            url: 'http://106.55.197.233:666/cityofstar/user/login',
            type: 'post',
            data: {
                phoneNumber: signInNumber.value.trim(),
                password: signInPass.value
            },
        }).then(res => {
            console.log(res)
            // 输入错误
            if (res.code === 4004) {
                inner.innerText = '用户名或密码错误';
                popupAppear();
            } else if (res.code === 4003) {
                inner.innerText = '该用户已在其他设备登录';
                popupAppear();
                // 输入正确 
            } else {
                console.log(res)

                // 设置cookie
                setCookie('userId', res.data.userId, 3);
                setCookie('headPortrait', res.data.headPortrait, 3);
                // 跳页面
                window.location.href = "index.html";
            }


        })
    }
}

function validateTel(tel) { //校验电话
    if (tel != "") {
        let strRegex = /^(13|14|15|17|18)\d{9}$/;
        if (!strRegex.test(tel)) {
            return false;
        }
    }
    return true;
}

function validatePwd(Pwd){
    if (Pwd != "") {
        let strRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!strRegex.test(Pwd)) {
            return false;
        }
    }
    return true;
}
// console.log(cookie)
// //单击注册按钮
signUpBtn.onclick = function () {
    // 各种输入出错情况
    if (signUpPass.value == '' || comfirmPwd.value == '' || signUpNumber.value == '' || userName.value == '') {
        inner.innerText = '请完整填写信息';
        popupAppear();
    } else if (signUpPass.value != comfirmPwd.value) {
        inner.innerText = '两次输入的密码不一致';
        popupAppear();
        // 输入正确 
    } else if (!validateTel(signUpNumber.value.trim())) {
        inner.innerText = '请输入正确的手机号';
        popupAppear();
    } else if(!validatePwd(comfirmPwd.value.trim())){
        inner.innerText = '密码长度不少于8位，至少含有一个字母和一个数字';
        popupAppear();
    }else {
        sealAjax({
            url: ' http://106.55.197.233:666/cityofstar/user/register',
            type: 'post',
            data: {
                username: userName.value,
                phoneNumber: signUpNumber.value,
                password: signUpPass.value
            }
        }).then(res => {
            if (res.code === 4003) {
                inner.innerText = '该用户已存在，请重新输入';
                popupAppear();
            } else {
                container.classList.remove("sign-up-mode");
                signInUp.style.zIndex = "15";
            }
        });
    }
}
// 获取弹窗

/* 
    出现弹窗函数
*/
function popupAppear() {
    
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