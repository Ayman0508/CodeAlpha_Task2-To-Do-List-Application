document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const emptyImage = document.querySelector('.empty-image');
    const form = document.querySelector('.input-area');

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    }

    const createTaskElement = (taskText) => {
        const li = document.createElement('li');
        li.classList.add('task-item');

        li.innerHTML = `
            <input type="checkbox" class="complete-checkbox">
            <span class="task-text">${taskText}</span>
            <input type="text" class="edit-input" style="display:none;">
            <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        `;

        const span = li.querySelector('.task-text');
        const editInput = li.querySelector('.edit-input');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');
        const checkbox = li.querySelector('.complete-checkbox');

        // Task Completed Toggle Functionality
        checkbox.addEventListener('change', () => {
            span.classList.toggle('completed', checkbox.checked);
        });

        // Delete Task  Functionlity
        deleteBtn.addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });

        // Edit Task Functionality
        editBtn.addEventListener('click', () => {
            if (editInput.style.display === 'none') {
                editInput.value = span.textContent;
                span.style.display = 'none';
                editInput.style.display = 'inline-block';
                editBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
            } else {
                const newText = editInput.value.trim();
                if (newText !== '') {
                    span.textContent = newText;
                }
                span.style.display = 'inline';
                editInput.style.display = 'none';
                editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            }
        });

        return li;
    }
    // Add Task Functionality
    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        taskInput.value = '';
        toggleEmptyState();
    }

    form.addEventListener('submit', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(e);
        }
    });

    toggleEmptyState();
});
