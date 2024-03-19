const socket = io('wss://echo.websocket.org');

// Function to render tasks
function renderTask(task) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.textContent = task.text;
    taskElement.draggable = true;

    // Add drag event listeners
    taskElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', task.text);
    });

    document.getElementById(task.status + '-list').appendChild(taskElement);
}

// Listen for tasks from the server
socket.on('tasks', (tasks) => {
    document.querySelectorAll('.task-list').forEach((list) => {
        list.innerHTML = '';
    });

    tasks.forEach((task) => {
        renderTask(task);
    });
});

// Listen for form submission
document.getElementById('add-todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const taskText = input.value.trim();

    if (taskText !== '') {
        // Send task to the server
        socket.emit('addTask', { text: taskText, status: 'todo' });
        input.value = '';
    }
});

// Allow dropping tasks
document.querySelectorAll('.task-list').forEach((list) => {
    list.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    list.addEventListener('drop', (e) => {
        e.preventDefault();
        const taskText = e.dataTransfer.getData('text/plain');
        const status = list.id.replace('-list', '');

        // Move task
        socket.emit('moveTask', { text: taskText, status: status });
    });
});
