// VARIABLES
const taskInput = document.querySelector('#new-task_input') as HTMLInputElement;
const addButton = document.querySelector('#submit_button') as HTMLButtonElement;
const incompleteTasksHolder = document.querySelector(
  '#incomplete-tasks'
) as HTMLUListElement;
const completedTasksHolder = document.querySelector(
  '#completed-tasks'
) as HTMLUListElement;

// DISABLE INPUT WHENEVER IT'S EMPTY
addButton.disabled = true;
taskInput.onkeyup = () => {
  if (taskInput.value.trim().length > 0) {
    addButton.disabled = false;
  } else {
    addButton.disabled = true;
  }
};

const createNewTask = (taskString: string) => {
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

const addTask = (e: Event) => {
  e.preventDefault();

  const listItem = createNewTask(taskInput.value.trim());
  incompleteTasksHolder.appendChild(listItem);
  taskInput.value = '';
  addButton.disabled = true;
};

const optionsTask = (e: Event) => {
  const button = e.target as HTMLButtonElement;

  // Done button
  if (button?.classList[0] === 'doneButton') {
    const listItem = button.parentElement?.parentElement;
    const importantButton = button.parentElement?.children[1];

    if (listItem) {
      listItem.classList.remove('important-task');
      listItem.classList.add('complete-task');
      completedTasksHolder.append(listItem);
      button.remove();
    }
    importantButton?.remove();
  }

  // Important button
  if (button?.classList[0] === 'importantTaskButton') {
    const listId =
      button?.parentElement?.parentElement?.parentElement?.getAttribute('id');

    listId && listId === 'incomplete-tasks'
      ? button.parentElement?.parentElement?.classList.toggle('important-task')
      : button.remove();
  }

  // Close button
  if (button?.classList[0] === 'closeButton') {
    button.parentElement?.parentElement?.remove();
  }
};

// EVENTS
addButton.addEventListener('click', addTask);
incompleteTasksHolder.addEventListener('click', optionsTask);
completedTasksHolder.addEventListener('click', optionsTask);
