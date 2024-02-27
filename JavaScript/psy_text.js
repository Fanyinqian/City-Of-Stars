let offsetX;
let offsetY;
let card = document.getElementById('card');
let love1 = document.getElementById('love1');
let love2 = document.getElementById('love2');

card.addEventListener('mousedown', (e) => {
    const {
        clientX,
        clientY
    } = e;
    // 鼠标点击了图片的哪个位置相对于浏览器的位置
    let startPoint = {
        x: clientX,
        y: clientY
    }
    console.log(startPoint.x);
    console.log(startPoint.y);
    // e.preventDefault();
    card.addEventListener('mousemove', (e) => {
        // 点击之后滑动阻止其他事件发生
        e.preventDefault();
        // 鼠标滑动到了图片的哪个位置相对于浏览器的位置
        const {
            clientX,
            clientY
        } = e;
        // console.log(clientX);
        // console.log(clientY);
        card_offsetX = clientX - startPoint.x;
        card_offsetY = clientY - startPoint.y;
        const rotate = card_offsetX * 0.1;
        card.style.transform =
            `translate(${card_offsetX}px, ${card_offsetY}px) rotate(${rotate}deg)`;
        if (Math.abs(card_offsetX) > card.clientWidth * 0.7) {
            this.dismiss(card_offsetX > 0 ? 1 : -1);
        }
        // const touch = e.changedTouches[0];
        // const {
        //     clientX,
        //     clientY
        // } = touch;
        // console.log(clientX);

        // console.log(123);
    })
    dismiss = function () {
        love1.style.display = 'none';
        love2.style.display = 'block';
        psy_text_exit.style.backgroundColor = '#d3d3fb';
        card.style.display = 'none';
        window.location.href ='card.html';
    }
    card.addEventListener('mouseup', (e) => {
        card.style.transform = '';
        card.removeEventListener('touchmove', (e) => {
            e.preventDefault();
            card.style.transform = '';
        });
        card.addEventListener('mousemove', (e) => {
            e.preventDefault();
            card.style.transform = '';
        });
    });
    card.style.transition = 'transform 0s';
})

let text_bg = document.getElementById('text_bg');
let psy_text_exit = document.getElementById('psy_text_exit');
text_bg.addEventListener('click', () => {
    card.style.animation = 'cardLeft 1s ease forwards';
    love1.style.display = 'none';
    love2.style.display = 'block';
    psy_text_exit.style.backgroundColor = '#d3d3fb';
    setTimeout(() => {
        window.location.href = 'card.html';
    }, 1000)
})

love1.addEventListener('click', () => {
    card.style.animation = 'cardLeft 1s ease forwards';
    love1.style.display = 'none';
    love2.style.display = 'block';
    psy_text_exit.style.backgroundColor = '#d3d3fb';
    setTimeout(() => {
        window.location.href = 'card.html';
    }, 1000)
})