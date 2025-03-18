
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTaskElement(taskText);
            taskInput.value = '';
        }
    }

    function createTaskElement(taskText) {
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
            });
            cancelButton.addEventListener('click', ()=>{
                li.replaceChild(taskSpan, input);
                saveButton.classList.add('hidden');
                cancelButton.classList.add('hidden');
                editButton.classList.remove('hidden');
                deleteButton.classList.remove('hidden');
            })
        });

        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskSpan.style.textDecoration = 'line-through';
            } else {
                taskSpan.style.textDecoration = 'none';
            }
        });
    }

taskInput.addEventListener("keypress", (e)=>{
  if(e.key === "Enter"){
    addTask();
  }
});