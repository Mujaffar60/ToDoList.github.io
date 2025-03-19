
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const taskText = li.querySelector('span').textContent;
        const checked = li.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, checked: checked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.checked);
    });
}

// Load tasks on page load
loadTasks();

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTaskElement(taskText);
        taskInput.value = '';
        saveTasks();
    }
}

function createTaskElement(taskText, checked = false) { // Added default value for checked
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        <button class="save hidden">Save</button>
        <button class="cancel hidden">Cancel</button>
    `;

    taskList.appendChild(li);

    const editButton = li.querySelector('.edit');
    const deleteButton = li.querySelector('.delete');
    const saveButton = li.querySelector('.save');
    const cancelButton = li.querySelector('.cancel');
    const taskSpan = li.querySelector('span');
    const checkbox = li.querySelector('input[type="checkbox"]');

    // Set the checkbox state based on the loaded data
    checkbox.checked = checked;

    // Apply the text decoration if the task is checked
    if (checked) {
        taskSpan.style.textDecoration = 'line-through';
    }

    editButton.addEventListener('click', () => {
        const currentText = taskSpan.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        li.replaceChild(input, taskSpan);
        input.focus();

        editButton.classList.add('hidden');
        deleteButton.classList.add('hidden');
        saveButton.classList.remove('hidden');
        cancelButton.classList.remove('hidden');

        saveButton.addEventListener('click', () => {
            taskSpan.textContent = input.value;
            li.replaceChild(taskSpan, input);
            saveButton.classList.add('hidden');
            cancelButton.classList.add('hidden');
            editButton.classList.remove('hidden');
            deleteButton.classList.remove('hidden');
            saveTasks();
        });
        cancelButton.addEventListener('click', () => {
            li.replaceChild(taskSpan, input);
            saveButton.classList.add('hidden');
            cancelButton.classList.add('hidden');
            editButton.classList.remove('hidden');
            deleteButton.classList.remove('hidden');
        });
    });

    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        saveTasks();
    });

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskSpan.style.textDecoration = 'line-through';
        } else {
            taskSpan.style.textDecoration = 'none';
        }
        saveTasks(); // Save tasks after checkbox change
    });
}

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});