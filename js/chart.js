// Retro Chart Visualization Module

function drawChart() {
    const canvas = document.getElementById('trendsChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const trends = dashboard.getTaskTrends(7); // Last 7 days
    
    // Use canvas actual size, not CSS size
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);

    if (trends.length === 0) {
        ctx.fillStyle = '#999999';
        ctx.font = '11px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('No data yet', width / 2, height / 2);
        return;
    }

    // Calculate layout
    const padding = 20;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    const barWidth = graphWidth / (trends.length * 1.5);
    const maxValue = Math.max(...trends.map(t => t.total), 1);
    const scale = graphHeight / maxValue;

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Draw bars
    trends.forEach((trend, index) => {
        const x = padding + (index * (barWidth * 1.5));
        const completedHeight = trend.completed * scale;
        const totalHeight = trend.total * scale;

        // Background bar (total)
        ctx.fillStyle = '#d0d0d0';
        ctx.fillRect(x, height - padding - totalHeight, barWidth, totalHeight);

        // Completed bar
        ctx.fillStyle = '#000080';
        ctx.fillRect(x, height - padding - completedHeight, barWidth, completedHeight);

        // Border
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, height - padding - totalHeight, barWidth, totalHeight);

        // Label
        ctx.fillStyle = '#000000';
        ctx.font = '9px "Courier New", monospace';
        ctx.textAlign = 'center';
        const date = new Date(trend.date);
        const label = (date.getMonth() + 1) + '/' + date.getDate();
        ctx.fillText(label, x + barWidth / 2, height - padding + 12);
    });
}

// Alternative: Draw a goal progress overview
function drawGoalChart() {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    canvas.className = 'retro-chart';

    const ctx = canvas.getContext('2d');
    const goals = dashboard.goals;

    // Clear
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    if (goals.length === 0) {
        ctx.fillStyle = '#999999';
        ctx.font = 'bold 12px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('No goals yet', canvas.width / 2, canvas.height / 2);
        return canvas;
    }

    const padding = 15;
    const graphWidth = canvas.width - padding * 2;
    const graphHeight = canvas.height - padding * 2;
    const barHeight = Math.max(15, graphHeight / (goals.length * 1.5));

    goals.forEach((goal, index) => {
        const y = padding + (index * (barHeight * 1.5));

        // Background bar
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(padding, y, graphWidth, barHeight);

        // Progress bar
        ctx.fillStyle = '#008080';
        ctx.fillRect(padding, y, (graphWidth * goal.progress) / 100, barHeight);

        // Border
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(padding, y, graphWidth, barHeight);

        // Text
        ctx.fillStyle = '#000000';
        ctx.font = '9px "Courier New", monospace';
        ctx.textAlign = 'left';
        const truncatedTitle = goal.title.length > 15 ? goal.title.substring(0, 12) + '...' : goal.title;
        ctx.fillText(truncatedTitle, padding + 5, y + barHeight - 4);

        // Percentage
        ctx.textAlign = 'right';
        ctx.fillText(goal.progress + '%', canvas.width - padding - 5, y + barHeight - 4);
    });

    return canvas;
}

// Draw a minimalist pie chart for task completion
function drawCompletionChart() {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    canvas.className = 'retro-chart';

    const ctx = canvas.getContext('2d');
    const stats = dashboard.getStatistics();

    const total = stats.completedTasks + stats.activeTasks;
    if (total === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#999999';
        ctx.font = 'bold 12px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('No tasks', canvas.width / 2, canvas.height / 2);
        return canvas;
    }

    const completionRate = stats.completedTasks / total;

    // Draw circle background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw completed section
    ctx.fillStyle = '#000080';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * completionRate);
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    // Draw border on completed section
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * completionRate);
    ctx.lineTo(centerX, centerY);
    ctx.stroke();

    // Text
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const percentage = Math.round(completionRate * 100);
    ctx.fillText(percentage + '%', centerX, centerY);

    ctx.font = '10px "Courier New", monospace';
    ctx.fillText('Complete', centerX, centerY + 20);

    return canvas;
}
