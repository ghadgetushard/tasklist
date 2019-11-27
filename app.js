// define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event Listeners
loadEventListeners();

// load all event Listeners 
function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);

    //Add task event
    form.addEventListener('submit',addTask);

    //Remove single task
    taskList.addEventListener('click',removeTask);

    //clear all tasks
    clearBtn.addEventListener('click',clearTasks);

    // filter task event
    filter.addEventListener('keyup',filterTasks);
}

// Get tasks from LS
function getTasks() {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks=[];
    } else {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // create li element
        const li = document.createElement('li');

        // Add class
        li.className = 'collection-item';

        // create TextNode and append to the li
        li.appendChild(document.createTextNode(task));

        // create new link element
        const link = document.createElement('a');

        // Add Class
        link.className = 'delete-item secondary-content';

        // create icon to remove list item.
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // append the link to li
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('add a task');
    }

    // create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // create TextNode and append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');

    // Add Class
    link.className = 'delete-item secondary-content';

    // create icon to remove list item.
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // store in LS
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';

    e.preventDefault();
}

// store task in local storage
function storeTaskInLocalStorage(task) {

    let tasks;
    // local storage can only store strings
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}

// Remove Task 
function removeTask(e) {

    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you Sure?')) {
            e.target.parentElement.parentElement.remove();
            
            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
    
    let tasks;   
    if(localStorage.getItem('tasks') === null) {
        tasks=[];
    } else {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));

}

// Clear all tasks
function clearTasks() {
    
    // taskList.innerHTML='';
    
    // faster way
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTasksFromLocalStorage();

}

// Clear tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        
        // item returns all list items in colletion
        const item = task.firstChild.textContent;
        // console.log(item);

        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}



