// 1. 유저가 할일을 입력하고 +버튼을 클릭하면 할일 추가하기
// 2. 각 할일에 삭제 / 체크버튼 추가하기
// 3. 삭제버튼 클릭 => 할일이 리스트에서 삭제됨
// 4. 체크버튼 클릭 => 할일이 끝난 것으로 간주 후 밑줄 생성
// 4-1. 체크버튼 클릭하는 순간  (true/false)
// 4-2. true이면 끝난걸로 간주하고 밑줄 보여줌
// 4-3. false이면 안끝난걸로 간주하고 그대로
// 5. 끝난 할일은 되돌리기 버튼 클릭 => 다시 되돌아감
// 6. 탭을 이용하여 상태별로 나누어서 볼 수 있음

let taskInput = document.getElementById("task-input")
let addBtn = document.getElementById("add-btn")
let taskList = []

addBtn.addEventListener('click',addTask)
taskInput.addEventListener('focus',function(){taskInput.value=''})
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask(event);
      taskInput.value = ""; 
    }
});  


function addTask(){
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    console.log(taskList)
    render()
}

function render(){
    let resultHTML = '';
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].isComplete == true) {
            resultHTML += `
            <div class="task">
                <div class="task-done">${taskList[i].taskContent}</div>
                <div class="btn-box">
                    <button onclick="toggleComplete('${taskList[i].id}')">완료</button>
                    <button onclick="deleteTask('${taskList[i].id}')">삭제</button>
                </div>
            </div>
        `
        } else {
            resultHTML += `
            <div class="task">
                <div>${taskList[i].taskContent}</div>
                <div class="btn-box">
                    <button onclick="toggleComplete('${taskList[i].id}')">완료</button>
                    <button onclick="deleteTask('${taskList[i].id}')">삭제</button>
                </div>
            </div>
        `
        }
       
    }

    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id){
    console.log("id:", id);
    for(let i =0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            // taskList[i].isComplete = true; 
            // 완료버튼 토글로 실행하기
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList);
}

function deleteTask(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break
        }
    }
    render()
    console.log(taskList)
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
