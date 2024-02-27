// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// 获取ABCD四个选项
let itemA = document.querySelector('.A');
let itemB = document.querySelector('.B');
let itemC = document.querySelector('.C');
let itemD = document.querySelector('.D');

// constants
const urls = [
  './images/card-1.png',
  './images/card-2.png',
  './images/card-3.png',
  './images/card-4.png',
  './images/card-5.png',
];

// 卡片类
class Card {
  constructor({
    imageUrl,
    onDismiss,
    left,
    right
  }) {
    this.imageUrl = imageUrl;
    this.onDismiss = onDismiss;
    this.left = left;
    this.right = right;
    this.#init();
  }

  // 初始化函数
  #init = () => {
    const card = document.createElement('div');
    card.classList.add('card');
    this.element = card;
    card.innerHTML = `<img src="${this.imageUrl}" alt="">
                          <p>欢迎来到趣味测试🙂</p>
                          <div class="answer">
                          <ul>
                              <li>A.选择题库</li>
                              <li>B.得分分析</li>
                          </ul>
                          <ul>
                              <li>C.数据可视化</li>
                              <li>D.心理咨询</li>
                          </ul>
                        `

    // 选择A和B时，卡片向左走
    itemA.onclick = () => {
      this.#left();
    }
    // itemA.addEventListener('click',()=>{
    //   console.log(this);
    //   this.#left();
    // })

    // itemA.addEventListener('click',function(){
    //   console.log(this);
    //   this.#left();
    // })

    itemB.onclick = () => {
      this.#left();
    }

    // 选择C和D时，卡片向右走
    itemC.onclick = () => {
      this.#right();
    }

    itemD.onclick = () => {
      this.#right();
    }

  }

  // 卡片向左走 
  #left = () => {
    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    //第一张卡片离开，动画停留在离开时的位置    
    cards[0].style.animation = 'cardLeft 1s ease forwards';
    //左侧图标变色    
    dislike.style.animationPlayState = 'running';
    dislike.classList.toggle('trigger');
    setTimeout(() => {
      this.#dismiss();
    }, 1000);
  }

  // 卡片向右走
  #right = () => {
    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    //第一张卡片离开时，动画停留在离开时的位置    
    cards[0].style.animation = 'cardRight 1s ease forwards';
    //右侧图标变色    
    like.style.animationPlayState = 'running';
    like.classList.toggle('trigger');
    setTimeout(() => {
      this.#dismiss();
    }, 1000);
  }

  #dismiss = () => {
    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards[0].classList.add('dismissing');
    setTimeout(() => {
      cards[0].remove();
    }, 1000);
    // 牌的数量自减
    cardCount--;
    appendNewCard();
  }
}

// variables
let cardCount = 0;

// 添加新卡函数
function appendNewCard() {
  const card = new Card({
    imageUrl: urls[cardCount % 5],
    onDismiss: appendNewCard,
  });
  swiper.append(card.element);
  cardCount++;

  const cards = swiper.querySelectorAll('.card:not(.dismissing)');
  cards.forEach((card, index) => {
    card.style.setProperty('--i', index);
  });
  for (let i = 0; i < cards.length; i++) {
    if (i < 5) {
      cards[i].style.display = 'block';
    } else {
      cards[i].style.display = 'none';
    }

  }
}

// 初始化卡片
for (let i = 0; i < 5; i++) {
  appendNewCard();
}


/* 
  打开与关闭题库
*/
let questionBank = document.querySelector('.question-bank');
let questionDelete = document.querySelectorAll('.delete-icon')[0];
let questionWrapper = document.querySelector('.question-wrapper');
let index = 0;
// 记录总分
let sum = 0;
// 获取折线图容器
let chartWrapper = document.querySelector('.chart-wrapper');


// 打开题库
questionBank.onclick = () => {
  questionWrapper.style.opacity = '1';
  questionWrapper.style.transform = 'scale(1)';
  questionWrapper.style.pointerEvents = "all";

  console.log(cardCount)
  // 初始化牌的数量
  while (cardCount > 5) {
    swiper.removeChild(swiper.lastElementChild);
    cardCount--;
  }

  // 初始化展示焦虑试题
  sealAjax({
    url: 'http://106.55.197.233:666/cityofstar/testPaper/getOneTypePaperTestList',
    data: { testType: '焦虑' },
    type: 'post'
  }).then(res => {
    console.log(res);
    // 清空内容
    questionBody.innerHTML = ``;
    for (j in res.data) {
      questionBody.innerHTML += `<li>
                                  <svg t="1667745666698" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2450" width="200" height="200"><path d="M440.32 952.32H204.8c-73.216 0-133.12-59.904-133.12-133.12V204.8c0-73.216 59.904-133.12 133.12-133.12h517.12c73.216 0 133.12 59.904 133.12 133.12v215.04c0 16.896-13.824 30.72-30.72 30.72s-30.72-13.824-30.72-30.72V204.8c0-39.424-32.256-71.68-71.68-71.68H204.8c-39.424 0-71.68 32.256-71.68 71.68v614.4c0 39.424 32.256 71.68 71.68 71.68h235.52c16.896 0 30.72 13.824 30.72 30.72s-13.824 30.72-30.72 30.72z" fill="#A32A1F" p-id="2451"></path><path d="M650.24 307.2H271.36c-16.896 0-30.72-13.824-30.72-30.72s13.824-30.72 30.72-30.72h378.88c16.896 0 30.72 13.824 30.72 30.72s-13.824 30.72-30.72 30.72zM424.96 460.8H271.36c-16.896 0-30.72-13.824-30.72-30.72s13.824-30.72 30.72-30.72h153.6c16.896 0 30.72 13.824 30.72 30.72s-13.824 30.72-30.72 30.72zM424.96 614.4H271.36c-16.896 0-30.72-13.824-30.72-30.72s13.824-30.72 30.72-30.72h153.6c16.896 0 30.72 13.824 30.72 30.72s-13.824 30.72-30.72 30.72z" fill="#A32A1F" p-id="2452"></path><path d="M921.6 947.2c-7.168 0-14.336-2.56-19.968-7.168L752.64 813.568l-148.992 126.464c-9.216 7.68-22.016 9.728-32.768 4.608-10.752-5.12-17.92-15.872-17.92-27.648v-303.616c0-47.104 38.4-85.504 85.504-85.504h228.864c47.104 0 85.504 38.4 85.504 85.504V916.48c0 11.776-7.168 23.04-17.92 27.648-4.608 2.048-8.704 3.072-13.312 3.072z m-168.96-204.8c7.168 0 14.336 2.56 19.968 7.168L890.88 849.92v-237.568c0-13.312-10.752-24.064-24.064-24.064h-228.864c-13.312 0-24.064 10.752-24.064 24.064V849.92l118.272-100.352c6.144-4.608 13.312-7.168 20.48-7.168z" fill="#E09527" p-id="2453"></path></svg>
                                  <p>${res.data[j].testPaperName}</p>
                                </li>
                                `


    }

    let testLi = document.querySelectorAll('.question-body li');
    let analysePop = document.querySelector('.analyse-pop');
    let restNum = document.querySelector('.rest-num');
    let allNum = document.querySelector('.all-num');
    for (let i = 0; i < testLi.length; i++) {
      // 存题目对应Id
      testLi[i].testPaperId = res.data[i].testPaperId;
      // 打开任意一套试题
      testLi[i].addEventListener('click', function () {
        sealAjax({
          url: 'http://106.55.197.233:666/cityofstar/paperQuestion/getAllQuestion',
          data: { paperId: `${testLi[i].testPaperId}` },
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res);
          // 根据题目量加卡片
          for (let i = 0; i < res.data.length - 5; i++) {
            appendNewCard();
          }
          let cardQuestion = document.querySelectorAll('.card p');
          let card = document.querySelectorAll('.card');
          let answer = document.querySelectorAll('.answer');
          // console.log(answer[0].A)
          for (j in res.data) {
            // 试题题目
            cardQuestion[j].innerText = `${res.data[j].questionContent}`;
            // 给A、B、C、D四个选项赋值
            answer[j].getElementsByTagName('li')[0].innerHTML = `A.${res.data[j].AContent}`
            answer[j].getElementsByTagName('li')[1].innerHTML = `B.${res.data[j].BContent}`
            answer[j].getElementsByTagName('li')[2].innerHTML = `C.${res.data[j].CContent}`
            answer[j].getElementsByTagName('li')[3].innerHTML = `D.${res.data[j].DContent}`

            // 保存A、B、C、D四个选择的分值
            answer[j].A = res.data[j].AScore;
            answer[j].B = res.data[j].BScore;
            answer[j].C = res.data[j].CScore;
            answer[j].D = res.data[j].DScore;

            if (j >= 5) {
              card[j].style.display = 'none';
            }
          }
          // console.log(answer[0].A)

          // itemA.onclick = () =>{
          //   console.log(answer[index].A,index);
          //   console.log(1);
          //   sum += answer[index].A;
          //   index++;
          // }
          console.log('card:',cardCount)
          // 比分栏总题数
          allNum.innerHTML = cardCount;
          // 比分栏剩余题数
          restNum.innerHTML = cardCount;
         
          // 定义统计总分函数
          function Sum(item) {
            console.log('s',item);
            sum += item;
            index++;
            restNum.innerHTML = cardCount - index;
            console.log('sum:', sum);
            // 做完题目时
            if (index === cardCount) {
              // 比分栏
              allNum.innerHTML = '-';
              restNum.innerHTML = '-';
              sealAjax({
                type: 'post',
                url: 'http://106.55.197.233:666/cityofstar/resultAnalysis/getResultAnalysis',
                data: { paperId: `${testLi[i].testPaperId}`, score: `${sum}` },
              }).then(res => {
                console.log(res);
                analysePop.innerHTML = ` <img src="./images/sum.png" alt="得分">
                                        <p>${res.data.analysis}</p>
                                        <div class="sum-score">${res.data.endScore}</div>
                                        <a href="javascript:;" class="delete-analyse"></a>
                                        <a href="javascript:;" class="visualization-analyse"></a>
                                        `
                // 添加分数
                sealAjax({
                  url: 'http://106.55.197.233:666/cityofstar/score/addScore',
                  data: { paperId: `${testLi[i].testPaperId}`,userId:`${getCookie('userId')}`,score:`${res.data.endScore}`},
                }).then(res => {
                  console.log(res)
                });
                // 得分弹窗出现
                let timerAppear = setTimeout(function () {
                  analysePop.style.opacity = '1';
                  analysePop.style.transform = 'scale(1.2)';
                  analysePop.style.pointerEvents = "all";
                }, 300);

                // 获取得分分析中的取消按钮
                let deleteAnalyse = document.querySelector('.delete-analyse');
                // 获取得分分析中的跳转按钮
                let visualizationAnalyse = document.querySelector('.visualization-analyse');
                // 单击取消按钮，得分弹窗消失
                deleteAnalyse.onclick = () => {
                  analysePop.style.transform = 'scale(0.7)';
                  analysePop.style.pointerEvents = 'none';
                  let timer = setTimeout(function () {
                    analysePop.style.opacity = '0';
                  }, 87);
                }

                // 单击直达按钮，直达折线图
                visualizationAnalyse.onclick = () =>{
                  chartWrapper.style.display = 'block';
                }
              });
            }
          }

          itemA.addEventListener('click',function(){
            Sum(answer[index].A);
          })
          itemB.addEventListener('click',function(){
            Sum(answer[index].B);
          })
          itemC.addEventListener('click',function(){
            Sum(answer[index].C);
          })
          itemD.addEventListener('click',function(){
            Sum(answer[index].D);
          })
          // function SumA(){
          //   Sum(answer[index].A)
          // }
          // function SumB(){
          //   Sum(answer[index].B)
          // }
          // function SumC(){
          //   Sum(answer[index].C)
          // }
          // function SumD(){
          //   Sum(answer[index].D)
          // }
          // 单击选项，计算得分
          // itemA.addEventListener('click',Sum(answer[index].A),false);

          // itemB.addEventListener('click',SumB,false);

          // itemC.addEventListener('click',SumC,false);

          // itemD.addEventListener('click',SumD,false);
          // if(index = cardCount -1){

          // }
        });

        // 选择完成试题后，弹窗消失
        questionWrapper.style.transform = 'scale(0.7)';
        questionWrapper.style.pointerEvents = 'none';
        let timer = setTimeout(function () {
          questionWrapper.style.opacity = '0';
        }, 87);

      });
    }


  });
}


// 关闭题库
questionDelete.onclick = () => {
  questionWrapper.style.transform = 'scale(0.7)';
  questionWrapper.style.pointerEvents = 'none';
  let timer = setTimeout(function () {
    questionWrapper.style.opacity = '0';
  }, 87);
}

/* 
  题库类型切换
*/
let questionLi = document.querySelectorAll('.question-header>li');
// 获取下划线
let underscore = document.querySelectorAll('.question-header span');
let questionBody = document.querySelector('.question-body');
for (let i = 0; i < questionLi.length; i++) {
  questionLi[i].onclick = () => {
    for (let j = 0; j < underscore.length; j++) {
      underscore[j].style.height = '0';
      questionLi[j].style.color = '#535353';
    }

    underscore[i].style.height = '5px';
    questionLi[i].style.color = '#705df2';

    // 定义题目类型
    let testType = null;
    switch (i) {
      case 0:
        testType = '焦虑';
        break;
      case 1:
        testType = '压力';
        break;
      case 2:
        testType = '抑郁';
        break;
      case 3:
        testType = '人格特质';
        break;
      case 4:
        testType = '自我效能';
        break;
      case 5:
        testType = '心理素质';
        break;
    }

    // 渲染某个类型的所有测试卷
    sealAjax({
      url: 'http://106.55.197.233:666/cityofstar/testPaper/getOneTypePaperTestList',
      data: { testType: `${testType}` },
      type: 'post'
    }).then(res => {
      console.log(res);
      // 清空内容
      questionBody.innerHTML = ``;
      for (j in res.data) {
        questionBody.innerHTML += `<li>
                                    <svg t="1667745666698" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2450" width="200" height="200"><path d="M440.32 952.32H204.8c-73.216 0-133.12-59.904-133.12-133.12V204.8c0-73.216 59.904-133.12 133.12-133.12h517.12c73.216 0 133.12 59.904 133.12 133.12v215.04c0 16.896-13.824 30.72-30.72 30.72s-30.72-13.824-30.72-30.72V204.8c0-39.424-32.256-71.68-71.68-71.68H204.8c-39.424 0-71.68 32.256-71.68 71.68v614.4c0 39.424 32.256 71.68 71.68 71.68h235.52c16.896 0 30.72 13.824 30.72 30.72s-13.824 30.72-30.72 30.72z" fill="#A32A1F" p-id="2451"></path><path d="M650.24 307.2H271.36c-16.896 0-30.72-13.824-30.72-30.72s13.824-30.72 30.72-30.72h378.88c16.896 0 30.72 13.824 30.72 30.72s-13.824 30.72-30.72 30.72zM424.96 460.8H271.36c-16.896 0-30.72-13.824-30.72-30.72s13.824-30.72 30.72-30.72h153.6c16.896 0 30.72 13.824 30.72 30.72s-13.824 30.72-30.72 30.72zM424.96 614.4H271.36c-16.896 0-30.72-13.824-30.72-30.72s13.824-30.72 30.72-30.72h153.6c16.896 0 30.72 13.824 30.72 30.72s-13.824 30.72-30.72 30.72z" fill="#A32A1F" p-id="2452"></path><path d="M921.6 947.2c-7.168 0-14.336-2.56-19.968-7.168L752.64 813.568l-148.992 126.464c-9.216 7.68-22.016 9.728-32.768 4.608-10.752-5.12-17.92-15.872-17.92-27.648v-303.616c0-47.104 38.4-85.504 85.504-85.504h228.864c47.104 0 85.504 38.4 85.504 85.504V916.48c0 11.776-7.168 23.04-17.92 27.648-4.608 2.048-8.704 3.072-13.312 3.072z m-168.96-204.8c7.168 0 14.336 2.56 19.968 7.168L890.88 849.92v-237.568c0-13.312-10.752-24.064-24.064-24.064h-228.864c-13.312 0-24.064 10.752-24.064 24.064V849.92l118.272-100.352c6.144-4.608 13.312-7.168 20.48-7.168z" fill="#E09527" p-id="2453"></path></svg>
                                    <p>${res.data[j].testPaperName}</p>
                                  </li>
                                  `
      }

      let testLi = document.querySelectorAll('.question-body li');
      for (let i = 0; i < testLi.length; i++) {
        // 存题目对应Id
        testLi[i].testPaperId = res.data[i].testPaperId;
        // 打开任意一套试题
        testLi[i].addEventListener('click', function () {
          sealAjax({
            url: 'http://106.55.197.233:666/cityofstar/paperQuestion/getAllQuestion',
            data: { paperId: `${testLi[i].testPaperId}` },
            headers: {
              'Content-Type': 'multipart/form-data'
            }

          }).then(res => {
            console.log(res)
            for (let i = 0; i < res.data.length - 5; i++) {
              appendNewCard();
            }
            let cardQuestion = document.querySelectorAll('.card p');
            let card = document.querySelectorAll('.card');
            let answer = document.querySelectorAll('.answer');
            for (j in res.data) {
              // 试题题目
              cardQuestion[j].innerText = `${res.data[j].questionContent}`;
              // 给A、B、C、D四个选项赋值
              answer[j].getElementsByTagName('li')[0].innerHTML = `A.${res.data[j].AContent}`
              answer[j].getElementsByTagName('li')[1].innerHTML = `B.${res.data[j].BContent}`
              answer[j].getElementsByTagName('li')[2].innerHTML = `C.${res.data[j].CContent}`
              answer[j].getElementsByTagName('li')[3].innerHTML = `D.${res.data[j].DContent}`

              // 保存A、B、C、D四个选择的分值
              answer[j].A = res.data[j].AScore;
              answer[j].B = res.data[j].BScore;
              answer[j].C = res.data[j].CScore;
              answer[j].D = res.data[j].DScore;
              if (j >= 5) {
                card[j].style.display = 'none';
              }
            }
          });
          // 选择完成试题后，弹窗消失
          questionWrapper.style.transform = 'scale(0.7)';
          questionWrapper.style.pointerEvents = 'none';
          let timer = setTimeout(function () {
            questionWrapper.style.opacity = '0';
          }, 87);
        });
      }
    });
  }
}

/* 
  打开与关闭折线图
*/
// 获取折线图按钮
let visualization = document.querySelector('.visualization');
// 获取右上角关闭按钮
let deleteIcon = document.querySelectorAll('.delete-icon')[1];
visualization.onclick = () =>{
  chartWrapper.style.display = 'block';
}

deleteIcon.onclick = () =>{
  chartWrapper.style.display = 'none';
}

/* 
  折线图左侧切换栏
*/
let chartLi = document.querySelectorAll('.chart-menu li');
let chartUnderscore = document.querySelectorAll('.chart-menu span');
for(let i = 0; i < chartLi.length; i++){
  chartLi[i].onclick = () =>{
    for(let j = 0; j < chartUnderscore.length; j++){
      chartUnderscore[j].style.height = '0';
      chartLi[j].style.color = '#F2F5FF';
    }
    chartUnderscore[i].style.height = '5px';
    chartLi[i].style.color = '#705df2';
  }
}

/* 
  绘制折线图
*/

// 每一天的间隔距离
let padding = 15;
// 每一天的x坐标
let start_x = padding;
// svg图标viewBox宽度
let svg_width = document.querySelector('.chart').viewBox.baseVal.width;

function loadData() {
  sealAjax({
    type:'post',
    url: 'http://106.55.197.233:666/cityofstar/score/getScoreList',
    data: { userId:`${getCookie('userId')}`, testType:'焦虑'},
  }).then(res => {
    console.log(res);
    console.log(`api data`, res)
    drawChart(res);
  });

}

loadData();

// 定义绘制图表的函数
function drawChart(api_data) {
  // 添加图标标题
  // 建立text标签，用在svg里面
  let name = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  // 文字中间对齐
  name.setAttribute('text-anchor', 'middle');
  name.setAttribute('alignment-baseline', 'middle')
  name.setAttribute('x', svg_width / 2)
  name.setAttribute('y', 3)
  name.classList.add('name')
  name.innerHTML = `${api_data.data[0].lineChartName}`;
  document.querySelector('.chart').appendChild(name);

  let stock_data = [];
  for(let i = api_data.data.length - 1;i>= 0;i--){
    stock_data.push(api_data.data[i]);
  }
  console.log(stock_data)
  // 存储坐标资料
  let path_data = [];

  for (let i in stock_data) {
      path_data.push(`${start_x},${stock_data[i].y-20}`);

      // 设定x轴方向的标题
      let caption = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      // 文字中心点为中间
      caption.setAttribute('text-anchor', 'middle');
      caption.setAttribute('alignment-baseline', 'middle')
      caption.setAttribute('x', start_x)
      caption.setAttribute('y', 96)
      caption.classList.add('caption')
      caption.appendChild(document.createTextNode(stock_data[i].x));
      document.querySelector('.chart').appendChild(caption)


      // 为折线中的每一个交接点添加一个圆形
      let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
      // 定义圆心的位置
      circle.setAttribute('cx',start_x);
      circle.setAttribute('cy',stock_data[i].y-20);
      // 设置半径
      circle.setAttribute('r',3);
      // 边框色
      circle.setAttribute('stroke','#9F3AF0');
      // 边框粗细
      circle.setAttribute('stroke-width',2);
      // 填充色
      circle.setAttribute('fill','#fff');
      // 更改变形中心点
      circle.setAttribute('transform-origin',`${start_x} ${stock_data[i].y}`)
      circle.style.setProperty('--delay',`${3 * parseInt(i) / stock_data.length}s`)
      circle.classList.add('point');
      document.querySelector('#path-container').appendChild(circle);

      // 每个圆形下方加上股票资料
      let value = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      value.setAttribute('text-anchor', 'middle')
      value.setAttribute('alignment-baseline', 'middle')
      value.setAttribute('x', start_x)
      value.setAttribute('y',stock_data[i].y);
       /* g标签会将里面的内容上下倒转，所以<text> 本身需要再反转一下*/
      value.setAttribute('transform',`translate(0,${stock_data[i].y*2-12} ) scale(1,-1)`)
      value.style.setProperty('--delay',`${3 * parseInt(i) / stock_data.length}s`)
      value.classList.add('values');
      value.appendChild(document.createTextNode(stock_data[i].y));
      document.querySelector('#path-container').appendChild(value);


      // 根据有多少天数据，再根据图标的宽度计算start_x的值
      start_x += (svg_width - padding * 2) / (stock_data.length - 1);
      // 循环结束后，path_data就会拥有10组数据
  }
  console.log(path_data)
  let line = document.querySelector('#line');
  console.log(line)
  // 将数组中所有元素通过空格分隔，并转换为字符串
  line.setAttribute('d', `M${path_data.join(' ')}`)

  // 获取线条长度 Math.ceil()进位保留整数
  let strokeLength = Math.ceil(line.getTotalLength());
  document.querySelector('.chart').style.setProperty('--stroke-length',strokeLength);

  // 执行动画
  document.querySelector('.chart').classList.add('animate')
}