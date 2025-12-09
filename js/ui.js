// UI Management Module

let currentFilter = 'all';
let currentEditingTaskId = null;
let currentEditingGoalId = null;

// Window Management
function makeWindowDraggable(windowEl) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = windowEl.querySelector('.window-header');

    if (!header) return;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (e.target.closest('.window-controls')) return;

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        windowEl.classList.add('dragging');
        bringWindowToFront(windowEl);
    }

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        let newTop = windowEl.offsetTop - pos2;
        let newLeft = windowEl.offsetLeft - pos1;

        // Constrain to desktop area
        const desktopArea = document.querySelector('.desktop-area');
        newTop = Math.max(20, Math.min(newTop, desktopArea.offsetHeight - windowEl.offsetHeight));
        newLeft = Math.max(0, Math.min(newLeft, desktopArea.offsetWidth - windowEl.offsetWidth));

        windowEl.style.top = newTop + 'px';
        windowEl.style.left = newLeft + 'px';
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        windowEl.classList.remove('dragging');
    }
}

function bringWindowToFront(windowEl) {
    const windows = document.querySelectorAll('.mac-window');
    let maxZ = 1;

    windows.forEach(w => {
        const z = parseInt(window.getComputedStyle(w).zIndex);
        if (z > maxZ) maxZ = z;
    });

    windowEl.style.zIndex = maxZ + 1;
    windowEl.classList.add('active');
}

function toggleWindow(windowId) {
    const windowEl = document.getElementById(windowId);
    if (windowEl) {
        const isHidden = windowEl.style.display === 'none' || windowEl.classList.contains('hidden');
        if (isHidden) {
            windowEl.style.display = 'flex';
            windowEl.classList.remove('hidden');
            bringWindowToFront(windowEl);
        } else {
            windowEl.style.display = 'none';
            windowEl.classList.add('hidden');
        }
    }
}

function restoreWindow(windowId) {
    const windowEl = document.getElementById(windowId);
    if (windowEl) {
        windowEl.style.display = 'flex';
        windowEl.classList.remove('hidden');
        bringWindowToFront(windowEl);
        closeWindowsMenu();
    }
}

// Modal Management
function openTaskModal(taskId = null) {
    const modal = document.getElementById('taskModal');
    const form = document.getElementById('taskForm');

    form.reset();
    currentEditingTaskId = taskId;

    if (taskId) {
        const task = dashboard.tasks.find(t => t.id === taskId);
        if (task) {
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDesc').value = task.description;
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskCategory').value = task.category;
            document.getElementById('taskDueDate').value = task.dueDate;
            document.getElementById('taskTags').value = task.tags.join(', ');
        }
    }

    modal.classList.add('active');
    document.getElementById('taskTitle').focus();
}

function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
    currentEditingTaskId = null;
}

function openGoalModal(goalId = null) {
    const modal = document.getElementById('goalModal');
    const form = document.getElementById('goalForm');

    form.reset();
    currentEditingGoalId = goalId;

    if (goalId) {
        const goal = dashboard.goals.find(g => g.id === goalId);
        if (goal) {
            document.getElementById('goalTitle').value = goal.title;
            document.getElementById('goalDesc').value = goal.description;
            document.getElementById('goalProgress').value = goal.progress;
            document.getElementById('goalMilestones').value = goal.milestones.join('\n');
        }
    }

    modal.classList.add('active');
    document.getElementById('goalTitle').focus();
}

function closeGoalModal() {
    document.getElementById('goalModal').classList.remove('active');
    currentEditingGoalId = null;
}

function closeAbout() {
    document.getElementById('aboutWindow').style.display = 'none';
}

function openWindowsMenu() {
    const menu = document.getElementById('windowsMenu');
    if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
}

function closeWindowsMenu() {
    const menu = document.getElementById('windowsMenu');
    if (menu) {
        menu.style.display = 'none';
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Window dragging
    document.querySelectorAll('.mac-window').forEach(windowEl => {
        makeWindowDraggable(windowEl);
        windowEl.addEventListener('click', () => bringWindowToFront(windowEl));
    });

    // Filter tabs
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderTasks();
        });
    });

    // About button
    document.getElementById('aboutBtn').addEventListener('click', () => {
        const aboutWindow = document.getElementById('aboutWindow');
        aboutWindow.style.display = 'flex';
        aboutWindow.classList.add('active');
    });

    // Windows button
    if (document.getElementById('windowsBtn')) {
        document.getElementById('windowsBtn').addEventListener('click', () => {
            openWindowsMenu();
        });
    }

    // Close menu when clicking elsewhere
    document.addEventListener('click', function(e) {
        const windowsMenu = document.getElementById('windowsMenu');
        const windowsBtn = document.getElementById('windowsBtn');
        if (windowsMenu && windowsBtn && e.target !== windowsBtn && !windowsBtn.contains(e.target) && !windowsMenu.contains(e.target)) {
            closeWindowsMenu();
        }
    });

    // Modal close on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                this.style.display = 'none';
                currentEditingTaskId = null;
                currentEditingGoalId = null;
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function handleKeyboardShortcuts(e) {
    if (e.metaKey || e.ctrlKey) {
        // Cmd/Ctrl + N: New task
        if (e.key === 'n') {
            e.preventDefault();
            openTaskModal();
        }
        // Cmd/Ctrl + S: Save (handled by form)
        if (e.key === 's') {
            e.preventDefault();
            const taskForm = document.getElementById('taskForm');
            const goalForm = document.getElementById('goalForm');
            if (document.getElementById('taskModal').classList.contains('active')) {
                taskForm.dispatchEvent(new Event('submit'));
            } else if (document.getElementById('goalModal').classList.contains('active')) {
                goalForm.dispatchEvent(new Event('submit'));
            }
        }
    }
    // Escape: Close modals
    if (e.key === 'Escape') {
        closeTaskModal();
        closeGoalModal();
    }
}

// Initialize
function initializeUI() {
    setupEventListeners();
    renderTasks();
    renderGoals();
    updateStatistics();
    drawChart();
}

// Update statistics display
function updateStatistics() {
    const stats = dashboard.getStatistics();
    document.getElementById('completedCount').textContent = stats.completedTasks;
    document.getElementById('activeCount').textContent = stats.activeTasks;
    document.getElementById('activeGoals').textContent = stats.activeGoals;
}

// Utility: Parse tags
function parseTags(tagString) {
    return tagString
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
}

// Utility: Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
}

// Utility: Format relative date
function formatRelativeDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)}d ago`;
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays <= 7) return `${diffDays}d away`;
    return formatDate(dateString);
}

// Background Management Functions
let pendingBackgroundSelection = null;

function openBackgroundWindow() {
    pendingBackgroundSelection = backgroundManager.currentBackground;
    const modal = document.getElementById('backgroundWindow');
    modal.style.display = 'flex';
    modal.classList.add('active');
    renderBackgroundOptions();
    updateBackgroundPreview();
}

function closeBackgroundWindow() {
    pendingBackgroundSelection = null;
    document.getElementById('backgroundWindow').classList.remove('active');
    document.getElementById('backgroundWindow').style.display = 'none';
}

function cancelBackgroundWindow() {
    closeBackgroundWindow();
}

function applyBackgroundWindow() {
    if (backgroundManager.customImageUrl && backgroundManager.currentBackground === 'custom') {
        console.log('Applying custom image');
        backgroundManager.saveBackground();
        backgroundManager.applyBackground();
        closeBackgroundWindow();
    } else if (pendingBackgroundSelection) {
        console.log('Applying selected background:', pendingBackgroundSelection);
        backgroundManager.setBackground(pendingBackgroundSelection);
        closeBackgroundWindow();
    }
}

function updateBackgroundPreview() {
    const preview = document.getElementById('bgPreviewPanel');
    if (!preview) return;
    
    // Check if custom image is set
    if (backgroundManager.customImageUrl) {
        preview.style.backgroundColor = '';
        preview.style.backgroundImage = `url('${backgroundManager.customImageUrl}')`;
        console.log('Showing custom image preview');
        return;
    }
    
    const bgId = pendingBackgroundSelection || backgroundManager.currentBackground;
    
    if (bgId.includes('solid')) {
        const colors = {
            'white-solid': '#ffffff',
            'light-gray': '#e0e0e0',
            'dark-gray': '#a0a0a0'
        };
        preview.style.backgroundImage = 'none';
        preview.style.backgroundColor = colors[bgId] || '#f5f5f5';
    } else {
        preview.style.backgroundColor = '';
        const patternUrl = backgroundManager.getBackgroundPattern(bgId);
        preview.style.backgroundImage = `url('${patternUrl}')`;
    }
}

function renderBackgroundOptions() {
    const bgGrid = document.getElementById('bgGrid');
    if (!bgGrid) return;

    bgGrid.innerHTML = '';

    const backgrounds = backgroundManager.getAvailableBackgrounds();

    backgrounds.forEach(bg => {
        const option = document.createElement('div');
        option.className = 'bg-option';
        
        // Highlight the pending selection (or current if no pending)
        if (pendingBackgroundSelection === bg.id || (!pendingBackgroundSelection && backgroundManager.currentBackground === bg.id)) {
            option.classList.add('active');
        }

        const preview = document.createElement('div');
        preview.className = 'bg-preview';
        
        // Directly apply the background pattern for preview
        if (bg.id.includes('solid')) {
            const colors = {
                'white-solid': '#ffffff',
                'light-gray': '#e0e0e0',
                'dark-gray': '#a0a0a0'
            };
            preview.style.backgroundColor = colors[bg.id] || '#f5f5f5';
        } else {
            const patternUrl = backgroundManager.getBackgroundPattern(bg.id);
            preview.style.backgroundImage = `url('${patternUrl}')`;
            preview.style.backgroundSize = 'cover';
            preview.style.backgroundRepeat = 'no-repeat';
        }

        const name = document.createElement('div');
        name.className = 'bg-name';
        name.textContent = bg.name;

        option.appendChild(preview);
        option.appendChild(name);

        // Click handler selects for pending application
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Background option selected:', bg.id);
            pendingBackgroundSelection = bg.id;
            updateBackgroundPreview();
            renderBackgroundOptions();
        });

        bgGrid.appendChild(option);
    });
}

function uploadBackground() {
    const fileInput = document.getElementById('bgImageInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image file');
        return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Maximum size is 5MB.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        console.log('Image uploaded, setting custom image');
        const imageData = e.target.result;
        
        // Set as pending selection
        pendingBackgroundSelection = null;
        backgroundManager.customImageUrl = imageData;
        backgroundManager.currentBackground = 'custom';
        
        // Update preview
        updateBackgroundPreview();
        fileInput.value = '';
        
        console.log('Custom image ready for apply');
        alert('Image loaded! Click Apply to set as background.');
    };

    reader.onerror = function() {
        alert('Error reading file');
    };

    reader.readAsDataURL(file);
}

// Control Panels - Panel Switching
function switchPanel(panelName) {
    // Hide all panels
    const panels = document.querySelectorAll('.panel-content');
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Deactivate all tabs
    const tabs = document.querySelectorAll('.panel-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected panel
    const selectedPanel = document.getElementById(panelName);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }
    
    // Activate selected tab
    event.target.classList.add('active');
}
