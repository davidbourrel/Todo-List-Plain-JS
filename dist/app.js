"use strict";
// VARIABLES
const taskInput = document.querySelector('#new-task_input');
const addButton = document.querySelector('#submit_button');
const incompleteTasksHolder = document.querySelector('#incomplete-tasks');
const completedTasksHolder = document.querySelector('#completed-tasks');
// DISABLE INPUT WHENEVER IT'S EMPTY
addButton.disabled = true;
taskInput.onkeyup = () => {
    if (taskInput.value.trim().length > 0) {
        addButton.disabled = false;
    }
    else {
        addButton.disabled = true;
    }
};
const createNewTask = (taskString) => {
    // CREATE LIST ITEM
    const listItem = document.createElement('li');
    // SPAN WITH TEXT
    const span = document.createElement('span');
    span.innerText = taskString;
    // DONE BUTTON
    const doneButton = document.createElement('button');
    doneButton.classList.add('doneButton');
    doneButton.innerText = '✔️';
    // IMPORTANT BUTTON
    const importantTaskButton = document.createElement('button');
    importantTaskButton.classList.add('importantTaskButton');
    importantTaskButton.innerText = '❗❗';
    // CLOSE BUTTON
    const closeButton = document.createElement('button');
    closeButton.classList.add('closeButton');
    closeButton.innerText = '❌';
    // INSERT VALUE
    listItem.appendChild(span);
    listItem.appendChild(doneButton);
    listItem.appendChild(importantTaskButton);
    listItem.appendChild(closeButton);
    return listItem;
};
const addTask = (e) => {
    e.preventDefault();
    const listItem = createNewTask(taskInput.value.trim());
    incompleteTasksHolder.appendChild(listItem);
    taskInput.value = '';
    addButton.disabled = true;
};
const optionsTask = (e) => {
    var _a, _b, _c, _d;
    const button = e.target;
    // Done button
    if ((button === null || button === void 0 ? void 0 : button.classList[0]) === 'doneButton') {
        const listItem = button.parentElement;
        const importantButton = listItem === null || listItem === void 0 ? void 0 : listItem.children[2];
        if (listItem) {
            listItem.classList.remove('important-task');
            listItem.classList.add('complete-task');
            completedTasksHolder.append(listItem);
            button.remove();
        }
        importantButton === null || importantButton === void 0 ? void 0 : importantButton.remove();
    }
    // Important button
    if ((button === null || button === void 0 ? void 0 : button.classList[0]) === 'importantTaskButton') {
        const ulId = (_b = (_a = button === null || button === void 0 ? void 0 : button.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.getAttribute('id');
        ulId && ulId === 'incomplete-tasks'
            ? (_c = button.parentElement) === null || _c === void 0 ? void 0 : _c.classList.toggle('important-task')
            : button.remove();
    }
    // Close button
    if ((button === null || button === void 0 ? void 0 : button.classList[0]) === 'closeButton') {
        (_d = button.parentElement) === null || _d === void 0 ? void 0 : _d.remove();
    }
};
// EVENTS
addButton.addEventListener('click', addTask);
incompleteTasksHolder.addEventListener('click', optionsTask);
completedTasksHolder.addEventListener('click', optionsTask);
