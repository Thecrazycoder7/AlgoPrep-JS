// Select everything that is required
const input = document.querySelector('#input');
const add = document.querySelector('#add');
const list = document.querySelector('.list');

// Add an event listener to the add button

const inputHandler = function () {
    const newTask = input.value;
    if(newTask === "") return;
    
    //add task to the list
    const taskElement = createElement(newTask);
    
    list.appendChild(taskElement);

    //clear input
    input.value = "";

    //add delete button logic
    const deleteButton = taskElement.children[1];
    deleteButton.addEventListener("click", function () {
        list.removeChild(taskElement);
    })
}

function createElement(newTask) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const button = document.createElement("button");
    button.innerText = "Delete";
    p.innerText = newTask;

    div.appendChild(p);
    div.appendChild(button);
    return div;
}

add.addEventListener("click", inputHandler);