
const taskListContainer = document.querySelector('.app__section-task-list');
const formTask = document.querySelector('.app__form-add-task');
const toggleFormTaskButton = document.querySelector('.app__button--add-task');
const formLabel = document.querySelector('.app__form-label');
const textArea = document.querySelector('.app__form-textarea');
const cancelFormButton = document.querySelector('.app__form-footer__button--cancel');
const deleteFormButton = document.querySelector('.app__form-footer__button--delete');
const localStorageTasks = localStorage.getItem('tasks');
const taskActiveDescription = document.querySelector('.app__section-active-task-description');

let tasks = localStorageTasks ? JSON.parse(localStorageTasks) : [];
let selectedTask = null;
let itemTaskSelected = null;
let taskInEdition = null;
let textInEdition = null;


const taskIconSvg = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>`;

const selectTask = (task, item) => {
  if (selectedTask) {
    selectedTask.classList.remove('app__section-task-list-item--selected');
  }

  selectedTask = item;
  selectedTask.classList.add('app__section-task-list-item--selected');
  taskActiveDescription.textContent = task.description;
  itemTaskSelected = task;
}

const selectTaskToEdit = (task, element) => {
  if(taskInEdition == task) {
    clearTaskForm();
    return;
  }

  formLabel.textContent = 'Editando tarefa';
  taskInEdition = task;
  paragraphInEdition = element;
  textArea.value = task.description;
  formTask.classList.remove('hidden');

}


function createTask(task) {
  const li = document.createElement('li');
  li.classList.add('app__section-task-list-item');

  const svgIcon = document.createElement('svg');
  svgIcon.innerHTML = taskIconSvg;

  const paragraph = document.createElement('p');
  paragraph.classList.add('app__section-task-list-item-description');
  paragraph.textContent = task.description;

  const button = document.createElement('button');
  button.classList.add('app_button-edit');
  const editImageIcon = document.createElement('img');
  editImageIcon.src = '/imagens/edit.png';
  button.appendChild(editImageIcon);

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    selectTaskToEdit(task, paragraph);
  });

  li.onclick = () => {
    selectTask(task, li);
  }

  svgIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    li.classList.add('app__section-task-list-item-complete');
  });

  if (task.done) {
    button.setAttribute('disabled', true);
    li.classList.add('app__section-task-list-item-complete');
  }

  li.appendChild(svgIcon);
  li.appendChild(paragraph);
  li.appendChild(button);

  return li;
}

function showTasksList(task) {
  tasks.push(task)
  const taskItem = createTask(task);
  taskListContainer.appendChild(taskItem);
}

function clearTaskForm() {
  taskInEdition = null;
  paragraphInEdition = null;
  textArea.value = null;
  formTask.classList.add('hidden')
}

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}


tasks.forEach(task => {
  console.log(task)
  const taskItem = createTask(task);
  taskListContainer.appendChild(taskItem);
})

toggleFormTaskButton.addEventListener('click', () => {
  formLabel.textContent = 'Adicionando tarefa';
  formTask.classList.toggle('hidden')
})

formTask.addEventListener('submit', (event) => {
  event.preventDefault();

  if (taskInEdition) {
    taskInEdition.description = textArea.value;
    paragraphInEdition.textContent = textArea.value;
    clearTaskForm();
    updateLocalStorage();
    return;
  }

  const task = {
    description: textArea.value,
    done: false
  }

  showTasksList(task)
  clearTaskForm();
  updateLocalStorage();
})

deleteFormButton.addEventListener('click', () => {
  textArea.value = null;
})

cancelFormButton.addEventListener('click', () => {
  clearTaskForm();
})

