# Anish Dashboard - Vintage Macintosh Productivity Tool

A retro-inspired web-based productivity dashboard with a vintage Macintosh System 6/7 aesthetic. Built with pure HTML, CSS, and JavaScript for maximum compatibility and offline functionality.

## 🖥️ Features

### Core Functionality
- **Daily & Weekly Task Tracker** - Add, edit, complete, and organize tasks with priority levels, categories, due dates, and tags
- **Semester Goal Tracking** - Set long-term goals with milestones and visual progress tracking
- **Monthly Summary Generator** - Auto-generate month-end reports with task completion stats and export to PDF/Markdown
- **Data Visualization** - Retro pixelated charts showing task completion trends and goal progress

### UI Features
- **Draggable Windows** - Move dashboard windows around the desktop
- **Modal Dialogs** - Task and goal detail windows with form validation
- **Filter Tabs** - View All, Today, Active, or Completed tasks
- **Keyboard Shortcuts** - Cmd+N for new task, Cmd+S to save, ESC to close modals
- **Local Storage Persistence** - All data automatically saved to browser storage
- **Vintage Mac Aesthetic**:
  - Classic window frames with beveled borders
  - Chicago-style monospace font
  - Duotone color palette (navy blue & teal accents)
  - Pixelated chart visualizations
  - Authentic button styling with inset borders
  - Optional sound effects for task completion

## 🚀 Getting Started

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No dependencies or server required
- Runs entirely in the browser

### Setup

1. **Open the Dashboard**
   - Simply open `index.html` in a web browser
   - Or serve with a local web server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js with http-server
     npx http-server
     ```

2. **Access the Dashboard**
   - Navigate to `http://localhost:8000` (or your local server)
   - The dashboard will load with sample windows positioned on the desktop

## 📋 Usage Guide

### Adding Tasks
1. Click in the task input field in the "Task Tracker" window
2. Type your task title
3. Click "Add Task" or press Enter
4. Optional: Click on the task to open the detail editor for more options (description, priority, due date, tags)

### Task Details
- **Priority**: Low, Medium, High
- **Category**: Project, Admin, Learning, Personal
- **Due Date**: Select a date
- **Tags**: Comma-separated keywords (e.g., "urgent, frontend")

### Viewing Tasks
Use the filter tabs to view:
- **All** - All tasks in chronological order
- **Today** - Tasks due today
- **Active** - Incomplete tasks
- **Done** - Completed tasks

### Managing Goals
1. Enter a goal in the "Semester Goals" input field
2. Click "Add Goal"
3. Click on a goal to edit details:
   - Goal title and description
   - Progress percentage (0-100%)
   - Milestones (one per line)

### Monthly Summary
1. Open the "Monthly Summary" window
2. Click "Generate Summary" to create a report for the current month
3. Export options:
   - **Export PDF** - Opens a print-ready version
   - **Export MD** - Downloads a Markdown file

### Statistics Dashboard
The "Statistics & Trends" window shows:
- Total completed tasks
- Active tasks count
- Active goals count
- 7-day task completion chart

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `css/main.css`:

```css
:root {
    --color-bg: #f5f5f5;        /* Background */
    --color-fg: #000000;        /* Foreground text */
    --color-border: #dfdfdf;    /* Borders */
    --accent-primary: #000080;  /* Blue */
    --accent-secondary: #008080; /* Teal */
}
```

### Modifying Window Positions
Edit the inline styles in `index.html` for each window:
```html
<div class="mac-window" id="taskWindow" style="left: 20px; top: 40px; width: 500px;">
```

### Font Changes
Update `--font-family` in `css/main.css` to use different fonts:
```css
--font-family: 'Your Font Name', monospace;
```

### Adding New Categories
Edit the select dropdown in the task modal in `index.html`:
```html
<option value="NewCategory">New Category</option>
```

## 💾 Data Storage

All data is stored in browser LocalStorage:
- `dashboardTasks` - Array of task objects
- `dashboardGoals` - Array of goal objects
- `dashboardStats` - Statistics counters

### Exporting Data
Open browser console (F12) and run:
```javascript
DashboardDebug.exportAllData()
```

### Importing Data
```javascript
DashboardDebug.importData({
    tasks: [...],
    goals: [...],
    stats: {...}
})
```

### Loading Sample Data
```javascript
DashboardDebug.addSampleData()
```

### Clear All Data
```javascript
DashboardDebug.clearAllData()
```

## 🔧 File Structure

```
Anish-Dashboard/
├── index.html              # Main HTML layout
├── css/
│   ├── main.css           # Core styles and variables
│   ├── windows.css        # Window component styles
│   └── components.css     # Button, form, list styles
├── js/
│   ├── data.js            # Data management (Dashboard class)
│   ├── ui.js              # UI utilities and window management
│   ├── tasks.js           # Task CRUD operations
│   ├── goals.js           # Goal CRUD operations
│   ├── summary.js         # Monthly summary generation & export
│   ├── chart.js           # Chart visualization
│   └── main.js            # Application entry point
├── assets/                # Placeholder for icons, sounds
└── data/                  # Placeholder for exported files
```

## 🎮 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + N` | New Task |
| `Cmd/Ctrl + S` | Save Current Form |
| `ESC` | Close Modal |

## 🔌 Extension Ideas

### Adding Time Tracking
1. Add a `timeSpent` field to task objects in `data.js`
2. Create a timer UI component
3. Include time data in monthly summary

### Pomodoro Timer
1. Create a new window component
2. Add a simple timer function
3. Trigger notifications when timer ends

### Dark Mode
1. Add a theme toggle in the menu bar
2. Create alternate CSS variables
3. Store theme preference in localStorage

### Recurring Tasks
1. Add `recurring` and `recurrencePattern` fields to tasks
2. Auto-create tasks based on pattern
3. Display recurrence info in task UI

### Tags Cloud
1. Collect all unique tags from tasks
2. Create a visual tag frequency display
3. Filter tasks by tag selection

## 🐛 Troubleshooting

### Data Not Persisting
- Check browser allows LocalStorage
- Ensure cookies/storage not disabled
- Try clearing cache and reloading

### Windows Dragging Slowly
- This is likely browser performance
- Try closing other tabs
- Windows are intentionally 1px borders for retro feel

### Export Not Working
- Ensure pop-ups not blocked
- Check browser console for errors
- Try using a different browser

## 📝 Notes

- This is a client-side application; no server is required
- All data is stored locally in the browser
- Clearing browser data will delete all tasks and goals
- Export data regularly as backup
- Works offline after first load

## 🎯 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📜 Version

**v1.0** - December 2025

## 🙏 Credits

Inspired by the classic Macintosh System 6/7 interface design.

---

Enjoy your retro productivity dashboard! 🖥️✨
