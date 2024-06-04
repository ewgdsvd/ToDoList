document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('newTask');
    const task = taskInput.value.trim();

    if (task !== '') {
        const tasks = getTasks();
        tasks.push({ task, completed: false });
        saveTasks(tasks);
        taskInput.value = '';
        renderTasks();
    }
}

function editTask(index) {
    const tasks = getTasks();
    const taskItem = document.getElementById(`task-${index}`);
    const editInput = taskItem.querySelector('input[type="text"]');
    const taskText = editInput.value.trim();

    if (taskText !== '') {
        tasks[index].task = taskText;
        saveTasks(tasks);
        renderTasks();
    }
}

function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

function renderTasks() {
    const tasksList = document.getElementById('tasks');
    const tasks = getTasks();
    tasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.id = `task-${index}`;
        taskItem.className = task.completed ? 'completed' : '';

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.completed;
        taskCheckbox.onchange = () => toggleTask(index);

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = task.task;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Сохранить';
        saveButton.className = 'edit-btn';
        saveButton.onclick = () => editTask(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = () => deleteTask(index);

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(editInput);
        taskItem.appendChild(saveButton);
        taskItem.appendChild(deleteButton);

        tasksList.appendChild(taskItem);
    });
}
