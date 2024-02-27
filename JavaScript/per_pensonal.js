// 文本框滚动条设置
let person_right_textarea = document.getElementById('person_right_textarea');
let already_input_number = document.getElementById('already_input_number');
let photo_box_img = document.getElementById('photo_box_img');
let person_right_send = document.getElementById('person_right_send');
let person_right_img_show_box = document.getElementById('person_right_img_show_box');
// 点击编辑按钮弹窗出现
let change = document.getElementById('change');

change.onclick = () => {
    person_right_send.style.display = 'block';
    person_right_send.classList.toggle('display_block')
    person_box_right.classList.toggle('padding_top')
    if (!person_right_send.classList.contains('display_block')) {
        person_box_right.style.paddingTop = '';
        person_right_send.style.display = 'none';
    }
}

// 获取当前的文本长度
var currentLength;
// 获取右边整体的盒子
let person_box_right = document.getElementById('person_box_right');
person_right_textarea.addEventListener('input', (e) => {
    person_right_textarea.style.height = '100px';
    person_right_textarea.style.height = e.target.scrollHeight + 'px';
    currentLength = person_right_textarea.value.length;
    // 返回已经输入了多少个文字
    var current = person_right_textarea.value;
    already_input_number.innerHTML = currentLength;
    console.log(person_right_send.clientHeight);
    person_box_right.style.paddingTop = person_right_send.clientHeight + 'px';
});


let head = "http://106.55.197.233:666/upload/";

let array = document.cookie.split(';').map(cookie => cookie.split('='));
// 提取cookie
let cookie = {};
for (let i = 0; i < array.length; i++) {
    let name = array[i][0];
    let value = array[i][1];
    // 对值进行解码
    cookie[name] = decodeURIComponent(value);
}

// 获取用户头像
let user_img = document.getElementById('user_img');
user_img.src = `${head+getCookie('headPortrait')}`;
// 用户修改头像
let change_logo_input = document.getElementById('change_logo_input');
change_logo_input.addEventListener('change', () => {
    let userimg = change_logo_input.files[0];
    console.log(userimg);
    let formdata = new FormData();
    formdata.append('headPortrait', userimg);
    formdata.append('userId', getCookie('userId'));
    let userimg_xhr = new XMLHttpRequest();
    userimg_xhr.open('post',
        'http://106.55.197.233:666/cityofstar/user/updateHead')
    userimg_xhr.send(formdata);
    userimg_xhr.onreadystatechange = () => {
        if (userimg_xhr.readyState === 4) {
            if (userimg_xhr.status === 200) {
                console.log("上传头像成功");
                popup_something("上传头像成功")
                // 修改cookie里面的头像
                const {
                    code,
                    data,
                    msg
                } = JSON.parse(userimg_xhr.responseText);
                setCookie('headPortrait', data, 3);
                userHead.src = `${head+getCookie('headPortrait')}`;
                user_img.src = `${head+getCookie('headPortrait')}`;
                // 动态刷新
                show_per_text_fun();
            }
        }
    }
})

let userHead = document.querySelector('.user img');
userHead.src = `${head+getCookie('headPortrait')}`;

// 存放故事的id
var story_id = {}
show_per_text_fun();

function show_per_text_fun() {
    // 查看用户动态
    sealAjax({
        url: 'http://106.55.197.233:666/cityofstar/story/getUserStory',
        data: {
            userId: getCookie('userId'),
            size: 9999,
            page: 1
        }
    }).then(res => {
        var person_box_right_str = "";
        console.log(res.data);
        var person_story = res.data;
        // for (let index = 0; index < person_story.length; index++) {
        // 循环遍历n个用户动态
        for (let index = 0; index < person_story.length; index++) {

            story_id['person_story' + index] = person_story[index].queryStory.storyId;
            // r_newsboe_input[index].setAttribute('id', person_story[index].story.storyId)
            // console.log(person_story[index].story.storyId);
            person_box_right_str += `
            <!-- 每个动态 -->
            <div class="r_newsbox">
                <!-- 个人信息 -->
                <div class="r_newsbox_personalinfo">
                    <div class="logo">
                        <img src="${head+person_story[index].queryStory.userHead}" alt="" class='towhichperSpace'>
                    </div>
                    <div class="name_box">
                        <div class="name">
                            ${person_story[index].queryStory.userName}
                        </div>
                    </div>
                    <div class="time">
                        ${changeTime(getDateTimeStamp(person_story[index].queryStory.publishTime))}
                    </div>
                    
                </div>
                <!-- 动态内容 -->
                <div class="r_newsbox_contain">
                    <pre class="r_newsbox_text">${person_story[index].queryStory.storyContext}</pre>
                    <!-- 判断是否有图片 -->
                    `
            if (person_story[index].storyImgs.length != 0) {
                person_box_right_str += `
                    <div class="r_newsbox_pic">
                        <!-- 循环遍历image -->
                        <div class="image">
                            <img src="${head+person_story[index].storyImgs[0].imgUrl}" alt="">
                        </div>
                    </div>
                `
            }

            person_box_right_str += `
                </div>
                <!-- 点赞评论和权限不用渲染 -->
                <div class="r_newsbox_set">
`
            // if (person_story[index].fatherComments.length != 0) {
            person_box_right_str += `
                    <span class="r_comment_button" id="r_comment_button">展开评论(${person_story[index].fatherComments.length})</span>
                `
            // }
            person_box_right_str += `
                    <div class="belike icon belike_delete">
                        <div class="image">
                            <svg t="1667617492887" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2292" width="200" height="200"><path d="M200.60672 729.216s108.23168-61.79328 295.97184 0c75.10016 22.07232 159.03232 57.38496 326.89664-15.44704 6.62528 59.59168-2.20672 150.07744-2.20672 150.07744l-50.80064 75.04384-485.92896 2.20672L216.064 888.12544z" fill="#8a8a8a" p-id="2293"></path><path d="M702.17216 967.68H313.69728c-80.384 0-145.7664-60.928-145.7664-135.79776V355.95776a33.11616 33.11616 0 1 1 66.23744 0v475.92448c0 38.3488 35.67616 69.54496 79.53408 69.54496h388.48c43.8528 0 79.53408-31.19616 79.53408-69.54496V355.95776a33.11616 33.11616 0 1 1 66.23232 0v475.92448C847.93856 906.752 782.54592 967.68 702.17216 967.68z m-366.44864-309.17632a33.12128 33.12128 0 0 1-33.11616-33.1264V411.16672a33.11616 33.11616 0 1 1 66.23232 0v214.21056a33.12128 33.12128 0 0 1-33.11616 33.1264z m168.89856 0a33.12128 33.12128 0 0 1-33.11616-33.1264V411.16672a33.11616 33.11616 0 1 1 66.23744 0v214.21056a33.12128 33.12128 0 0 1-33.11616 33.1264z m168.90368 0a33.1264 33.1264 0 0 1-33.12128-33.1264V411.16672a33.12128 33.12128 0 1 1 66.23744 0v214.21056a33.12128 33.12128 0 0 1-33.11616 33.1264z m225.19808-379.83744H130.39616a33.1264 33.1264 0 0 1 0-66.2528h768.32768a33.1264 33.1264 0 0 1 0 66.2528z m-225.19808-86.09792a33.12128 33.12128 0 0 1-33.12128-33.1264 42.0352 42.0352 0 0 0-41.984-41.984h-187.5968a42.03008 42.03008 0 0 0-41.984 41.984 33.11616 33.11616 0 1 1-66.23232 0A108.35456 108.35456 0 0 1 410.82368 51.2h187.5968a108.35456 108.35456 0 0 1 108.22144 108.24704 33.12128 33.12128 0 0 1-33.11616 33.12128z" fill="#8a8a8a" p-id="2294"></path></svg>
                        </div>
                    </div>
                    <div class="news icon">
                        <div class="image news_click">
                            <svg t="1667541610970" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="3019" width="200" height="200">
                                <path
                                    d="M820.8896 807.9872H487.46496a39.64928 39.64928 0 0 0-22.58944 7.07072l-135.75168 94.13632a39.7056 39.7056 0 0 1-61.39392-24.19712l-10.10176-45.74208a39.7824 39.7824 0 0 0-38.80448-31.26784l0.19968-148.992a146.5344 146.5344 0 0 1 146.24256-146.62656h535.1168a39.82848 39.82848 0 0 1 39.74656 39.90528v136.00768a119.4752 119.4752 0 0 1-119.23968 119.7056z"
                                    fill="#8a8a8a" p-id="3020"></path>
                                <path
                                    d="M815.39072 112.64H198.3744A157.83936 157.83936 0 0 0 40.96 270.55104v379.78112a157.84448 157.84448 0 0 0 157.4144 157.91104h14.79168a1.62816 1.62816 0 0 1 1.57696 1.27488l10.10688 45.71648a77.77792 77.77792 0 0 0 120.32 47.3856l135.78752-94.08512a1.62816 1.62816 0 0 1 0.9216-0.29184h333.5168A157.83936 157.83936 0 0 0 972.8 650.33216V270.55104A157.83936 157.83936 0 0 0 815.39072 112.64zM896.512 650.33216a81.35168 81.35168 0 0 1-81.13152 81.408H481.87904a77.42464 77.42464 0 0 0-44.27264 13.824L301.81888 839.68a1.61792 1.61792 0 0 1-2.50368-0.98816l-10.10688-45.71648a77.47584 77.47584 0 0 0-76.04736-61.23008h-14.78656a81.3568 81.3568 0 0 1-81.13664-81.408V270.55104a81.3568 81.3568 0 0 1 81.13664-81.408h617.01632a81.35168 81.35168 0 0 1 81.13152 81.408v379.78112zM337.98656 424.68352a49.24416 49.24416 0 1 0 49.08544 49.24416 49.152 49.152 0 0 0-49.08544-49.24416z m184.0896 0a49.24416 49.24416 0 1 0 49.09056 49.24416 49.152 49.152 0 0 0-49.09056-49.24416z m177.07008 0a49.24416 49.24416 0 1 0 49.09056 49.24416 49.152 49.152 0 0 0-49.09056-49.24416z"
                                    fill="#8a8a8a" p-id="3021"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="set icon">
                        <div class="image">
                            <svg t="1667540980035" class="icon changeColor" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2292" width="200"
                                height="200">
                                <path
                                    d="M705.30048 510.208a281.12896 281.12896 0 0 0-267.83744 367.64672c121.04704-0.45056 234.8544-0.82944 275.12832-0.82944 99.28704 0 138.54208-131.45088 138.54208-131.45088s17.36192-45.77792 41.64096-163.88096a280.576 280.576 0 0 0-187.47392-71.48544z"
                                    fill="#8a8a8a" p-id="2293"></path>
                                <path
                                    d="M929.87904 366.208c-42.30144-45.22496-104.12544-43.43296-117.248-42.496l-167.21408 0.87552a4.23424 4.23424 0 0 1-3.82976-1.8432 4.55168 4.55168 0 0 1-0.87552-4.096c3.82464-15.36 8.66816-35.06688 14.76096-60.09344 15.90272-65.3568-2.14016-107.5712-20.07552-131.47648a127.6672 127.6672 0 0 0-97.3568-50.176C469.38112 73.88672 423.936 109.056 402.944 181.21216l-0.54784 2.11456C359.06048 374.48704 202.59328 376.7808 195.42528 376.7808h-69.12A75.20768 75.20768 0 0 0 51.2 451.93728v414.99136A75.07968 75.07968 0 0 0 126.2336 942.08h0.32768c85.70368-0.35328 517.632-2.14016 604.672-2.14016 119.936 0 167.31648-140.0576 172.288-155.89376 3.7376-10.29632 28.39552-81.77152 58.9312-253.16352 12.90752-72.38656 1.92512-127.7952-32.57344-164.67456z m-38.1184 152.064c-31.00672 174.03392-55.61856 240.95232-55.808 241.53088l-0.83968 2.47296c-0.31232 1.05984-33.49504 105.82016-103.87456 105.82016-87.1424 0-519.2192 1.78176-604.9536 2.14016a3.28704 3.28704 0 0 1-2.304-0.94208 3.2256 3.2256 0 0 1-0.9728-2.36032V451.93728a3.30752 3.30752 0 0 1 3.3024-3.3024h68.66432c76.07808 1.23392 231.63904-49.83808 277.15584-248.28928 13.37344-45.056 32.42496-52.93568 62.78656-51.6096a56.22272 56.22272 0 0 1 43.07456 21.5296c12.39552 16.512 15.06304 41.17504 7.72608 71.3216a13144.1152 13144.1152 0 0 1-14.6688 59.75552 76.61056 76.61056 0 0 0 74.32704 95.11424h0.40448l168.58112-0.88064 3.48672-0.18944c0.37376-0.03072 38.26688-3.30752 59.904 20.2496 22.36928 24.2944 19.96288 69.22752 14.00832 102.6304zM232.27904 505.94816a35.91168 35.91168 0 0 0-35.8912 35.92704v236.42624a35.8912 35.8912 0 1 0 71.78752 0v-236.42624a35.91168 35.91168 0 0 0-35.89632-35.92704z"
                                    fill="#8a8a8a" p-id="2294"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                    <!-- 用户评论 -->
                <div class="r_newsbox_comm_contain" id="r_newsbox_comm_contain">
                    `
            if (person_story[index].fatherComments.length != 0) {

                // 循环遍历n个评论
                for (var fac = 0; fac < person_story[index].fatherComments.length; fac++) {

                    person_box_right_str += `
                    <!-- 每个评论//循环遍历 -->
                    <div class="comment_box2">
                        <!-- 头像 -->
                        <div class="user_popover">
                            <img src="${head + person_story[index].fatherComments[fac].headUrl}" alt="">
                        </div>
                        <!-- 内容 -->
                        <div class="content_box">
                            <div class="comment_main">
                                <!-- 用户名： -->
                                <div class="user_box">
                                    <div class="name">${person_story[index].fatherComments[fac].userName}</div>
                                    <time class="time">${changeTime(getDateTimeStamp(person_story[index].fatherComments[fac].publishTime))}</time>
                                </div>
                                <!-- 评论内容 -->
                                <div class="content">
                                    ${person_story[index].fatherComments[fac].commentText}
                                </div>
                                <!-- 回复评论 -->
                                <div class="action_box">
                                    <div class="item action_box_item_click">
                                        回复
                                    </div>
                                </div>
                                <!-- 展开收起 //待定-->
                                <!-- 二级评论和评论回复 -->
                                <div class="subcomment_wrapper">
                                    <!-- 发送评论的评论 -->
                                    <div class="comment_form">
                                        <!-- <div class="input_box"> -->
                                        <div class="comment_form_label"></div>
                                        <textarea name="" id="comment_form_textarea"></textarea>
                                        <!-- </div> -->
                                        <!-- 点击发送按钮 -->
                                        <div class="action_box">
                                            <div class="submit">
                                                <button>发布</button>
                                            </div>
                                        </div>
                                    </div>
                                    `
                    if (person_story[index].fatherComments[fac].childComments.length != 0) {
                        person_box_right_str += `
                                        <!-- 评论的评论 -->
                                    <div class="sub_comment_list">
                                        `
                        for (var chc = person_story[index].fatherComments[fac].childComments.length -
                                1; chc >= 0; chc--) {
                            person_box_right_str += `
                                            <!-- 单个评论 //循环遍历-->
                                        <div class="sub_comment">
                                            <div class="user_popover">
                                                <img src="${head + person_story[index].fatherComments[fac].childComments[chc].headUrl}" alt="">
                                            </div>
                                            <div class="content_box">
                                                <div class="content_wrapper">
                                                    <!-- 用户名： -->
                                                    <div class="user_box">
                                                        <div class="name">
                                                            ${person_story[index].fatherComments[fac].childComments[chc].userName}
                                                        </div>
                                                        <time class="time">${changeTime(getDateTimeStamp(person_story[index].fatherComments[fac].childComments[chc].publishTime))}</time>
                                                    </div>
                                                    <div class="content">
                                                        ${person_story[index].fatherComments[fac].childComments[chc].commentText}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            `
                        }
                        person_box_right_str += `</div>
                                        `
                    }
                    person_box_right_str += `                                                                                 
                                </div>
                            </div>
                        </div>
                    </div>
                `
                }

            }

            person_box_right_str += `
            </div>
                <!-- 发表评论 -->
                <div class="r_newsboe_form">
                    <div class="r_newsboe_area">
                        <textarea class='r_newsboe_textarea'></textarea>
                    </div>

                    <div class="r_newsboe_send_box">
                        <div class="submit">
                            <button class="r_newsboe_send">发布</button>
                        </div>
                    </div>

                </div>
                <!-- 分割线 -->
                <div class="r_newsbox_line"></div>
            </div>
            `;
            person_box_right.innerHTML = person_box_right_str;
        }

        var r_newsboe_input = document.getElementsByClassName('r_newsboe_input');
        for (var k = r_newsboe_input.length - 1, count = 0; k >= 0; k--, count++) {
            // console.log(story_id['person_story' + count]);
            r_newsboe_input[k].setAttribute('id', story_id['person_story' + count])
        }

    })
}
// 动态发布按钮
let sendbutton = document.getElementById('sendbutton');
let textarea_img = document.getElementById('textarea_img');
let person_right_img_show_src = document.getElementById('person_right_img_show_src');
var textarea_img_src;
var textarea_img_file;
// 获取图片
textarea_img.onchange = (e) => {
    console.log(123);
    if (typeof (textarea_img.files) != 'undefined') {
        textarea_img_file = e.target.files[0];
        photo_box_img.src = URL.createObjectURL(e.target.files[0]);
        textarea_img_src = URL.createObjectURL(e.target.files[0]);
        console.log(e.target.files[0]);
        person_right_img_show_box.style.display = 'block';
        person_right_img_show_src.src = textarea_img_src;
        // 右边盒子高度下降
        person_box_right.style.paddingTop = person_right_send.clientHeight + 'px';

    }
}
// 点击获取评论
function r_newsboe_sendfun(e) {
    console.log(e.target);
}
console.log(getCookie('userName'));
// 点击发送
sendbutton.onclick = () => {
    textarea_img.onchange = (e) => {
        console.log(textarea_img_file);
    }
    currentLength = person_right_textarea.value.length;
    var value = person_right_textarea.value;
    if(value==''||value.trim()==''){
        popup_something('内容为空')
        return;
    }
    if (currentLength < 15) {
        // alert('输入内容过少，请重新编写后发布');
        person_right_textarea.value = value;
    }
    var textarea_str = new FormData;
    console.log(person_right_textarea.value);
    textarea_str.append('storyContext', value)
    console.log(textarea_img.files[0]);
    textarea_str.append('imgs', textarea_img.files[0])
    textarea_str.append('userId', getCookie('userId'))
    textarea_str.append('status', 0)
    var add_str = ''
    const ajax = new XMLHttpRequest();
    ajax.open("post", "http://106.55.197.233:666/cityofstar/story/add", true);
    ajax.send(textarea_str);
    ajax.onreadystatechange = () => {
        if (ajax.readyState === 4) {
            if (ajax.status === 200) {
                const {
                    code,
                    data,
                    msg
                } = JSON.parse(ajax.responseText);
                if (code == 200) {
                    // 文本框内容消失
                    person_right_textarea.value = '';
                    // 发送框消失
                    person_right_send.classList.toggle('display_block')
                    // 内容向下移动
                    person_box_right.classList.toggle('padding_top')
                    // 成功后内容向上移动，删除行内样式
                    person_box_right.style.paddingTop = '';
                    person_right_img_show_box.style.display = 'none';
                    person_right_send.style.display = 'none';
                    add_str += `
        <div class="r_newsbox">
            <!-- 个人信息 -->
            <div class="r_newsbox_personalinfo">
                <div class="logo">
                    <img src="${head+getCookie('headPortrait')}" alt="">
                </div>
                <div class="name_box">
                    <div class="name">
                        ${getCookie('userName')}
                    </div>
                </div>
                <div class="time">
                    刚刚
                </div>
            </div>
            <!-- 动态内容 -->
            <div class="r_newsbox_contain">
                <div class="r_newsbox_text">${value}</div>`
                    console.log("输出图片的src");
                    console.log(textarea_img_src);
                    if (textarea_img_src != null) {
                        add_str += `
                <div class="r_newsbox_pic">
                    <div class="image">
                        <img src="${textarea_img_src}" alt="">
                    </div>
                </div>
                `
                    }
                    add_str += `
            </div>
            <!-- 点赞评论和权限 -->
            <div class="r_newsbox_set">
                <!-- <span class="r_comment_button" id="r_comment_button">展开评论</span> -->
                <div class="belike icon">
                    <div class="image">
                    <svg t="1667617492887" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2292" width="200" height="200"><path d="M200.60672 729.216s108.23168-61.79328 295.97184 0c75.10016 22.07232 159.03232 57.38496 326.89664-15.44704 6.62528 59.59168-2.20672 150.07744-2.20672 150.07744l-50.80064 75.04384-485.92896 2.20672L216.064 888.12544z" fill="#8a8a8a" p-id="2293"></path><path d="M702.17216 967.68H313.69728c-80.384 0-145.7664-60.928-145.7664-135.79776V355.95776a33.11616 33.11616 0 1 1 66.23744 0v475.92448c0 38.3488 35.67616 69.54496 79.53408 69.54496h388.48c43.8528 0 79.53408-31.19616 79.53408-69.54496V355.95776a33.11616 33.11616 0 1 1 66.23232 0v475.92448C847.93856 906.752 782.54592 967.68 702.17216 967.68z m-366.44864-309.17632a33.12128 33.12128 0 0 1-33.11616-33.1264V411.16672a33.11616 33.11616 0 1 1 66.23232 0v214.21056a33.12128 33.12128 0 0 1-33.11616 33.1264z m168.89856 0a33.12128 33.12128 0 0 1-33.11616-33.1264V411.16672a33.11616 33.11616 0 1 1 66.23744 0v214.21056a33.12128 33.12128 0 0 1-33.11616 33.1264z m168.90368 0a33.1264 33.1264 0 0 1-33.12128-33.1264V411.16672a33.12128 33.12128 0 1 1 66.23744 0v214.21056a33.12128 33.12128 0 0 1-33.11616 33.1264z m225.19808-379.83744H130.39616a33.1264 33.1264 0 0 1 0-66.2528h768.32768a33.1264 33.1264 0 0 1 0 66.2528z m-225.19808-86.09792a33.12128 33.12128 0 0 1-33.12128-33.1264 42.0352 42.0352 0 0 0-41.984-41.984h-187.5968a42.03008 42.03008 0 0 0-41.984 41.984 33.11616 33.11616 0 1 1-66.23232 0A108.35456 108.35456 0 0 1 410.82368 51.2h187.5968a108.35456 108.35456 0 0 1 108.22144 108.24704 33.12128 33.12128 0 0 1-33.11616 33.12128z" fill="#8a8a8a" p-id="2294"></path></svg>
                    
                    </div>
                </div>
                <div class="news icon">
                    <div class="image">
                    <svg t="1667541610970" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3019" width="200" height="200">
                    <path
                        d="M820.8896 807.9872H487.46496a39.64928 39.64928 0 0 0-22.58944 7.07072l-135.75168 94.13632a39.7056 39.7056 0 0 1-61.39392-24.19712l-10.10176-45.74208a39.7824 39.7824 0 0 0-38.80448-31.26784l0.19968-148.992a146.5344 146.5344 0 0 1 146.24256-146.62656h535.1168a39.82848 39.82848 0 0 1 39.74656 39.90528v136.00768a119.4752 119.4752 0 0 1-119.23968 119.7056z"
                        fill="#8a8a8a" p-id="3020"></path>
                    <path
                        d="M815.39072 112.64H198.3744A157.83936 157.83936 0 0 0 40.96 270.55104v379.78112a157.84448 157.84448 0 0 0 157.4144 157.91104h14.79168a1.62816 1.62816 0 0 1 1.57696 1.27488l10.10688 45.71648a77.77792 77.77792 0 0 0 120.32 47.3856l135.78752-94.08512a1.62816 1.62816 0 0 1 0.9216-0.29184h333.5168A157.83936 157.83936 0 0 0 972.8 650.33216V270.55104A157.83936 157.83936 0 0 0 815.39072 112.64zM896.512 650.33216a81.35168 81.35168 0 0 1-81.13152 81.408H481.87904a77.42464 77.42464 0 0 0-44.27264 13.824L301.81888 839.68a1.61792 1.61792 0 0 1-2.50368-0.98816l-10.10688-45.71648a77.47584 77.47584 0 0 0-76.04736-61.23008h-14.78656a81.3568 81.3568 0 0 1-81.13664-81.408V270.55104a81.3568 81.3568 0 0 1 81.13664-81.408h617.01632a81.35168 81.35168 0 0 1 81.13152 81.408v379.78112zM337.98656 424.68352a49.24416 49.24416 0 1 0 49.08544 49.24416 49.152 49.152 0 0 0-49.08544-49.24416z m184.0896 0a49.24416 49.24416 0 1 0 49.09056 49.24416 49.152 49.152 0 0 0-49.09056-49.24416z m177.07008 0a49.24416 49.24416 0 1 0 49.09056 49.24416 49.152 49.152 0 0 0-49.09056-49.24416z"
                        fill="#8a8a8a" p-id="3021"></path>
                </svg>
                    
                    </div>
                </div>
                <div class="set icon">
                    <div class="image">
                    <svg t="1667540980035" class="icon changeColor" viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2292" width="200"
                    height="200">
                    <path
                        d="M705.30048 510.208a281.12896 281.12896 0 0 0-267.83744 367.64672c121.04704-0.45056 234.8544-0.82944 275.12832-0.82944 99.28704 0 138.54208-131.45088 138.54208-131.45088s17.36192-45.77792 41.64096-163.88096a280.576 280.576 0 0 0-187.47392-71.48544z"
                        fill="#8a8a8a" p-id="2293"></path>
                    <path
                        d="M929.87904 366.208c-42.30144-45.22496-104.12544-43.43296-117.248-42.496l-167.21408 0.87552a4.23424 4.23424 0 0 1-3.82976-1.8432 4.55168 4.55168 0 0 1-0.87552-4.096c3.82464-15.36 8.66816-35.06688 14.76096-60.09344 15.90272-65.3568-2.14016-107.5712-20.07552-131.47648a127.6672 127.6672 0 0 0-97.3568-50.176C469.38112 73.88672 423.936 109.056 402.944 181.21216l-0.54784 2.11456C359.06048 374.48704 202.59328 376.7808 195.42528 376.7808h-69.12A75.20768 75.20768 0 0 0 51.2 451.93728v414.99136A75.07968 75.07968 0 0 0 126.2336 942.08h0.32768c85.70368-0.35328 517.632-2.14016 604.672-2.14016 119.936 0 167.31648-140.0576 172.288-155.89376 3.7376-10.29632 28.39552-81.77152 58.9312-253.16352 12.90752-72.38656 1.92512-127.7952-32.57344-164.67456z m-38.1184 152.064c-31.00672 174.03392-55.61856 240.95232-55.808 241.53088l-0.83968 2.47296c-0.31232 1.05984-33.49504 105.82016-103.87456 105.82016-87.1424 0-519.2192 1.78176-604.9536 2.14016a3.28704 3.28704 0 0 1-2.304-0.94208 3.2256 3.2256 0 0 1-0.9728-2.36032V451.93728a3.30752 3.30752 0 0 1 3.3024-3.3024h68.66432c76.07808 1.23392 231.63904-49.83808 277.15584-248.28928 13.37344-45.056 32.42496-52.93568 62.78656-51.6096a56.22272 56.22272 0 0 1 43.07456 21.5296c12.39552 16.512 15.06304 41.17504 7.72608 71.3216a13144.1152 13144.1152 0 0 1-14.6688 59.75552 76.61056 76.61056 0 0 0 74.32704 95.11424h0.40448l168.58112-0.88064 3.48672-0.18944c0.37376-0.03072 38.26688-3.30752 59.904 20.2496 22.36928 24.2944 19.96288 69.22752 14.00832 102.6304zM232.27904 505.94816a35.91168 35.91168 0 0 0-35.8912 35.92704v236.42624a35.8912 35.8912 0 1 0 71.78752 0v-236.42624a35.91168 35.91168 0 0 0-35.89632-35.92704z"
                        fill="#8a8a8a" p-id="2294"></path>
                </svg>
                    </div>
                </div>
            </div>
            <!-- 分割线 -->
            <div class="r_newsbox_line"></div>
        </div>
                    `;
                }
                person_box_right.innerHTML = add_str + person_box_right.innerHTML;
            }
        }
    }
}


// 要选择的状态渲染
let status_popup_contain = document.getElementById('status_popup_contain');
for (let i = 1; i < 10; i++) {
    status_popup_contain.innerHTML += `
                            <div class="image emotion">
                                <img src="./images/emotion-${i}.png" alt="">
                            </div>
    `;
}

let status_box = document.getElementById('status_box');
let status_popup = document.getElementById('status_popup');
// status_box.addEventListener('click', () => {
//     status_popup.style.display = 'block';
//     status_popup.style.opacity = '1';
// })

// window.addEventListener('click', () => {
//     status_popup.style.display = 'none';
//     status_popup.style.opacity = '0';
// })
searchfun(status_box, status_popup);

function searchfun(obj1, obj2) {
    obj1.addEventListener('click', function (event) {
        obj2.style.visibility = 'visible';
        obj2.style.opacity = '1';
        // visibility: visible;
        event.stopPropagation(); //阻止冒泡
    })

    window.addEventListener('click', function () {
        obj2.style.opacity = '0';
        obj2.style.visibility = 'hidden'; //隐藏
    });

    // obj2.addEventListener('click', function (event) {
    //     event.stopPropagation(); //阻止冒泡
    // })
}

let emotion = document.getElementsByClassName('emotion');
let stauts_image = document.getElementById('stauts_image');
for (let i = 0; i < emotion.length; i++) {
    emotion[i].addEventListener('click', () => {
        console.log(i);
        // http://106.55.197.233:666/cityofstar/user/updateStatues
        sealAjax({
            url: 'http://106.55.197.233:666/cityofstar/user/updateStatues',
            data: {
                userId: getCookie('userId'),
                statueCode: i + 1
            }
        }).then(res => {
            // 如果修改成功
            if (res.code == 200) {
                stauts_image.innerHTML = `<img src="./images/emotion-${Math.floor(i+1)}.png" alt="" >`;
                popup_something('修改状态成功');
            }
        })

    })
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