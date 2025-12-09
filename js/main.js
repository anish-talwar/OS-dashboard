// Main Application Entry Point

document.addEventListener('DOMContentLoaded', function() {
    console.log('🖥️ Anish Dashboard Initializing...');

    // Apply classic grid background
    if (typeof backgroundManager !== 'undefined') {
        backgroundManager.currentBackground = 'classic-grid';
        backgroundManager.applyBackground();
    }

    // Initialize the UI
    initializeUI();

    // Log some welcome info
    console.log('Dashboard loaded successfully!');
    console.log('Total Tasks:', dashboard.tasks.length);
    console.log('Total Goals:', dashboard.goals.length);

    // Auto-save data periodically (every 30 seconds)
    setInterval(() => {
        dashboard.saveData();
    }, 30000);

    // Keyboard shortcut hints in console
    console.log('%c⌘ Keyboard Shortcuts:', 'font-weight: bold; font-size: 12px;');
    console.log('  ⌘ + N: New Task');
    console.log('  ⌘ + S: Save Current Form');
    console.log('  ESC: Close Modals');
});

// Handle window resize
window.addEventListener('resize', function() {
    const desktopArea = document.querySelector('.desktop-area');
    const windows = document.querySelectorAll('.mac-window');

    windows.forEach(windowEl => {
        let top = parseInt(windowEl.style.top) || 0;
        let left = parseInt(windowEl.style.left) || 0;

        // Constrain windows to visible area
        top = Math.max(20, Math.min(top, desktopArea.offsetHeight - 100));
        left = Math.max(0, Math.min(left, desktopArea.offsetWidth - 100));

        windowEl.style.top = top + 'px';
        windowEl.style.left = left + 'px';
    });
});

// Warn before leaving if there are unsaved changes
window.addEventListener('beforeunload', function(e) {
    // Data is auto-saved, but we can add a warning if needed
    // e.preventDefault();
    // e.returnValue = '';
});

// Handle orientation change on mobile
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        renderTasks();
        renderGoals();
        updateStatistics();
    }, 250);
});

// Export global functions for debugging
window.DashboardDebug = {
    exportAllData: function() {
        const data = {
            tasks: dashboard.tasks,
            goals: dashboard.goals,
            stats: dashboard.getStatistics()
        };
        console.log(JSON.stringify(data, null, 2));
        return data;
    },
    importData: function(data) {
        if (data.tasks) dashboard.tasks = data.tasks;
        if (data.goals) dashboard.goals = data.goals;
        dashboard.saveData();
        renderTasks();
        renderGoals();
        updateStatistics();
        console.log('Data imported successfully');
    },
    clearAllData: function() {
        if (confirm('Are you sure? This will delete all tasks and goals.')) {
            dashboard.tasks = [];
            dashboard.goals = [];
            dashboard.completedCount = 0;
            dashboard.saveData();
            renderTasks();
            renderGoals();
            updateStatistics();
            console.log('All data cleared');
        }
    },
    addSampleData: function() {
        // Add sample tasks
        dashboard.addTask({
            title: 'Review quarterly goals',
            description: 'Take time to review and adjust semester goals',
            priority: 'high',
            category: 'Project',
            tags: ['planning']
        });

        dashboard.addTask({
            title: 'Update dashboard documentation',
            description: 'Document new features and API',
            priority: 'medium',
            category: 'Project',
            tags: ['documentation']
        });

        dashboard.addTask({
            title: 'Daily standup',
            priority: 'high',
            category: 'Admin',
            tags: ['meeting']
        });

        dashboard.addTask({
            title: 'Learn React Hooks',
            description: 'Complete Advanced Hooks tutorial',
            priority: 'medium',
            category: 'Learning',
            tags: ['frontend', 'learning']
        });

        // Add sample goals
        dashboard.addGoal({
            title: 'Build 3 side projects',
            description: 'Complete personal projects for portfolio',
            progress: 33,
            milestones: [
                'Plan project scope',
                'Build MVP',
                'Deploy to production',
                'Write documentation'
            ]
        });

        dashboard.addGoal({
            title: 'Improve system design skills',
            description: 'Study distributed systems and scalability',
            progress: 45,
            milestones: [
                'Complete Grokking System Design course',
                'Design a complex system',
                'Write system design blog posts'
            ]
        });

        dashboard.addGoal({
            title: 'Maintain code quality',
            description: 'Keep test coverage above 80%',
            progress: 60,
            milestones: [
                'Write unit tests',
                'Set up CI/CD',
                'Maintain code coverage'
            ]
        });

        renderTasks();
        renderGoals();
        updateStatistics();
        console.log('Sample data added successfully');
    }
};

console.log('%c💾 Pro Tips:', 'font-weight: bold; font-size: 12px; color: #000080;');
console.log('  DashboardDebug.exportAllData() - Export all data as JSON');
console.log('  DashboardDebug.addSampleData() - Load sample tasks and goals');
console.log('  DashboardDebug.clearAllData() - Clear all data');
console.log('  localStorage - All data is persisted locally');
