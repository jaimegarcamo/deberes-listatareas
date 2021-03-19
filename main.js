const addButton = document.querySelector(".add-button");
const input = document.querySelector(".input-task");
const taskList = document.querySelector(".task-list");
const items = document.querySelectorAll("li");
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
};

function clearInput(){
    input.value = "";
};

function focusInput(){
    input.focus();
};


//EVENTS
input.addEventListener("input", () => {
    alertMessage.innerText = '';
})

addButton.addEventListener("click", (event) => {
    addItem();
    event.preventDefault()
});

addButton.addEventListener("keypress", (event) => {
    if(event === "Enter"){
        addItem();
        event.preventDefault()    
    }
});

taskList.addEventListener("click", removeItem);

