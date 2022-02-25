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
    // DIV WITH BUTTONS
    const divButtons = document.createElement('div');
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
    divButtons.appendChild(doneButton);
    divButtons.appendChild(importantTaskButton);
    divButtons.appendChild(closeButton);
    listItem.appendChild(span);
    listItem.appendChild(divButtons);
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const button = e.target;
    // Done button
    if ((button === null || button === void 0 ? void 0 : button.classList[0]) === 'doneButton') {
        const listItem = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        const importantButton = (_b = button.parentElement) === null || _b === void 0 ? void 0 : _b.children[1];
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
        const ulId = (_e = (_d = (_c = button === null || button === void 0 ? void 0 : button.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.getAttribute('id');
        ulId && ulId === 'incomplete-tasks'
            ? (_g = (_f = button.parentElement) === null || _f === void 0 ? void 0 : _f.parentElement) === null || _g === void 0 ? void 0 : _g.classList.toggle('important-task')
            : button.remove();
    }
    // Close button
    if ((button === null || button === void 0 ? void 0 : button.classList[0]) === 'closeButton') {
        (_j = (_h = button.parentElement) === null || _h === void 0 ? void 0 : _h.parentElement) === null || _j === void 0 ? void 0 : _j.remove();
    }
};
// EVENTS
addButton.addEventListener('click', addTask);
incompleteTasksHolder.addEventListener('click', optionsTask);
completedTasksHolder.addEventListener('click', optionsTask);
