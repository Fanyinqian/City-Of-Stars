// 性别
let el_sex_button = document.getElementsByClassName('el_sex_button');
let button_radio_inner = document.getElementsByClassName('button_radio_inner');
for (let index = 0; index < el_sex_button.length; index++) {
    button_radio_inner[index].onclick = () => {
        el_radio_button_radio_class();
        el_sex_button[index].classList.add('active');
    }
}

function el_radio_button_radio_class() {
    for (let index = 0; index < el_sex_button.length; index++) {
        el_sex_button[index].classList.remove('active');
    }
}

let el_form_input_username = document.getElementById('el_form_input_username');
let el_form_input_textarea = document.getElementById('el_form_input_textarea');
el_form_input_username.onfocus = () => {
    if (el_form_input_username.value == '用户名') {
        el_form_input_username.value = '';
        el_form_input_username.style.color = '#000';
    }
}
el_form_input_textarea.onfocus = () => {
    if (el_form_input_textarea.placeholder == '设置您的个性签名') {
        el_form_input_textarea.placeholder = '';
        el_form_input_textarea.style.color = '#000';
    }
}
el_form_input_username.onblur = () => {
    if (el_form_input_username.value == '') {
        el_form_input_username.value = '用户名';
        el_form_input_username.style.color = '#ccc';
    } else {
        el_form_input_username.style.color = '#000';
    }
}
el_form_input_textarea.onblur = () => {
    if (el_form_input_textarea.placeholder == '') {
        el_form_input_textarea.placeholder = '设置您的个性签名';
    } else {
        el_form_input_textarea.style.color = '#000';
    }
}

let per_id = document.getElementById('per_id');

// http://106.55.197.233:666/cityofstar/user/getUserInfo?userId=1
function getperson_info_fun() {
    sealAjax({
        url: 'http://106.55.197.233:666/cityofstar/user/getUserInfo',
        data: {
            userId: getCookie('userId')
        },
        type: 'get'
    }).then(res => {
        console.log(res.data);
        perInfo = res.data;
        el_form_input_username.value = perInfo.username;
        el_form_input_username.style.color = '#000';
        per_id.innerHTML = perInfo.phoneNumber;
        if (perInfo.userSign == undefined) {
            el_form_input_textarea.value = '设置我的个性签名';
        } else {
            el_form_input_textarea.value = perInfo.userSign;
        }
        el_radio_button_radio_class();
        if (perInfo.userSex == '男') {
            el_sex_button[0].classList.add('active');
        } else if (perInfo.userSex == '女') {
            el_sex_button[1].classList.add('active');
        } else {
            el_sex_button[2].classList.add('active');
        }
    })
}


let change_perInfo_button = document.getElementById('change_perInfo_button');
// 保存成功弹窗
let change_success = document.getElementById('change_success');
let change_seccess_box = document.getElementById('change_seccess_box');
change_perInfo_button.addEventListener('click', () => {
    var name = el_form_input_username.value;
    console.log(name);
    var text = el_form_input_textarea.value;
    var sex;
    for (var i = 0; i < el_sex_button.length; i++) {
        if (el_sex_button[i].classList.contains('active')) {
            if (i == 0) {
                sex = '男';
            } else if (i == 1) {
                sex = '女';
            } else {
                sex = '保密';
            }
        }
    }
    console.log(typeof (sex));
    sealAjax({
        url: 'http://106.55.197.233:666/cityofstar/user/update',
        type: 'post',
        data: {
            // perform
            userSex: sex,
            userSign: text,
            userName: name,
            userId: getCookie('userId')
        }
    }).then(res => {
        if (res.code == 200) {
            change_success.classList.add('change')
            change_seccess_box.style.display = 'flex';
            // let twoDays = 2 * 24 * 60 * 60;
            // console.log(name);
            // document.cookie = `username=${name};max-age=${twoDays}`;
            // console.log(getCookie('username'));
            left_info_show();
            setTimeout(() => {
                change_success.classList.remove('change')
                change_seccess_box.style.display = 'none';
            }, 2000)
        }
    })
})



// 渲染个人信息
left_info_show();

function left_info_show() {
    let left_person_name = document.getElementById('left_person_name');
    let left_person_id = document.getElementById('left_person_id');
    let left_person_sense = document.getElementById('left_person_sense');
    sealAjax({
        url: 'http://106.55.197.233:666/cityofstar/user/getUserInfo',
        data: {
            userId: getCookie('userId')
        },
        type: 'get'
    }).then(res => {
        console.log(res.data);
        var left_info = res.data;
        // 
        console.log(left_info.username);
        left_person_name.innerHTML = left_info.username;
        // left_person_id.innerHTML = left_info.phoneNumber;
        console.log(left_info.userStatus);
        if (left_info.userStatus != undefined) {
            stauts_image.innerHTML = `<img src="./images/emotion-${left_info.userStatus}.png" alt="" >`;
        }
        if (left_info.userSign == undefined) {
            left_person_sense.innerHTML = '';
        } else {
            left_person_sense.innerHTML = left_info.userSign;
        }
        setCookie('userName', left_info.username, 3);
        if (left_info.userSex == '男') {
            document.getElementById('person_sex').innerHTML = `<svg t="1668603928456" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2461" width="128" height="128"><path d="M126.77632 520.57088A190.6688 190.6688 0 1 0 317.44 329.18528a191.02208 191.02208 0 0 0-190.66368 191.3856z" fill="#F4CA1C" p-id="2462"></path><path d="M884.62336 71.68h-293.04832a34.816 34.816 0 0 0 0 69.632h242.432l-210.73408 211.6096A340.66944 340.66944 0 0 0 404.5312 273.60768a344.42752 344.42752 0 1 0 267.38176 128.97792l211.03104-211.88608v243.2a34.688 34.688 0 1 0 69.376 0V139.648A67.90656 67.90656 0 0 0 884.62336 71.68zM404.5312 892.928a274.82624 274.82624 0 1 1 273.7152-274.82112A274.58048 274.58048 0 0 1 404.5312 892.928z" fill="#595BB3" p-id="2463"></path></svg>`;
        } else if (left_info.userSex == '女') {
            document.getElementById('person_sex').innerHTML = `
            <svg t="1668603551991" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2292" width="128" height="128"><path d="M869.888 512.90112a190.62272 190.62272 0 1 0-190.62272 190.22336 190.42304 190.42304 0 0 0 190.62272-190.22336z" fill="#F4CA1C" p-id="2293"></path><path d="M614.28736 76.8a342.22592 342.22592 0 0 0-267.43296 556.92288L252.16 728.2688 136.03328 612.352a34.66752 34.66752 0 0 0-49.06496 48.98304l116.12672 115.93728-116.12672 115.92192a34.6624 34.6624 0 0 0 49.06496 48.97792l116.12672-115.93728 116.1216 115.93728a34.6624 34.6624 0 1 0 49.06496-48.97792l-116.12672-115.9424 94.2848-94.1312A342.76864 342.76864 0 1 0 614.28736 76.8z m0 615.936a273.32096 273.32096 0 1 1 273.7664-273.32096 273.85344 273.85344 0 0 1-273.7664 273.32096z" fill="#595BB3" p-id="2294"></path></svg>
            `;
        } else {
            document.getElementById('person_sex').innerHTML = `<svg t="1668604065564" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2322" width="128" height="128"><path d="M510.8224 513.1264m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#ffffff" p-id="2323" data-spm-anchor-id="a313x.7781069.0.i0" class=""></path><path d="M324.4544 387.9424c-11.6224-128.2048 98.304-206.3872 186.4704-206.3872 87.552 0 197.7856 77.056 186.6752 206.3872 3.072 0.3584 6.144 0.768 9.216 1.0752 46.0288 5.1712 78.1312 38.912 78.5408 85.1968 0.7168 76.2368 0.8192 152.4736-0.0512 228.6592-0.5632 49.92-38.0928 85.8112-88.064 85.8624-124.3136 0.1536-248.6272 0.1536-372.8896 0-50.5856-0.0512-87.6544-35.7376-88.1664-86.4768-0.7168-75.9296-0.6656-151.8592 0-227.7888 0.4096-46.9504 32.256-80.5376 78.8992-85.6064 2.9696-0.2048 5.8368-0.512 9.3696-0.9216z m57.2928-0.0512h257.8944c7.7312-48.7936-14.8992-101.2736-56.2688-127.488-47.2064-30.0032-96.0512-31.0272-143.104-0.8192-45.9776 29.4912-62.6688 74.24-58.5216 128.3072z m26.7776 164.352c-0.2048 20.992 4.7104 43.264 20.3776 60.672 12.9536 14.336 20.5824 28.4672 21.3504 48.64 0.9728 26.8288 22.7328 47.6672 48.896 52.5312 26.7776 4.9664 52.8896-7.6288 65.8944-31.488 7.0144-12.8512 7.424-26.8288 7.8848-40.9088 0.1024-3.84 1.9456-8.2432 4.352-11.3664 6.7072-8.7552 15.4112-16.2304 20.992-25.6512 19.712-33.1776 20.1216-67.6864 1.792-101.2736-19.1488-35.072-50.432-52.992-90.0608-52.8896-56.2176 0.1536-98.6112 42.752-101.4784 101.7344z" fill="#595bb3" p-id="2324" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path><path d="M510.8224 500.48c23.1936 0 42.8032 14.592 49.8688 37.0688 6.656 21.248-1.024 46.1312-20.3264 57.856-13.7216 8.3456-18.5856 19.1488-17.664 34.2016 0.4608 7.5776 0.256 15.2064-0.1024 22.8352-0.3584 7.3216-4.1984 12.544-11.9296 12.4928-7.68-0.0512-11.52-5.0176-11.6736-12.5952-0.1536-8.4992-0.3584-16.9984-0.0512-25.4464 0.4096-13.4144-4.352-23.1936-16.3328-30.5152-20.1216-12.3392-28.4672-36.3008-21.8112-58.0096 7.2704-23.5008 26.1632-37.888 50.0224-37.888z" fill="#f4ca1c" p-id="2325" data-spm-anchor-id="a313x.7781069.0.i4" class=""></path></svg>`;
        }
    })
}