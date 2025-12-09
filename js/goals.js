// Goal Management Module

function addGoal() {
    const input = document.getElementById('goalInput');
    const title = input.value.trim();

    if (!title) {
        alert('Please enter a goal');
        return;
    }

    dashboard.addGoal({ title });
    input.value = '';
    renderGoals();
    updateStatistics();
}

function renderGoals() {
    const goalsList = document.getElementById('goalsList');
    const goals = dashboard.goals;

    goalsList.innerHTML = '';

    if (goals.length === 0) {
        goalsList.innerHTML = '<div style="padding: 20px; text-align: center; color: #999; font-size: 11px;">No goals yet</div>';
        return;
    }

    goals.forEach(goal => {
        const goalEl = createGoalElement(goal);
        goalsList.appendChild(goalEl);
    });
}

function createGoalElement(goal) {
    const div = document.createElement('div');
    div.className = 'goal-item';
    div.dataset.goalId = goal.id;

    const title = document.createElement('div');
    title.className = 'goal-title';
    title.textContent = goal.title;

    const progressLabel = document.createElement('div');
    progressLabel.className = 'goal-progress-label';
    progressLabel.textContent = `Progress: ${goal.progress}%`;

    const progressBar = document.createElement('div');
    progressBar.className = 'goal-progress-bar';

    const progressFill = document.createElement('div');
    progressFill.className = 'goal-progress-fill';
    progressFill.style.width = goal.progress + '%';

    const progressText = document.createElement('div');
    progressText.className = 'goal-progress-text';
    progressText.textContent = goal.progress + '%';
    progressText.style.display = goal.progress > 0 ? 'block' : 'none';

    progressFill.appendChild(progressText);
    progressBar.appendChild(progressFill);

    const actions = document.createElement('div');
    actions.className = 'goal-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'goal-action-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openGoalModal(goal.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'goal-action-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete this goal?')) {
            deleteGoal(goal.id);
        }
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    div.appendChild(title);
    div.appendChild(progressLabel);
    div.appendChild(progressBar);

    // Show milestones if any
    if (goal.milestones && goal.milestones.length > 0) {
        const milestonesDiv = document.createElement('div');
        milestonesDiv.style.fontSize = '9px';
        milestonesDiv.style.marginTop = '6px';
        milestonesDiv.style.color = '#666';

        goal.milestones.forEach(milestone => {
            const milestoneItem = document.createElement('div');
            milestoneItem.style.padding = '2px 0';
            milestoneItem.textContent = '◆ ' + milestone;
            milestonesDiv.appendChild(milestoneItem);
        });

        div.appendChild(milestonesDiv);
    }

    div.appendChild(actions);

    // Click to edit
    div.addEventListener('click', (e) => {
        if (!e.target.closest('.goal-action-btn')) {
            openGoalModal(goal.id);
        }
    });

    return div;
}

function saveGoal(event) {
    event.preventDefault();

    const title = document.getElementById('goalTitle').value.trim();
    if (!title) {
        alert('Goal title is required');
        return;
    }

    const progress = parseInt(document.getElementById('goalProgress').value) || 0;
    const milestonesText = document.getElementById('goalMilestones').value;
    const milestones = milestonesText
        .split('\n')
        .map(m => m.trim())
        .filter(m => m.length > 0);

    const goalData = {
        title,
        description: document.getElementById('goalDesc').value,
        progress: Math.min(100, Math.max(0, progress)),
        milestones
    };

    if (currentEditingGoalId) {
        dashboard.updateGoal(currentEditingGoalId, goalData);
    } else {
        dashboard.addGoal(goalData);
    }

    closeGoalModal();
    renderGoals();
    updateStatistics();
    drawChart();
}

function deleteGoal(goalId) {
    dashboard.deleteGoal(goalId);
    renderGoals();
    updateStatistics();
    drawChart();
}
