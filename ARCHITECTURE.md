# Architecture & Extension Guide - Anish Dashboard

## 🏗️ Architecture Overview

### Application Structure

```
┌─────────────────────────────────────┐
│     User Interface (HTML)           │
│   ├─ Task Tracker Window            │
│   ├─ Goals Window                   │
│   ├─ Statistics Window              │
│   ├─ Summary Window                 │
│   └─ Modals & Dialogs               │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│     UI Management Layer (ui.js)     │
│   ├─ Window Dragging                │
│   ├─ Modal Management               │
│   ├─ Event Listeners                │
│   ├─ Keyboard Shortcuts             │
│   └─ Rendering Functions            │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│    Business Logic Layer             │
│   ├─ Tasks (tasks.js)               │
│   ├─ Goals (goals.js)               │
│   ├─ Summary (summary.js)           │
│   └─ Charts (chart.js)              │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│     Data Layer (data.js)            │
│   └─ Dashboard Class                │
│       ├─ Tasks CRUD                 │
│       ├─ Goals CRUD                 │
│       ├─ Statistics                 │
│       └─ LocalStorage Persistence   │
└─────────────────────────────────────┘
```

---

## 📊 Data Model

### Task Object
```javascript
{
    id: 1702108800000,           // Unix timestamp
    title: "Task Title",          // Required
    description: "Details...",    // Optional
    priority: "medium",           // low, medium, high
    category: "Project",          // Project, Admin, Learning, Personal
    dateAdded: "2025-12-09T...",  // ISO string
    dueDate: "2025-12-15",        // YYYY-MM-DD format
    tags: ["urgent", "frontend"], // Array of strings
    completed: false              // Boolean
}
```

### Goal Object
```javascript
{
    id: 1702108800001,
    title: "Goal Title",
    description: "Long-term goal...",
    progress: 45,                 // 0-100 percentage
    milestones: [                 // Array of strings
        "Milestone 1",
        "Milestone 2"
    ],
    dateAdded: "2025-12-09T...",
    completed: false
}
```

---

## 🔧 Core Modules Explained

### 1. Data Layer (`js/data.js`)

**Dashboard Class** - Central data management

**Key Methods:**
- `loadData()` - Restore from localStorage
- `saveData()` - Persist to localStorage
- `addTask(task)` - Create new task
- `updateTask(id, updates)` - Modify task
- `deleteTask(id)` - Remove task
- `completeTask(id)` - Toggle completion
- `getTasksByFilter(filter)` - Query tasks
- `addGoal(goal)` - Create goal
- `updateGoal(id, updates)` - Modify goal
- `deleteGoal(id)` - Remove goal
- `getStatistics()` - Aggregate stats
- `getMonthlySummary()` - Generate report
- `getTaskTrends(days)` - Historical data

### 2. UI Layer (`js/ui.js`)

**Window Management:**
- `makeWindowDraggable(windowEl)` - Enable window movement
- `bringWindowToFront(windowEl)` - Z-index management
- `toggleWindow(windowId)` - Show/hide windows

**Modal Management:**
- `openTaskModal(taskId)` - Open task editor
- `closeTaskModal()` - Close modal
- `openGoalModal(goalId)` - Open goal editor
- `closeGoalModal()` - Close modal

**Event Setup:**
- `setupEventListeners()` - Initialize all handlers
- `handleKeyboardShortcuts(e)` - Keyboard input

**Utilities:**
- `updateStatistics()` - Update stat displays
- `formatDate(dateString)` - Format dates
- `formatRelativeDate(dateString)` - "Due in 3 days"

### 3. Task Module (`js/tasks.js`)

- `addTask()` - UI handler for new task
- `renderTasks()` - Display task list
- `createTaskElement(task)` - Generate DOM element
- `saveTask(event)` - Form submission handler
- `completeTask(taskId)` - Toggle done state
- `deleteTask(taskId)` - Remove task
- `playClickSound()` - Audio feedback

### 4. Goal Module (`js/goals.js`)

- `addGoal()` - UI handler for new goal
- `renderGoals()` - Display goal list
- `createGoalElement(goal)` - Generate DOM element
- `saveGoal(event)` - Form submission handler
- `deleteGoal(goalId)` - Remove goal

### 5. Summary Module (`js/summary.js`)

- `generateMonthlySummary()` - Create report
- `exportPDF()` - Print-friendly export
- `exportMarkdown()` - Download .md file
- `generateSummaryHTML(summary)` - HTML template
- `generateSummaryMarkdown(summary)` - Markdown template

### 6. Chart Module (`js/chart.js`)

- `drawChart()` - 7-day completion trend
- `drawGoalChart()` - Goal progress visualization
- `drawCompletionChart()` - Completion pie chart

---

## 🔌 How to Extend

### Add a New Feature

#### Example: Add Due Dates with Notifications

**1. Update Data Model** (`js/data.js`)
```javascript
// Task object already has dueDate and dateAdded
// Add a notification field if needed
```

**2. Update UI** (`index.html`)
```html
<!-- Add notification checkbox to task form -->
<div class="form-group">
    <label>
        <input type="checkbox" id="taskNotify">
        Notify when due
    </label>
</div>
```

**3. Add Logic** (`js/tasks.js`)
```javascript
function checkNotifications() {
    const today = new Date().toISOString().split('T')[0];
    dashboard.tasks.forEach(task => {
        if (task.dueDate === today && !task.completed) {
            showNotification(`Task due: ${task.title}`);
        }
    });
}

// Call every minute
setInterval(checkNotifications, 60000);
```

### Add a New Category Type

**1. Update Select in HTML:**
```html
<select id="taskCategory">
    <option value="Project">Project</option>
    <option value="Health">Health</option>  <!-- NEW -->
    <option value="Admin">Admin</option>
</select>
```

**2. Add Styling** (`css/components.css`)
```css
.category-health {
    border-left: 3px solid #ff6b6b;
}
```

### Add a Pomodoro Timer

**1. Create New Window in HTML:**
```html
<div class="mac-window" id="pomodoroWindow">
    <div class="window-header">
        <div class="window-title">⏱️ Pomodoro</div>
    </div>
    <div class="window-body">
        <div id="pomodoroDisplay">25:00</div>
        <button class="mac-button" onclick="startPomodoro()">Start</button>
        <button class="mac-button" onclick="pausePomodoro()">Pause</button>
    </div>
</div>
```

**2. Add Timer Logic** (`js/pomodoro.js`)
```javascript
let pomodoroTime = 25 * 60; // seconds
let isRunning = false;

function startPomodoro() {
    isRunning = true;
    const interval = setInterval(() => {
        pomodoroTime--;
        updateDisplay();
        if (pomodoroTime === 0) {
            clearInterval(interval);
            completePomodoro();
        }
    }, 1000);
}

function updateDisplay() {
    const mins = Math.floor(pomodoroTime / 60);
    const secs = pomodoroTime % 60;
    document.getElementById('pomodoroDisplay').textContent = 
        `${mins}:${secs.toString().padStart(2, '0')}`;
}

function completePomodoro() {
    alert('Pomodoro complete! Take a break.');
    pomodoroTime = 25 * 60;
}
```

**3. Include in HTML:**
```html
<script src="js/pomodoro.js"></script>
```

### Add Dark Mode

**1. Add CSS Variables for Dark Mode** (`css/main.css`)
```css
body.dark-mode {
    --color-bg: #2a2a2a;
    --color-fg: #ffffff;
    --color-border: #444;
}
```

**2. Add Toggle Button** (`index.html`)
```html
<div id="themeToggle" class="menu-item">🌙</div>
```

**3. Add JavaScript** (`js/main.js`)
```javascript
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
```

### Add Time Tracking

**1. Update Task Data Model**
```javascript
// In addTask():
task.timeSpent = 0;  // minutes
task.timeStarted = null;
```

**2. Add Timer to Task UI**
```javascript
function createTaskElement(task) {
    // ... existing code ...
    
    const timerBtn = document.createElement('button');
    timerBtn.textContent = '⏱️';
    timerBtn.onclick = () => toggleTaskTimer(task.id);
    actions.appendChild(timerBtn);
}
```

**3. Implement Timer Logic**
```javascript
let activeTaskTimer = null;

function toggleTaskTimer(taskId) {
    const task = dashboard.tasks.find(t => t.id === taskId);
    
    if (!task.timeStarted) {
        task.timeStarted = Date.now();
        activeTaskTimer = setInterval(() => {
            task.timeSpent += 1;
            dashboard.saveData();
        }, 60000); // Update every minute
    } else {
        clearInterval(activeTaskTimer);
        task.timeStarted = null;
    }
}
```

---

## 📈 Performance Optimization

### Current Implementation
- Pure vanilla JavaScript (no dependencies)
- Efficient DOM manipulation
- Debounced auto-save (30s intervals)
- LocalStorage for persistence

### Optimization Opportunities

**1. Virtual Scrolling** (for 1000+ tasks)
```javascript
function renderTasksVirtually(tasks, visibleRange) {
    // Only render visible items
    const start = visibleRange.start;
    const end = Math.min(visibleRange.end, tasks.length);
    
    const fragment = document.createDocumentFragment();
    for (let i = start; i < end; i++) {
        fragment.appendChild(createTaskElement(tasks[i]));
    }
    taskList.innerHTML = '';
    taskList.appendChild(fragment);
}
```

**2. Indexed Search** (for fast filtering)
```javascript
class Dashboard {
    constructor() {
        this.taskIndex = new Map(); // id → task
        this.tagIndex = new Map();   // tag → [taskIds]
    }
    
    addTask(task) {
        // ... existing ...
        this.taskIndex.set(task.id, task);
        task.tags.forEach(tag => {
            if (!this.tagIndex.has(tag)) {
                this.tagIndex.set(tag, []);
            }
            this.tagIndex.get(tag).push(task.id);
        });
    }
}
```

**3. Debounced Save**
```javascript
const debouncedSave = debounce(() => dashboard.saveData(), 5000);

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
```

---

## 🧪 Testing Guide

### Manual Testing Checklist

```
[ ] Add task with all fields
[ ] Edit task
[ ] Delete task
[ ] Complete task (checkbox)
[ ] Filter tasks (All, Today, Active, Done)
[ ] Add goal
[ ] Edit goal with milestones
[ ] Delete goal
[ ] Generate monthly summary
[ ] Export to PDF
[ ] Export to Markdown
[ ] Drag windows around
[ ] Keyboard shortcuts (⌘+N, ⌘+S, ESC)
[ ] Close and reopen browser (data persists)
[ ] Test on mobile device
[ ] Test in different browsers
```

### Automated Testing (Optional - Jest)

```javascript
// test/data.test.js
describe('Dashboard', () => {
    let dashboard;
    
    beforeEach(() => {
        dashboard = new Dashboard();
        localStorage.clear();
    });
    
    test('addTask creates task', () => {
        const task = dashboard.addTask({ title: 'Test' });
        expect(task.title).toBe('Test');
        expect(dashboard.tasks).toHaveLength(1);
    });
    
    test('completeTask toggles completion', () => {
        const task = dashboard.addTask({ title: 'Test' });
        dashboard.completeTask(task.id);
        expect(task.completed).toBe(true);
    });
});
```

---

## 📚 Code Style Guide

### Naming Conventions
```javascript
// Functions: camelCase, action-oriented
function addTask() {}
function renderTasks() {}

// Classes: PascalCase
class Dashboard {}
class DataManager {}

// Constants: SCREAMING_SNAKE_CASE
const MAX_TASKS = 1000;
const DEFAULT_PRIORITY = 'medium';

// Private methods: prefixed with underscore
function _formatDate(date) {}
```

### Comments
```javascript
// Single line comment for brief explanations

/**
 * Multi-line comment for functions
 * @param {type} paramName - Description
 * @return {type} Description
 */
function functionName(paramName) {
    // Implementation
}
```

### Code Organization
```javascript
// 1. Module declaration
// 2. Imports/Dependencies
// 3. Constants and configuration
// 4. Helper functions
// 5. Main functions (exported)
// 6. Event listeners
// 7. Initialization
```

---

## 🐛 Debugging Tips

### Enable Detailed Logging
```javascript
// In js/main.js
const DEBUG = true;

function log(...args) {
    if (DEBUG) console.log(...args);
}
```

### Inspect Data
```javascript
// In browser console
dashboard.tasks
dashboard.goals
localStorage.getItem('dashboardTasks')
DashboardDebug.exportAllData()
```

### Monitor Performance
```javascript
console.time('taskRender');
renderTasks();
console.timeEnd('taskRender');
```

---

## 📞 Getting Help

- Check browser console for error messages (`F12`)
- Look at code comments and documentation
- Test in developer tools before deploying
- Use `DashboardDebug` utilities for experimentation
- Read full README.md for feature documentation

---

**Happy extending!** 🚀✨
