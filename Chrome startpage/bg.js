const body = document.querySelector("body");

const IMG_NUMBER = 4;


function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;   //random이 0을 줄 수 있어서 +1을 한다.
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();


//Math 모듈을 이용하여 random을 사용
//5까지의 랜덤 숫자 출력 --> Math.random() * 5;

//Math.floor() : 버림
//Math.ceil() : 올림