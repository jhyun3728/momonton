const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];


function deleteToDo(event){
    //버튼을 제거하기 위해서는 어떤 버튼이 클릭되었는지를 알아야한다.
    //버튼의 부모가 누구인지 알아야함 (버튼의 부모가 li)
    //console.dir(event.target);  //dir로 target의 아빠가 뭔지 파악 -> parentNode
    //console.log(event.target.parentNode);  //정상적으로 타겟을 잡았는지 확인
    
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){ //forEach에서 function을 실행하는것처럼 각각의 item과 같이 실행
        return toDo.id !== parseInt(li.id); //li.id는 string이여서 형변환해준다.
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){   //toDos를 가져와서 local에 저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  //localStorage는 모든걸 string으로 저장.
                                            //object를 string이 되도록 만들어줘야함 -> JSON.stringify
                                            //JSON.stringify --> 자바스크립트 object를 string으로 바꿘
}                                           

function paintToDo(text){
    const li = document.createElement("li");  //HTML에서 필요한 것(li)을 생성
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    li.appendChild(span);      //span을 li의 자식 리스트 중 마지막 자식으로 붙임
    li.appendChild(delBtn);    //delBtn을 li의 자식 리스트 중 마지막 자식으로 붙임
    li.id = newId;      //li에도 id를 줘야 어던 li가 삭제됐는지 확인가능

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";   //submit하고 나서 toDoInput에 남아있는 텍스트를 ""로 초기화해준다.
}

function loadToDos(){
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    if(loadedtoDos !== null){
        const parsedToDos = JSON.parse(loadedtoDos); //localStorage에 string으로 저장된 TODOS_LS를 다시 object로 변환
        parsedToDos.forEach(function(toDo) {  //parsedToDos의 각각에 대해서 paintToDo라는 function이 실행
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();


//자바스크립트는 localStorage에 있는 모든 데이터를 string으로 저장
//JSON (JavaScript Object Notation)
//데이터를 전달할 때, javascript가 그걸 다룰 수 있도록
//object로 바꿔주거나 object에서 string으로 바꿔준다.

//forEach()