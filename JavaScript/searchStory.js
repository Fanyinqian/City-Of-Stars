// 搜索代码
let search_flag = false;
let search_story_input = document.getElementById('search_story_input');
let search_story_button = document.getElementById('search_story_button');
let onpopclicklistener = null;
search_story_input.addEventListener('focus', () => {
    console.log("点击搜索");
    if (onpopclicklistener != null) {
        search_story_button.removeEventListener('click', onpopclicklistener);
    }
    onpopclicklistener = function onpopclicklistener() {
        search_flag = true;
        let value = search_story_input.value;
        if (value != '') {
            console.log(value);
            show_search_story();

            function show_search_story() {
                sealAjax({
                    url: 'http://106.55.197.233:666/cityofstar/story/search',
                    type: "post",
                    data: {
                        keyword: value,
                        userId: getCookie('userId')
                    }
                }).then(res => {
                    // 渲染动态
                    let search_story = res.data;
                    // 绑定渲染动态事件
                    showPerson_show(search_story);
                    // 绑定回复事件
                    eventblock();
                    // 发送动态
                    shareSomething();
                    // 点击头像进入个人空间
                    gotootherSpace();
                    // 发送评论函数
                    send_comm_fun()
                    search_story_input.value = '';
                    popup_something('查询成功');
                })
            }
        }
    }
    search_story_button.addEventListener('click', onpopclicklistener)
})


// search_story_input.addEventListener('keydown', (eve) => {
//     var e = eve || window.eve;
//     if (e.keyCode == 13) {
//         chatWithUser && sendmessage(chatWithUser.chatItem.receiveUserId);
//     }
// })