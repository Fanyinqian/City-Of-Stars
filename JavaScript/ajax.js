function sealAjax(options) {
  //创建一个存储默认值的对象
  let defaults = {
    type: 'get',
    url: '',
    data: {},
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    resolve: function () { },
    reject: function () { }
  };

  //使用options对象中的属性覆盖defaults对象中的属性
  Object.assign(defaults, options);
  //创建ajax对象
  let xhr = new XMLHttpRequest();
  //拼接请求参数的变量
  var params = '';
  //循环用户传递进来的对象格式参数
  for (var attr in defaults.data) {
    //将参数转换为字符串格式
    params += attr + '=' + defaults.data[attr] + '&';
  }

  //将参数最后面的&截取掉
  //将截取的结果重新赋值给params变量
  params = params.substr(0, params.length - 1);

  //判断请求参数
  if (defaults.type == 'get') {
    defaults.url = defaults.url + '?' + params;
  }

  //配置ajax对象
  xhr.open(defaults.type, defaults.url);
  //如果请求方式为post
  if (defaults.type == 'post') {
    //向服务器端传递的请求参数的类型
    var contentType = defaults.headers['Content-Type'];
    //设置请求参数格式的类型
    xhr.setRequestHeader('Content-Type', contentType);

    //判断用户希望的请求参数格式的类型
    //如果类型为json
    if (contentType == 'application/json') {
      //向服务器端传递json数据格式的参数
      xhr.send(JSON.stringify(defaults.data));
    } else {
      //向服务器端传递普通类型的请求参数
      xhr.send(params);
    }

  } else {
    //发送请求
    xhr.send();
  }

  // 最后返回一个promise对象
  return new Promise((resolve, reject) => {
    // 监听事件
    xhr.onreadystatechange = () => {
      // 判断xhr的状态码
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // 成功时 接收返回的内容
          resolve(JSON.parse(xhr.responseText))
        } else {
          // 失败时 接收返回的内容
          reject(xhr.responseText)
        }
      }
    }
  })
}

