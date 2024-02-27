var result = {}

function setVariable(variable, number) {
    result[variable] = number;
}

function getVariable(variable) {
    return result[variable];
}

function popup_something(text) {
    change_success.innerHTML = text;
    change_seccess_box.style.display = 'flex';
    change_success.classList.add('change')
    setTimeout(() => {
        change_success.classList.remove('change')
        change_seccess_box.style.display = 'none';
    }, 1000)
}


// 退出登录
document.getElementById('login_out').addEventListener('click', () => {
    sealAjax({
        // http://localhost:8080/cityofstar/user/logout?userId=15
        url: 'http://106.55.197.233:666/cityofstar/user/logout',
        data: {
            userId: getCookie('userId')
        }
    }).then(res => {
        window.location.href = 'index.html';
    })
})

// let message_popup = document.getElementById('message_popup');
document.getElementById('message_us').addEventListener('click', () => {
    message_popup.style.display = 'block';
    document.getElementById('form-wrap').classList.remove('unhover');
    document.getElementById('form-wrap').classList.add('hover');
    document.getElementById('message_from').classList.remove('unhover');
    document.getElementById('message_from').classList.add('hover');
})
// let message_submit = document.getElementById('message_submit');

message_submit.addEventListener('click', () => {
    event.stopPropagation();
    document.getElementById('form-wrap').classList.remove('hover');
    document.getElementById('form-wrap').classList.add('unhover');
    document.getElementById('message_from').classList.remove('hover');
    document.getElementById('message_from').classList.add('unhover');
    setTimeout(() => {
        message_popup.style.display = 'none';
    }, 800)
})