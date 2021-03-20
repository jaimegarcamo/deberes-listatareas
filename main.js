const addButton = document.querySelector(".add-button");
const input = document.querySelector(".input-task");
const taskList = document.querySelector(".task-list");
const alertMessage = document.querySelector(".alert-message");





//FUNCTIONS
function addItem(){
    const item = document.createElement("li");
    item.innerText = input.value;
    
    if(input.value !== ''){
        taskList.append(item);
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
    }
};





//EVENTS
input.addEventListener("input", () => {
    alertMessage.innerText = '';
})

addButton.addEventListener("click", (event) => {
    addItem();
    event.preventDefault();
    saveInfoArray();
});

addButton.addEventListener("keypress", (event) => {
    if(event === "Enter"){
        addItem();
        event.preventDefault();
        saveInfoArray();   
    }
});

taskList.addEventListener("click", (event) => {
    removeItem(event);
    saveInfoArray();
});



