let draggedTask;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    draggedTask = event.target;
}

function drop(event) {
    event.preventDefault();
    if (event.target.className === 'task-list') {
        event.target.appendChild(draggedTask);
    }
}

document.getElementById('add-todo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let input = document.getElementById('todo-input');
    let taskText = input.value.trim();
    if (taskText !== '') {
        let task = document.createElement('div');
        task.className = 'task';
        task.draggable = true;
        task.textContent = taskText;
        task.addEventListener('dragstart', drag);
        document.getElementById('todo-list').appendChild(task);
        input.value = '';
    }
});
