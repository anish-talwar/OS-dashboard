// Summary & Export Module

function generateMonthlySummary() {
    const summary = dashboard.getMonthlySummary();
    const summaryContent = document.getElementById('summaryContent');

    let html = `<div class="summary-container">`;

    // Title
    html += `<div style="text-align: center; margin-bottom: 12px; border-bottom: 2px solid var(--color-shadow); padding-bottom: 8px;">
        <strong style="font-size: 12px;">Monthly Summary</strong>
        <div style="font-size: 10px; color: #666;">${summary.month}</div>
    </div>`;

    // Completed Tasks
    html += `<div class="summary-section">
        <div class="summary-section-title">✓ Completed Tasks (${summary.completedTasks.length})</div>`;
    if (summary.completedTasks.length > 0) {
        html += `<ul class="summary-list">`;
        summary.completedTasks.forEach(task => {
            html += `<li><strong>${task.title}</strong></li>`;
        });
        html += `</ul>`;
    } else {
        html += `<div style="font-size: 10px; color: #999; padding: 6px 0;">No tasks completed this month</div>`;
    }
    html += `</div>`;

    // In Progress Tasks
    html += `<div class="summary-section">
        <div class="summary-section-title">⧐ In Progress Tasks (${summary.inProgressTasks.length})</div>`;
    if (summary.inProgressTasks.length > 0) {
        html += `<ul class="summary-list">`;
        summary.inProgressTasks.forEach(task => {
            html += `<li><strong>${task.title}</strong><br><span style="font-size: 9px; color: #999;">${task.description || 'No description'}</span></li>`;
        });
        html += `</ul>`;
    } else {
        html += `<div style="font-size: 10px; color: #999; padding: 6px 0;">No in-progress tasks</div>`;
    }
    html += `</div>`;

    // Statistics
    html += `<div class="summary-section">
        <div class="summary-section-title">📊 Statistics</div>
        <ul class="summary-list">
            <li><strong>New Tasks Created:</strong> ${summary.newTasksCreated}</li>
            <li><strong>Completion Rate:</strong> ${summary.newTasksCreated > 0 ? Math.round((summary.completedTasks.length / summary.newTasksCreated) * 100) : 0}%</li>
            <li><strong>Active Goals:</strong> ${summary.goals.length}</li>
        </ul>
    </div>`;

    // Notes section
    html += `<div class="summary-section">
        <div class="summary-section-title">📝 Notes</div>
        <div style="font-size: 10px; color: #666; padding: 6px 0; font-style: italic;">
            Generated on ${summary.generatedDate}. Keep up the great work!
        </div>
    </div>`;

    html += `</div>`;
    summaryContent.innerHTML = html;
}

function exportPDF() {
    const summary = dashboard.getMonthlySummary();

    // Create a simple PDF-like HTML output
    const content = generateSummaryHTML(summary);

    // Open in new window
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(content);
    printWindow.document.close();

    // Auto print after a short delay
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

function exportMarkdown() {
    const summary = dashboard.getMonthlySummary();

    const markdown = generateSummaryMarkdown(summary);

    // Create a blob and download
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monthly-summary-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function generateSummaryHTML(summary) {
    const now = new Date();
    const dateStr = now.toLocaleDateString();

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Monthly Summary - ${summary.month}</title>
        <style>
            body { font-family: 'Courier New', monospace; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1, h2 { border-bottom: 2px solid #000; padding-bottom: 8px; }
            h1 { text-align: center; font-size: 24px; }
            h2 { font-size: 16px; margin-top: 20px; }
            ul { list-style: none; padding-left: 0; }
            li { margin: 8px 0; padding-left: 20px; position: relative; }
            li:before { content: "▪"; position: absolute; left: 0; }
            .meta { color: #666; font-size: 12px; text-align: center; margin-bottom: 20px; }
            .stat { display: inline-block; margin-right: 20px; padding: 8px; border: 1px solid #ccc; }
        </style>
    </head>
    <body>
        <h1>📊 Monthly Summary</h1>
        <div class="meta">
            <p><strong>${summary.month}</strong></p>
            <p>Generated: ${dateStr}</p>
        </div>

        <h2>✓ Completed Tasks (${summary.completedTasks.length})</h2>
        ${summary.completedTasks.length > 0 ? `
            <ul>
                ${summary.completedTasks.map(task => `<li><strong>${task.title}</strong></li>`).join('')}
            </ul>
        ` : '<p style="color: #999;">No tasks completed this month</p>'}

        <h2>⧐ In Progress Tasks (${summary.inProgressTasks.length})</h2>
        ${summary.inProgressTasks.length > 0 ? `
            <ul>
                ${summary.inProgressTasks.map(task => `<li><strong>${task.title}</strong> - ${task.description || 'No description'}</li>`).join('')}
            </ul>
        ` : '<p style="color: #999;">No in-progress tasks</p>'}

        <h2>📊 Statistics</h2>
        <div>
            <div class="stat"><strong>${summary.newTasksCreated}</strong> New Tasks</div>
            <div class="stat"><strong>${summary.completedTasks.length}</strong> Completed</div>
            <div class="stat"><strong>${summary.goals.length}</strong> Active Goals</div>
        </div>

        <p style="margin-top: 40px; color: #999; font-size: 12px;">
            This report was automatically generated by Anish Dashboard.
        </p>
    </body>
    </html>
    `;

    return html;
}

function generateSummaryMarkdown(summary) {
    let markdown = `# Monthly Summary - ${summary.month}\n\n`;
    markdown += `Generated: ${new Date().toLocaleDateString()}\n\n`;

    markdown += `## ✓ Completed Tasks (${summary.completedTasks.length})\n\n`;
    if (summary.completedTasks.length > 0) {
        summary.completedTasks.forEach(task => {
            markdown += `- **${task.title}**\n`;
        });
    } else {
        markdown += `No tasks completed this month.\n\n`;
    }
    markdown += `\n`;

    markdown += `## ⧐ In Progress Tasks (${summary.inProgressTasks.length})\n\n`;
    if (summary.inProgressTasks.length > 0) {
        summary.inProgressTasks.forEach(task => {
            markdown += `- **${task.title}**\n`;
            if (task.description) {
                markdown += `  - ${task.description}\n`;
            }
        });
    } else {
        markdown += `No in-progress tasks.\n\n`;
    }
    markdown += `\n`;

    markdown += `## 📊 Statistics\n\n`;
    markdown += `- New Tasks Created: **${summary.newTasksCreated}**\n`;
    markdown += `- Completed: **${summary.completedTasks.length}**\n`;
    markdown += `- Completion Rate: **${summary.newTasksCreated > 0 ? Math.round((summary.completedTasks.length / summary.newTasksCreated) * 100) : 0}%**\n`;
    markdown += `- Active Goals: **${summary.goals.length}**\n\n`;

    markdown += `---\n\n`;
    markdown += `*Generated by Anish Dashboard - A vintage Macintosh-inspired productivity tool*\n`;

    return markdown;
}
