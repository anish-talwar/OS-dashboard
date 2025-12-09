// Data Management Module

class Dashboard {
    constructor() {
        this.tasks = [];
        this.goals = [];
        this.completedCount = 0;
        this.loadData();
    }

    // Load data from localStorage
    loadData() {
        const savedTasks = localStorage.getItem('dashboardTasks');
        const savedGoals = localStorage.getItem('dashboardGoals');
        const savedStats = localStorage.getItem('dashboardStats');

        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }

        if (savedGoals) {
            this.goals = JSON.parse(savedGoals);
        }

        if (savedStats) {
            const stats = JSON.parse(savedStats);
            this.completedCount = stats.completedCount || 0;
        }
    }

    // Save data to localStorage
    saveData() {
        localStorage.setItem('dashboardTasks', JSON.stringify(this.tasks));
        localStorage.setItem('dashboardGoals', JSON.stringify(this.goals));
        localStorage.setItem('dashboardStats', JSON.stringify({
            completedCount: this.completedCount
        }));
    }

    // Tasks
    addTask(task) {
        const newTask = {
            id: Date.now(),
            title: task.title,
            description: task.description || '',
            priority: task.priority || 'medium',
            category: task.category || 'Project',
            dateAdded: new Date().toISOString(),
            dueDate: task.dueDate || '',
            tags: task.tags || [],
            completed: false
        };

        this.tasks.unshift(newTask);
        this.saveData();
        return newTask;
    }

    updateTask(id, updates) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            Object.assign(task, updates);
            this.saveData();
            return task;
        }
        return null;
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }

    completeTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            if (task.completed) {
                this.completedCount++;
            } else {
                this.completedCount--;
            }
            this.saveData();
            return task;
        }
        return null;
    }

    getTasksByFilter(filter = 'all') {
        const today = new Date().toISOString().split('T')[0];

        switch (filter) {
            case 'today':
                return this.tasks.filter(t => t.dueDate === today && !t.completed);
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    // Goals
    addGoal(goal) {
        const newGoal = {
            id: Date.now(),
            title: goal.title,
            description: goal.description || '',
            progress: goal.progress || 0,
            milestones: goal.milestones || [],
            dateAdded: new Date().toISOString(),
            completed: false
        };

        this.goals.unshift(newGoal);
        this.saveData();
        return newGoal;
    }

    updateGoal(id, updates) {
        const goal = this.goals.find(g => g.id === id);
        if (goal) {
            Object.assign(goal, updates);
            this.saveData();
            return goal;
        }
        return null;
    }

    deleteGoal(id) {
        const index = this.goals.findIndex(g => g.id === id);
        if (index !== -1) {
            this.goals.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }

    // Statistics
    getStatistics() {
        const completed = this.tasks.filter(t => t.completed).length;
        const active = this.tasks.filter(t => !t.completed).length;
        const activeGoals = this.goals.filter(g => g.progress < 100).length;

        return {
            completedTasks: completed,
            activeTasks: active,
            activeGoals: activeGoals,
            totalTasks: this.tasks.length,
            totalGoals: this.goals.length
        };
    }

    // Monthly Summary
    getMonthlySummary() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const monthTasks = this.tasks.filter(task => {
            const taskDate = new Date(task.dateAdded);
            return taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
        });

        const completedThisMonth = monthTasks.filter(t => t.completed);
        const newTasks = monthTasks.filter(t => !t.completed);

        const monthlyGoals = this.goals.filter(goal => {
            const goalDate = new Date(goal.dateAdded);
            return goalDate.getMonth() === currentMonth && goalDate.getFullYear() === currentYear;
        });

        const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });

        return {
            month: monthName,
            completedTasks: completedThisMonth,
            inProgressTasks: newTasks,
            newTasksCreated: monthTasks.length,
            goals: monthlyGoals,
            generatedDate: now.toLocaleDateString()
        };
    }

    // Task trends for chart
    getTaskTrends(days = 30) {
        const trends = [];
        const today = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const tasksOnDate = this.tasks.filter(t => t.dateAdded.startsWith(dateStr));
            const completedOnDate = tasksOnDate.filter(t => t.completed).length;

            trends.push({
                date: dateStr,
                completed: completedOnDate,
                total: tasksOnDate.length
            });
        }

        return trends;
    }
}

// Global instance
const dashboard = new Dashboard();
