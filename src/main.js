//const addButton = document.querySelector(".add-button");
const form = document.querySelector(".form");
const input = document.querySelector(".input-task");
const taskList = document.querySelector(".task-list");
const alertMessage = document.querySelector(".alert-message");
const titleTask = document.querySelector(".title-task");
const incompleteTasks = document.querySelector(".incomplete-tasks");



//----------
//FUNCTIONS
//-----------

//La llamamos cuando queremos saber las tareas actuales que tenemos activas
function getActiveTasks(){
    let tasksMemory = localStorage.getItem('tasks');

    if(tasksMemory){
        return tasksMemory.split(',');
    }
    else{
        return [];
    }
};

//La llamamos cada vez que queremos añadir una tarea nueva
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

// La llamamos cada vez que queremos borrar una tarea de la lista
function removeItem (event) {
    event.target.parentElement.removeChild(event.target);
    focusInput();
};

//La llamamos cuando queremos limpiar el input
function clearInput(){
    input.value = "";
};

//La llamamos cuando queremos poner el foco en el input
function focusInput(){
    input.focus();
};

//La llamamos tras añadir o borrar una tarea, para actualizar el array que guardaremos en localstorage
function saveInfoArray(){
    let arrayItems = [];
    let items = document.querySelectorAll("li");

    items.forEach(item => {
        arrayItems.push(item.innerText)
    });

    saveInLocalStorage(arrayItems)
};

//La llamamos para guardar el nuevo array con las tareas actualizadas en LocalStorage
function saveInLocalStorage(arrayItems){
    localStorage.setItem('tasks', arrayItems);
    //Si borramos el ultimo elemento que quedaba, limpiamos el localStorage
    if(localStorage.getItem('tasks').length === 0){
        localStorage.clear();
        focusInput();
        titleTask.innerText = 'Your List Is Empty 😔';
    }
};

//La llamamos al principio para imprimir en pantalla las tareas de localstorage
function localStorageInit(tasks){

    if(tasks.length){
        tasks.forEach(element => {
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
};

//La llamamos para obtener el número de tareas pendientes que nos quedan
function pendingTasksNumber(){
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





//-------
//EVENTS
//-------

//Cada vez que llamemos a la variable tasks, se ejecutará la función getActiveTasks y obtendremos la lista actualizada de tareas actuales
let tasks = getActiveTasks();

//Al principio ejecutamos esto con la lista de tareas, para imprimir las tareas actuales que hay en localstorage
localStorageInit(tasks);

//Al principio ejecutamos esto para obtener el numero actual de tareas pendientes
pendingTasksNumber();

//Cuando escribimos algo en el input se borra el mensaje de error de tarea vacia
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


//Cuando le damos al submit (boton Add) ya sea por click o enter, hacemos el preventDefault
//para que el form no actualice la pagina y añadimos la nueva tarea, la guardamos en el array y actualizamos el contador
form.addEventListener("submit", (event) => {
    event.preventDefault();
    addItem();
    saveInfoArray();
    pendingTasksNumber();
});

//Cada vez que clicamos en la lista (ul) para borrar una tarea, mandamos el event (el elemento de dentro de la lista)
//a la funcion de borrar tarea, actualizamos el array de tareas y actualizamos el contador de tareas pendientes
taskList.addEventListener("click", (event) => {
    removeItem(event);
    saveInfoArray();
    pendingTasksNumber();
});



