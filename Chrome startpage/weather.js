const weather = document.querySelector(".js-weather");

const API_KEY = "07bfdf610a9b1e6ef192d5d4337c2b50";
const COORDS = 'coords';


function getWeather(lat,lon) {
    //fetch를 이용해서 데이터를 얻는다.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;  //온도 데이터 : 크롬 관리자 -> network -> weather 클릭 -> main -> temp
        const place = json.name; //위치 이름 데이터 : 크롬 관리자 -> network -> weather 클릭 -> name
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){ //위도, 경도 읽어온다.
    const latitude = position.coords.latitude; 
    const longitude = position.coords.longitude;
    const coordsObj = {
        //latitude: latitude,
        //longitude: longitude
        //위 처럼 객체에 변수의 이름과 객체의 key의 이름을 같게 저장 할 때는
        latitude,
        longitude
        //이렇게 작성할 수 있다.  JS Tip!!
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log(`Can't access geo location`);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();