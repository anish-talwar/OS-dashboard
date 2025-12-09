# Quick Start Guide - Anish Dashboard

## 🚀 Get Running in 30 Seconds

### Option 1: Direct File Open (Easiest)
1. Navigate to the project folder
2. Double-click `index.html`
3. Dashboard loads in your default browser
4. Start using immediately!

### Option 2: Local Web Server (Recommended)

**On Mac (Terminal):**
```bash
cd /path/to/Anish-Dashboard
python3 -m http.server 8000
```
Then open: `http://localhost:8000`

**With Node.js:**
```bash
npx http-server
```

## 📚 First Steps

### 1. Add Your First Task
- Find the "📝 Task Tracker" window (top-left)
- Type a task name in the input field
- Click "Add Task"
- Done! Task appears in the list

### 2. Complete a Task
- Click the checkbox next to any task
- Task is marked as done and grayed out
- Completed count updates automatically

### 3. Edit a Task
- Click on any task to open the detail editor
- Add description, priority, due date, tags
- Click "Save"

### 4. Create a Goal
- Find the "🎯 Semester Goals" window (top-right)
- Enter goal name
- Click "Add Goal"
- Click a goal to edit and add milestones

### 5. View Your Progress
- Check "📊 Statistics & Trends" window
- See completion count, active tasks, goal progress
- View a 7-day completion chart

### 6. Generate Monthly Report
- Open "📋 Monthly Summary" window
- Click "Generate Summary"
- Optionally export as PDF or Markdown

## 💡 Pro Tips

### Keyboard Shortcuts
- **⌘+N** (Mac) or **Ctrl+N** (Windows/Linux) - Create new task
- **⌘+S** or **Ctrl+S** - Save form
- **ESC** - Close dialog

### Dragging Windows
- Click and drag any window title bar to move it
- Windows snap to desktop boundaries
- Windows remember position (refresh page)

### Filtering Tasks
Use tabs in Task Tracker:
- **All** - Every task
- **Today** - Due today only
- **Active** - Incomplete tasks
- **Done** - Completed tasks

### Console Shortcuts
Press **F12** to open Developer Tools → Console and try:
```javascript
DashboardDebug.addSampleData()    // Load sample data
DashboardDebug.exportAllData()    // Export as JSON
DashboardDebug.clearAllData()     // Start fresh
```

## 🎨 Customization Tips

### Change Window Positions
Edit `index.html` - look for `style="left: XXpx; top: XXpx"`

### Change Colors
Edit `css/main.css` - modify `:root` CSS variables:
```css
--color-bg: #f5f5f5;        /* Light background */
--accent-primary: #000080;  /* Navy blue */
--accent-secondary: #008080; /* Teal */
```

### Change Font
Edit `css/main.css`:
```css
--font-family: 'Your Font', monospace;
```

## 📁 Project Structure Quick View

```
index.html      ← Open this file in browser
css/
  main.css      ← Colors, fonts, layout
  windows.css   ← Window styling
  components.css ← Buttons, forms, lists
js/
  data.js       ← Data storage & management
  tasks.js      ← Task operations
  goals.js      ← Goal operations
  ui.js         ← Window & modal management
  summary.js    ← Export functions
  chart.js      ← Charts & visualizations
  main.js       ← Application startup
README.md       ← Full documentation
```

## ❓ FAQ

**Q: Will my data persist if I close the browser?**
A: Yes! All data is saved to browser LocalStorage automatically.

**Q: Can I backup my data?**
A: Yes! Open console (F12) and run:
```javascript
DashboardDebug.exportAllData()
```
Copy the output to save it.

**Q: Can I use this on my phone?**
A: Yes, it's mobile responsive, but it's optimized for desktop screens.

**Q: How do I add more task categories?**
A: Edit the `<select>` in the Task Details modal in `index.html`.

**Q: Can I export in other formats?**
A: Currently PDF and Markdown. To add others, edit `js/summary.js`.

**Q: Can I host this online?**
A: Absolutely! Upload all files to any web server (GitHub Pages, Netlify, etc).

## 🔗 Next Steps

- Read full `README.md` for advanced features
- Check out the code comments for customization
- Explore sample data with `DashboardDebug.addSampleData()`
- Open browser DevTools to inspect and experiment

---

**Happy organizing!** 🎯✨
