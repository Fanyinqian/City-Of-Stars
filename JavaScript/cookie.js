// 存cookie
function setCookie(key,value,day){
    // 对名值对的值进行编码
    value = encodeURIComponent(value);
    // 未设置保质期时
    if(day == undefined){
        document.cookie = `${key}=${value}`;
    // 设置保质期时 
    }else{
        let date = new Date();

        date.setDate(date.getDate() + day);
        //设置cookie
        document.cookie = `${key}=${value};expires=`+date;

    }

}


 // 获取cookie
 function getCookie(key){
    let strCookie = document.cookie;

    let arrCookie = strCookie.split("; ");
    console.log(arrCookie);
    for(let i=0; i<arrCookie.length; i++){
        // 去除key前面的空格
        arrCookie[i] = arrCookie[i];
        let item = arrCookie[i].split("=");
        if(key == item[0]){
            // 对名值对进行解码
            return decodeURIComponent(item[1]);
        }

    }

    return '';
}

// 删除cookie
function delCookie(key){
    setCookie(key,'',-1)
}
