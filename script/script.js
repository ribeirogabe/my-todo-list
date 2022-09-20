'use strict';

// TODO LIST

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteAndCheck)

function addTodo(event){
   
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoLi = document.createElement('li')
    todoLi.innerText = todoInput.value
    todoLi.classList.add('todo-item')
    todoDiv.appendChild(todoLi)

    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton)

    saveLocalTodos(todoInput.value)
    
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton)


    todoList.appendChild(todoDiv)

    todoInput.value = ''

}

function deleteAndCheck(e){

    console.log(e.target)

    const item = e.target
    const todo = item.parentElement

    if(item.classList[0] === 'delete-btn'){
        todo.classList.add('fall')
        removeLocalStorage(todo)
         todo.addEventListener('transitionend', ()=>{
            todo.remove()
         })
    } 

    if(item.classList[0] === 'complete-btn'){
        todo.classList.toggle('completed')
    }
    
}

function saveLocalTodos(todo){

    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){

    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(function(todo){
        

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const todoLi = document.createElement('li');
        todoLi.innerText = todo
        todoLi.classList.add('todo-item');
        todoDiv.appendChild(todoLi)
    
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton)

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton)
    
        todoList.appendChild(todoDiv)
    })


}

function removeLocalStorage(todo) {

    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    };

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}


// ANOTATIONS

var anotInput = document.querySelector(".anot-text")
var anotBtnSave = document.querySelector(".save-btn")

document.addEventListener('DOMContentLoaded', getAnot)
anotBtnSave.addEventListener('click', saveAnot);


function saveAnot () {
    localStorage.anotKey = anotInput.value
}

function getAnot(){
    if(localStorage.anotKey){
        anotInput.value = localStorage.anotKey
    }
    
};


// function saveAnots(){

//     let arrayAnots = [];

//     if(localStorage.getItem('anotKey' != null)){
//         arrayAnots = [];
//     } else {
//         arrayAnots;
//     }

//     var anotContent = document.getElementById("textArea").value;

//     var infos = {
//         anotContent
//     };

//     arrayAnots.push(infos);

//     var infoJson = JSON.stringify(arrayAnots);
//     localStorage.setItem("anotKey", infoJson);

//     buscarContent();
    
// };

// function buscarContent(){
//     const arr = JSON.parse(localStorage.getItem('anotKey'));

//     if (arr != null){
//         let tr = '';
//         arr.map(content =>{
//             tr += 
//                 `<textarea id="textArea" class="anot-text" cols="130" rows="15" 
//                 placeholder="Anotações aqui! :)">
//                 ${content.anotContent}
//                 </textarea> `
//         })

//         anotInput.innerHTML = tr;
//     }
// }

 
// TIMER

const btnStart = document.querySelector(".btn-start");
const btnPause = document.querySelector(".btn-pause");
const btnStop = document.querySelector(".btn-stop");

btnStart.addEventListener('click', startTimer)
btnPause.addEventListener('click', pauseTimer)
btnStop.addEventListener('click', stopTimer)

var hh = 0;
var mm = 0;
var ss = 0;
var time = 1000;
var cron;

function startTimer(){

    cron = setInterval(()=>{ timer(); }, time);
}

function pauseTimer(){
    clearInterval(cron)
}

function stopTimer(){
    clearInterval(cron)

    hh = 0;
    mm = 0;
    ss = 0;

    document.getElementById("timer").innerText = '00:00:00';
}

function timer(){


    ss++;

    if(ss == 60){
        ss = 0;
        mm++;
        
        if(mm == 60){
            mm = 0;
            mm++;
        }
    }

    var format = 

    (hh < 10 ? '0' + hh: hh) 
    + ':' 
    + (mm < 10 ? '0' + mm : mm) 
    + ':' 
    + (ss < 10 ? '0' + ss : ss);

    document.getElementById("timer").innerText = format;
}