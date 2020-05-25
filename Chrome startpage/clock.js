const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes()
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockTitle.innerHTML = `${
        hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes}:${
                seconds < 10 ? `0${seconds}` : seconds
            }`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}
init();



//setInterval(fn, 1000)
//첫번째 인자로 실행할 함수를 받고 두번째 인자로 함수를 반복실행할 시간 간격