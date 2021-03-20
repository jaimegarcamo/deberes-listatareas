//const addButton = document.querySelector(".add-button");
const form = document.querySelector(".form");
const input = document.querySelector(".input-task");
const taskList = document.querySelector(".task-list");
const alertMessage = document.querySelector(".alert-message");
const titleTask = document.querySelector(".title-task");
const incompleteTasks = document.querySelector(".incomplete-tasks");




//FUNCTIONS
function addItem(){
    const item = document.createElement("li");
    item.innerText = input.value;
    
    if(input.value !== ''){
        taskList.append(item);
        titleTask.innerText = 'Task List';
        clearInput();
    }
    else{
        alertMessage.innerText = "You can't add an empty task!";
    }

    focusInput();
};


function removeItem (event) {
    event.target.parentElement.removeChild(event.target);
    focusInput();
};


function clearInput(){
    input.value = "";
};


function focusInput(){
    input.focus();
};


function saveInfoArray(){
    let arrayItems = [];
    let items = document.querySelectorAll("li");

    items.forEach(item => {
        arrayItems.push(item.innerText)
    });

    saveInLocalStorage(arrayItems)
};


function saveInLocalStorage(arrayItems){
    localStorage.setItem('tasks', arrayItems);
    //Si borramos el ultimo elemento que quedaba, limpiamos el localStorage
    if(localStorage.getItem('tasks').length === 0){
        localStorage.clear();
        focusInput();
        titleTask.innerText = 'Your List Is Empty 😔';
    }
};


function localStorageInit(){
    let tasksMemory = localStorage.getItem('tasks');
    let tasksMemoryArray = [];

    if(tasksMemory){
        tasksMemoryArray = tasksMemory.split(',');

        tasksMemoryArray.forEach(element => {
            const item = document.createElement("li");
            item.innerText = element;
            taskList.append(item);
            focusInput();
            titleTask.innerText = 'Task List';
        });
    }
    else{
        titleTask.innerText = 'Your List Is Empty 😔';
    };
    incompleteTasksNumber();
};


function incompleteTasksNumber(){
    let tasksMemory = localStorage.getItem('tasks');
    let tasksMemoryArray = [];

    if (tasksMemory){
        tasksMemoryArray = tasksMemory.split(',');
        incompleteTasks.innerText = tasksMemoryArray.length;
    }
    else{
        incompleteTasks.innerText = 0;
    }

};




//EVENTS
localStorageInit();

input.addEventListener("input", () => {
    alertMessage.innerText = '';
});

// addButton.addEventListener("click", (event) => {
//     addItem();
//     event.preventDefault();
//     saveInfoArray();
// });

// addButton.addEventListener("keypress", (event) => {
//     if(event === "Enter"){
//         addItem();
//         event.preventDefault();
//         saveInfoArray();   
//     }
// });

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addItem();
    saveInfoArray();
    incompleteTasksNumber();
});


taskList.addEventListener("click", (event) => {
    removeItem(event);
    saveInfoArray();
    incompleteTasksNumber();
});



