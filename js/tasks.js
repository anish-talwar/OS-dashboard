// Task Management Module

function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();

    if (!title) {
        alert('Please enter a task title');
        return;
    }

    dashboard.addTask({ title });
    input.value = '';
    renderTasks();
    updateStatistics();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = dashboard.getTasksByFilter(currentFilter);

    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<div style="padding: 20px; text-align: center; color: #999; font-size: 11px;">No tasks</div>';
        return;
    }

    tasks.forEach(task => {
        const taskEl = createTaskElement(task);
        taskList.appendChild(taskEl);
    });
}

function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = `task-item ${task.completed ? 'completed' : ''}`;
    div.dataset.taskId = task.id;

    const checkbox = document.createElement('div');
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        completeTask(task.id);
    });

    const content = document.createElement('div');
    content.className = 'task-content';

    const title = document.createElement('div');
    title.className = 'task-title';
    title.textContent = task.title;

    const meta = document.createElement('div');
    meta.className = 'task-meta';

    let metaInfo = [];
    if (task.priority !== 'medium') {
        metaInfo.push(`${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`);
    }
    if (task.category) {
        metaInfo.push(task.category);
    }
    if (task.dueDate) {
        metaInfo.push(formatRelativeDate(task.dueDate));
    }

    meta.textContent = metaInfo.join(' • ');

    content.appendChild(title);
    if (metaInfo.length > 0) content.appendChild(meta);

    // Tags
    if (task.tags && task.tags.length > 0) {
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'task-tags';
        task.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag';
            tagEl.textContent = tag;
            tagsDiv.appendChild(tagEl);
        });
        content.appendChild(tagsDiv);
    }

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'task-action-btn';
    editBtn.textContent = '✎';
    editBtn.title = 'Edit';
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openTaskModal(task.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-action-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete this task?')) {
            deleteTask(task.id);
        }
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    div.appendChild(checkbox);
    div.appendChild(content);
    div.appendChild(actions);

    // Click to edit
    content.addEventListener('click', () => {
        openTaskModal(task.id);
    });

    return div;
}

function saveTask(event) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value.trim();
    if (!title) {
        alert('Title is required');
        return;
    }

    const taskData = {
        title,
        description: document.getElementById('taskDesc').value,
        priority: document.getElementById('taskPriority').value,
        category: document.getElementById('taskCategory').value,
        dueDate: document.getElementById('taskDueDate').value,
        tags: parseTags(document.getElementById('taskTags').value)
    };

    if (currentEditingTaskId) {
        dashboard.updateTask(currentEditingTaskId, taskData);
    } else {
        dashboard.addTask(taskData);
    }

    closeTaskModal();
    renderTasks();
    updateStatistics();
}

function completeTask(taskId) {
    dashboard.completeTask(taskId);
    renderTasks();
    updateStatistics();
    drawChart();

    // Play a subtle sound effect (optional)
    playClickSound();
}

function deleteTask(taskId) {
    dashboard.deleteTask(taskId);
    renderTasks();
    updateStatistics();
    drawChart();
}

function playClickSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Silently fail if audio context is not available
    }
}
