const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");
    //querySelectorAll()은 모든 엘리먼트를 가져와 array로 준다 --> 귀찮을 수 있다.

const USER_LS = "currentUser",
    SHOWING_CN = "showing";


function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();     //event의 기본동작을 막는다.(input에 입력하고 엔터 눌러도 안눌림)
    const currentValue = input.value;
    paintGreeting(currentValue);  //currentValue를 표시해도 저장된게 아니라서 새로고침하면 사라짐 --> saveName() 생성하자
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();


//local storage에 작은 정보들을 컴퓨터에 저장